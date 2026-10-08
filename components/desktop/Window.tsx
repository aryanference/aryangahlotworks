"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useDesktopStore, type WindowState, APP_META } from "@/store/desktop";
import { cn } from "@/lib/cn";

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface DragState {
  kind: "move" | "resize";
  dir?: ResizeDir;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
  origW: number;
  origH: number;
}

/** A pointer gesture batched to one store write per animation frame. */
interface PendingGesture {
  kind: "move" | "resize";
  x: number;
  y: number;
  w?: number;
  h?: number;
}

export default function Window({
  win,
  children,
}: {
  win: WindowState;
  children: React.ReactNode;
}) {
  const { focusedId, focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow } =
    useDesktopStore();
  const focused = focusedId === win.id;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState | null>(null);
  const pending = useRef<PendingGesture | null>(null);
  const raf = useRef(0);

  /* ----- drag / resize via pointer capture -----
     Capture keeps every pointermove retargeted to the element that started
     the gesture, so the browser never hijacks the stream (pointercancel)
     when the pointer crosses scrollable app content.

     Store writes are batched to one per animation frame: a synchronous
     render per pointermove starves Chromium's input pipeline, which
     cancels the captured pointer mid-gesture. */

  const flush = useCallback(() => {
    raf.current = 0;
    const p = pending.current;
    pending.current = null;
    if (!p) return;
    if (p.kind === "move") {
      moveWindow(win.id, p.x, p.y);
    } else if (p.w !== undefined && p.h !== undefined) {
      resizeWindow(win.id, p.w, p.h, p.x, p.y);
    }
  }, [win.id, moveWindow, resizeWindow]);

  const schedule = useCallback(
    (update: PendingGesture) => {
      pending.current = update;
      if (!raf.current) raf.current = requestAnimationFrame(flush);
    },
    [flush],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
      flush(); // commit final position synchronously
      if (drag.current && e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      drag.current = null;
    },
    [flush],
  );

  const cancelDrag = useCallback(() => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    pending.current = null;
    drag.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      if ((e.target as HTMLElement).closest("button")) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;
      focusWindow(win.id);
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        kind: "move",
        startX: e.clientX,
        startY: e.clientY,
        origX: win.x,
        origY: win.y,
        origW: win.width,
        origH: win.height,
      };
    },
    [win.x, win.y, win.width, win.height, win.maximized, focusWindow, win.id],
  );

  const onTitlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d || d.kind !== "move") return;
      schedule({ kind: "move", x: d.origX + e.clientX - d.startX, y: d.origY + e.clientY - d.startY });
    },
    [schedule],
  );

  const startResize = useCallback(
    (dir: ResizeDir) => (e: React.PointerEvent) => {
      if (win.maximized) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      e.stopPropagation();
      focusWindow(win.id);
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        kind: "resize",
        dir,
        startX: e.clientX,
        startY: e.clientY,
        origX: win.x,
        origY: win.y,
        origW: win.width,
        origH: win.height,
      };
    },
    [win.x, win.y, win.width, win.height, win.maximized, focusWindow, win.id],
  );

  const onHandlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d || d.kind !== "resize" || !d.dir) return;
      const min = APP_META[win.app].minSize;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      let nx = d.origX;
      let ny = d.origY;
      let nw = d.origW;
      let nh = d.origH;
      if (d.dir.includes("e")) nw = d.origW + dx;
      if (d.dir.includes("s")) nh = d.origH + dy;
      if (d.dir.includes("w")) {
        nw = Math.max(min.w, d.origW - dx);
        nx = d.origX + (d.origW - nw);
      }
      if (d.dir.includes("n")) {
        nh = Math.max(min.h, d.origH - dy);
        ny = d.origY + (d.origH - nh);
      }
      schedule({ kind: "resize", x: nx, y: ny, w: nw, h: nh });
    },
    [win.app, schedule],
  );

  /* ----- Cmd/Ctrl+W close, Cmd/Ctrl+M minimize (focused window only) ----- */
  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "w") {
        e.preventDefault();
        closeWindow(win.id);
      } else if (mod && e.key.toLowerCase() === "m") {
        e.preventDefault();
        minimizeWindow(win.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused, win.id, closeWindow, minimizeWindow]);

  /* ----- Tab cycles within this window while it holds focus ----- */
  const trapTab = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const root = ref.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !root.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const titleId = `win-title-${win.id}`;

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-hidden={win.minimized}
      inert={win.minimized}
      className="pointer-events-auto absolute left-0 top-0"
      style={{ zIndex: win.z, x: win.x, y: win.y, width: win.width, height: win.height }}
      onPointerDown={() => !focused && focusWindow(win.id)}
      onKeyDown={trapTab}
    >
      {/* Inner layer owns scale/opacity animations so window position
          (outer x/y) stays instant during drag. */}
      <motion.div
        className={cn(
          "desktop-window flex h-full w-full flex-col overflow-hidden",
          !focused && "titlebar-unfocused",
        )}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        animate={
          win.minimized
            ? { opacity: 0, scale: 0.25, y: 320, pointerEvents: "none" as const }
            : { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" as const }
        }
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
        transition={
          win.minimized
            ? { type: "spring", stiffness: 320, damping: 30 }
            : { type: "spring", stiffness: 300, damping: 28 }
        }
      >
        {/* Title bar — drag surface with pointer capture */}
        <div
          className="titlebar flex h-10 shrink-0 cursor-default touch-none select-none items-center gap-2 px-3"
          onPointerDown={onTitlePointerDown}
          onPointerMove={onTitlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={cancelDrag}
          onDoubleClick={() => toggleMaximize(win.id)}
        >
          <div className="group flex items-center gap-2">
            <button
              type="button"
              aria-label="Close window"
              className="traffic bg-[#ff5f57]"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => closeWindow(win.id)}
            >
              <X strokeWidth={3} />
            </button>
            <button
              type="button"
              aria-label="Minimize window"
              className="traffic bg-[#febc2e]"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => minimizeWindow(win.id)}
            >
              <Minus strokeWidth={3} />
            </button>
            <button
              type="button"
              aria-label={win.maximized ? "Restore window" : "Maximize window"}
              className="traffic bg-[#28c840]"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => toggleMaximize(win.id)}
            >
              <Maximize2 strokeWidth={3} />
            </button>
          </div>
          <span
            id={titleId}
            className="pointer-events-none flex-1 truncate text-center text-[13px] font-medium"
          >
            {win.title}
          </span>
          <span className="w-[52px]" /> {/* balances traffic lights for true centering */}
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>

        {/* Resize handles — capture-based like the title bar */}
        {!win.maximized && (
          <>
            {(["n", "s", "e", "w"] as const).map((d) => (
              <div
                key={d}
                aria-hidden
                className={cn(
                  "absolute z-10 touch-none",
                  d === "n" && "left-2 right-2 top-0 h-1.5 cursor-n-resize",
                  d === "s" && "bottom-0 left-2 right-2 h-1.5 cursor-s-resize",
                  d === "e" && "bottom-2 right-0 top-2 w-1.5 cursor-e-resize",
                  d === "w" && "bottom-2 left-0 top-2 w-1.5 cursor-w-resize",
                )}
                onPointerDown={startResize(d)}
                onPointerMove={onHandlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={cancelDrag}
              />
            ))}
            {(["ne", "nw", "se", "sw"] as const).map((d) => (
              <div
                key={d}
                aria-hidden
                className={cn(
                  "absolute z-20 h-3 w-3 touch-none",
                  d === "ne" && "right-0 top-0 cursor-ne-resize",
                  d === "nw" && "left-0 top-0 cursor-nw-resize",
                  d === "se" && "bottom-0 right-0 cursor-se-resize",
                  d === "sw" && "bottom-0 left-0 cursor-sw-resize",
                )}
                onPointerDown={startResize(d)}
                onPointerMove={onHandlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={cancelDrag}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
