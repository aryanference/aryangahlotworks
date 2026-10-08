"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import BootScreen from "./BootScreen";
import MobileHome from "./MobileHome";
import MusicWidget from "./MusicWidget";
import Wallpaper from "./Wallpaper";
import { DockGlyph } from "./DockIcons";
import AppContent from "@/components/apps/Registry";
import {
  useDesktopStore,
  persistWindows,
  restoreWindows,
  APP_META,
} from "@/store/desktop";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { PROFILE } from "@/data/links";
import { EXPLORING } from "@/data/skills";
import { PROJECTS } from "@/data/projects";

function HeroWidget() {
  const openApp = useDesktopStore((s) => s.openApp);
  return (
    <motion.button
      type="button"
      onClick={() => openApp("about")}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="dock-glass pointer-events-auto absolute right-4 top-10 hidden max-w-[300px] items-center gap-3 rounded-2xl p-3 text-left md:flex"
      aria-label="About Aryan Gahlot"
    >
      <Image
        src="/avatar.webp"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/15"
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold tracking-tight">
          {PROFILE.name}
        </span>
        <span className="block truncate text-xs text-muted">{PROFILE.title}</span>
        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[10.5px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {PROFILE.status}
        </span>
      </span>
    </motion.button>
  );
}

/** Desktop folder icon (top-left, right of the dock) — opens Projects. */
function DesktopFolderIcon() {
  const openApp = useDesktopStore((s) => s.openApp);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      onClick={() => openApp("projects")}
      className="pointer-events-auto absolute left-24 top-9 hidden flex-col items-center gap-1 md:flex"
      aria-label="Open Projects folder"
    >
      <div className="relative h-14 w-16 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform hover:scale-105">
        <DockGlyph app="projects" />
        <span
          aria-hidden
          className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff3b30] px-1 text-[11px] font-semibold text-white shadow"
        >
          {PROJECTS.length}
        </span>
      </div>
      <span className="rounded px-1.5 text-xs font-medium text-white mix-blend-luminosity drop-shadow">
        Projects
      </span>
    </motion.button>
  );
}

function StickyNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="pointer-events-auto absolute right-5 top-[168px] hidden w-56 rotate-[1.5deg] rounded-sm bg-[#fdf6b6] p-3.5 text-[#4a3f10] shadow-[0_10px_24px_rgba(0,0,0,0.25)] xl:block"
    >
      <div className="text-[11px] font-semibold uppercase tracking-wide opacity-70">
        Currently exploring
      </div>
      <ul className="mt-1.5 space-y-1 text-[12.5px] leading-snug">
        {EXPLORING.map((topic) => (
          <li key={topic} className="flex gap-1.5">
            <span aria-hidden>→</span> {topic}
          </li>
        ))}
      </ul>
      <div
        aria-hidden
        className="absolute -top-2.5 right-6 h-5 w-14 rotate-[-3deg] rounded-sm bg-[#e8b62c]/70"
      />
    </motion.div>
  );
}

export default function Desktop({ openAppParam }: { openAppParam?: string }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { windows, setSpotlight } = useDesktopStore();

  /* Mount: restore session, honor deep link, start persistence. */
  useEffect(() => {
    restoreWindows();
    if (openAppParam && openAppParam in APP_META) {
      useDesktopStore.getState().openApp(openAppParam as keyof typeof APP_META);
    }
    persistWindows();
    const unsub = useDesktopStore.subscribe(() => persistWindows());
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Global keyboard: Cmd/Ctrl+K spotlight, Esc closes it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlight(!useDesktopStore.getState().spotlightOpen);
      } else if (e.key === "Escape" && useDesktopStore.getState().spotlightOpen) {
        setSpotlight(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSpotlight]);

  if (isMobile) {
    return (
      <>
        <MobileHome />
        <Spotlight />
      </>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper />
      <HeroWidget />
      <DesktopFolderIcon />
      <StickyNote />

      {/* Windows layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence>
          {windows.map((win) => (
            <Window key={win.id} win={win}>
              <AppContent app={win.app} payload={win.payload} />
            </Window>
          ))}
        </AnimatePresence>
      </div>

      <MusicWidget />
      <MenuBar />
      <Dock />
      <Spotlight />
      <BootScreen />
    </div>
  );
}
