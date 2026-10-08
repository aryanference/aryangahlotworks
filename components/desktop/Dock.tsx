"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { APP_META, useDesktopStore, type AppId } from "@/store/desktop";
import { DockGlyph } from "./DockIcons";
import { PROJECTS } from "@/data/projects";
import { PAPERS } from "@/data/papers";
import { POSTS } from "@/data/posts";

const DOCK_APPS: { app: AppId; badge?: number }[] = [
  { app: "finder" },
  { app: "terminal" },
  { app: "projects", badge: PROJECTS.length },
  { app: "notes", badge: PAPERS.length },
  { app: "writing", badge: POSTS.length },
  { app: "resume" },
  { app: "about" },
];

function DockIcon({
  app,
  badge,
  mouseY,
}: {
  app: AppId;
  badge?: number;
  mouseY: MotionValue<number>;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const { openApp, windows, bouncing, clearBounce } = useDesktopStore();
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseY, (y) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return y - bounds.y - bounds.height / 2;
  });
  const widthSync = useTransform(distance, [-95, 0, 95], [54, 76, 54]);
  const width = useSpring(widthSync, { stiffness: 260, damping: 22, mass: 0.4 });

  const isOpen = windows.some((w) => w.app === app);
  const isBouncing = bouncing.includes(app);
  const size = reduceMotion ? 54 : undefined;

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip — right of the icon in a vertical dock */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="dock-glass pointer-events-none absolute left-full top-1/2 z-10 ml-3 -translate-y-1/2 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap"
          >
            {APP_META[app].title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        type="button"
        aria-label={`Open ${APP_META[app].title}`}
        className="relative block touch-none"
        style={size ? { width: size, height: size } : { width, height: width }}
        animate={
          isBouncing && !reduceMotion
            ? { y: [0, -22, 0, -11, 0] }
            : { y: 0 }
        }
        transition={
          isBouncing
            ? { duration: 0.7, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeOut" }
            : { duration: 0.2 }
        }
        onAnimationComplete={() => isBouncing && clearBounce(app)}
        onClick={() => openApp(app)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        whileTap={reduceMotion ? undefined : { scale: 0.88 }}
      >
        <DockGlyph app={app} />
        {badge != null && badge > 0 && (
          <span
            aria-label={`${badge} items`}
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff3b30] px-1 text-[11px] font-semibold text-white shadow"
          >
            {badge}
          </span>
        )}
      </motion.button>

      {/* Running indicator */}
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full bg-current transition-opacity ${isOpen ? "opacity-80" : "opacity-0"}`}
      />
    </div>
  );
}

export default function Dock() {
  const mouseY = useMotionValue(Infinity);
  return (
    <nav
      aria-label="Applications dock"
      className="pointer-events-none fixed left-2 top-1/2 z-[998] -translate-y-1/2"
    >
      <motion.ul
        className="dock-glass pointer-events-auto flex flex-col items-center gap-1.5 rounded-[26px] px-2 py-3"
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(Infinity)}
      >
        {DOCK_APPS.map(({ app, badge }) => (
          <li key={app} className="list-none">
            <DockIcon app={app} badge={badge} mouseY={mouseY} />
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
