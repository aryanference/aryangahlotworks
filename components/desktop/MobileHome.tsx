"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun } from "lucide-react";
import { APP_META, type AppId } from "@/store/desktop";
import { DockGlyph } from "./DockIcons";
import Wallpaper from "./Wallpaper";
import AppContent from "@/components/apps/Registry";
import { toggleTheme, useTheme } from "@/lib/theme";
import { PROFILE } from "@/data/links";

const GRID_APPS: AppId[] = [
  "finder",
  "projects",
  "notes",
  "writing",
  "terminal",
  "resume",
  "about",
];

const BAR_APPS: AppId[] = ["projects", "terminal", "notes", "about"];

export default function MobileHome() {
  const [sheet, setSheet] = useState<AppId | null>(null);
  const theme = useTheme();

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <Wallpaper />

      {/* Header */}
      <header className="flex items-start justify-between gap-3 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/avatar.webp"
            alt=""
            width={46}
            height={46}
            priority
            className="h-[46px] w-[46px] shrink-0 rounded-full object-cover ring-1 ring-white/30"
          />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold leading-tight tracking-tight text-white mix-blend-luminosity">
              {PROFILE.name}
            </h1>
            <p className="truncate text-xs text-white/85 mix-blend-luminosity">{PROFILE.title}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[10px] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {PROFILE.status}
            </span>
          </div>
        </div>
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick={() => toggleTheme()}
          className="shrink-0 rounded-lg border border-white/25 bg-white/10 p-2 text-white backdrop-blur"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </header>

      {/* App grid */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-28">
        <ul className="grid w-full max-w-xs grid-cols-4 gap-x-4 gap-y-6" aria-label="Applications">
          {GRID_APPS.map((app) => (
            <li key={app} className="flex list-none flex-col items-center gap-1.5">
              <button
                type="button"
                aria-label={`Open ${APP_META[app].title}`}
                className="h-[58px] w-[58px] overflow-hidden rounded-[15px] shadow-lg active:scale-90 transition-transform"
                onClick={() => setSheet(app)}
              >
                <DockGlyph app={app} />
              </button>
              <span className="text-[11px] text-white mix-blend-luminosity">
                {APP_META[app].title}
              </span>
            </li>
          ))}
        </ul>
      </main>

      {/* Bottom bar */}
      <nav
        aria-label="Dock"
        className="dock-glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-20 flex justify-around rounded-2xl py-2"
      >
        {BAR_APPS.map((app) => (
          <button
            key={app}
            type="button"
            aria-label={`Open ${APP_META[app].title}`}
            className="h-[52px] w-[52px] overflow-hidden rounded-[14px] shadow active:scale-90 transition-transform"
            onClick={() => setSheet(app)}
          >
            <DockGlyph app={app} />
          </button>
        ))}
      </nav>

      {/* Full-screen sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            key={sheet}
            role="dialog"
            aria-modal="true"
            aria-label={APP_META[sheet].title}
            className="fixed inset-0 z-30 flex flex-col bg-bg"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="titlebar flex items-center gap-2 border-b border-border px-3 py-2">
              <button
                type="button"
                aria-label="Close"
                className="rounded-full p-1.5 hover:bg-black/10 dark:hover:bg-white/10"
                onClick={() => setSheet(null)}
                autoFocus
              >
                <X size={18} />
              </button>
              <span className="text-sm font-semibold">{APP_META[sheet].title}</span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <AppContent app={sheet} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
