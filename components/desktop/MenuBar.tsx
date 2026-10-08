"use client";

import { useEffect, useRef, useState } from "react";
import { APP_META, MENU_BAR_HEIGHT, useDesktopStore } from "@/store/desktop";
import { toggleTheme, useTheme } from "@/lib/theme";
import { Moon, Sun, Command } from "lucide-react";

type MenuId = "file" | "edit" | "window" | "help" | null;

export default function MenuBar() {
  const { windows, focusedId, closeWindow, minimizeWindow, setSpotlight, openApp, reset } =
    useDesktopStore();
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState<MenuId>(null);
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    const t0 = window.setTimeout(update, 0);
    const t = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const focusedWin = windows.find((w) => w.id === focusedId);
  const appName = focusedWin ? APP_META[focusedWin.app].title : "Desktop";

  const time = now
    ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "";
  const date = now
    ? now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
    : "";

  const menus: { id: Exclude<MenuId, null>; label: string; items: { label: string; action?: () => void; disabled?: boolean; shortcut?: string }[] }[] = [
    {
      id: "file",
      label: "File",
      items: [
        { label: "Close Window", action: () => focusedWin && closeWindow(focusedWin.id), disabled: !focusedWin, shortcut: "⌘W" },
        { label: "About Me", action: () => openApp("about") },
      ],
    },
    {
      id: "edit",
      label: "Edit",
      items: [
        { label: "Minimize", action: () => focusedWin && minimizeWindow(focusedWin.id), disabled: !focusedWin, shortcut: "⌘M" },
      ],
    },
    {
      id: "window",
      label: "Window",
      items: [
        ...windows.map((w) => ({
          label: w.title,
          action: () => useDesktopStore.getState().focusWindow(w.id),
        })),
        ...(windows.length ? [{ label: "Close All Windows", action: reset }] : []),
        ...(windows.length === 0 ? [{ label: "No windows open", disabled: true }] : []),
      ],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { label: "Search", action: () => setSpotlight(true), shortcut: "⌘K" },
        { label: "Open Terminal Help", action: () => openApp("terminal") },
      ],
    },
  ];

  return (
    <header
      ref={ref}
      className="menubar-glass fixed inset-x-0 top-0 z-[999] flex items-center gap-1 px-3 text-[13px] font-medium"
      style={{ height: MENU_BAR_HEIGHT }}
    >
      <span className="mr-1 font-semibold tracking-tight">{appName}</span>
      {menus.map((m) => (
        <div key={m.id} className="relative">
          <button
            type="button"
            className={`rounded px-2 py-0.5 hover:bg-black/10 dark:hover:bg-white/15 ${open === m.id ? "bg-black/10 dark:bg-white/15" : ""}`}
            onClick={() => setOpen(open === m.id ? null : m.id)}
            onMouseEnter={() => open && setOpen(m.id)}
            aria-expanded={open === m.id}
            aria-haspopup="menu"
          >
            {m.label}
          </button>
          {open === m.id && (
            <div
              role="menu"
              className="menubar-glass absolute left-0 top-full mt-1 min-w-[220px] overflow-hidden rounded-lg py-1 shadow-xl"
            >
              {m.items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  className="flex w-full items-center justify-between gap-6 px-3 py-1 text-left text-[13px] hover:bg-accent hover:text-white disabled:opacity-40"
                  onClick={() => {
                    item.action?.();
                    setOpen(null);
                  }}
                >
                  <span>{item.label}</span>
                  {item.shortcut && <kbd className="text-[11px] opacity-60">{item.shortcut}</kbd>}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Open Spotlight search (Ctrl or Cmd + K)"
          className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/15"
          onClick={() => setSpotlight(true)}
        >
          <Command size={13} />
        </button>
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/15"
          onClick={() => toggleTheme()}
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>
        <span className="px-1 tabular-nums" suppressHydrationWarning>
          {date} {time}
        </span>
      </div>
    </header>
  );
}
