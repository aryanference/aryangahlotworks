"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { useDesktopStore } from "@/store/desktop";
import { searchItems, type SearchItem } from "@/lib/search";
import { toggleTheme } from "@/lib/theme";
import { LINKS } from "@/data/links";

const KIND_LABEL: Record<SearchItem["kind"], string> = {
  app: "Application",
  project: "Project",
  paper: "Paper",
  post: "Post",
  command: "Command",
};

/** Panel owns its own state — mounts fresh on every open. */
function SpotlightPanel({ onClose }: { onClose: () => void }) {
  const openApp = useDesktopStore((s) => s.openApp);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchItems(query).slice(0, 8), [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runItem = (item: SearchItem) => {
    onClose();
    if (item.kind === "command" && item.command) {
      if (item.command === "toggle-theme") toggleTheme();
      else if (item.command === "email") window.location.href = `mailto:${LINKS.email}`;
      else if (item.command === "resume") openApp("resume");
      return;
    }
    if (item.appId) openApp(item.appId, item.payload);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[idx] ?? results[0];
      if (item) runItem(item);
    }
  };

  return (
    <motion.div
      key="spotlight"
      className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/25 pt-[14vh] backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="spotlight-panel w-[560px] max-w-[92vw] overflow-hidden rounded-xl"
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Search size={16} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIdx(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search projects, papers, apps, commands…"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
            spellCheck={false}
            aria-label="Search query"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="spotlight-results"
          />
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block">
            esc
          </kbd>
        </div>

        {results.length > 0 && (
          <ul
            id="spotlight-results"
            role="listbox"
            aria-label="Search results"
            className="max-h-[50vh] overflow-auto p-1.5"
          >
            {results.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === idx}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left ${
                    i === idx ? "bg-accent text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => runItem(item)}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    <span
                      className={`block truncate text-xs ${
                        i === idx ? "text-white/75" : "text-muted"
                      }`}
                    >
                      {item.hint}
                    </span>
                  </span>
                  <span
                    className={`flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-wide ${
                      i === idx ? "text-white/75" : "text-muted"
                    }`}
                  >
                    {KIND_LABEL[item.kind]}
                    {i === idx && <CornerDownLeft size={11} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {query.trim() !== "" && results.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted">
            No results for “{query.trim()}”.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Spotlight() {
  const spotlightOpen = useDesktopStore((s) => s.spotlightOpen);
  const setSpotlight = useDesktopStore((s) => s.setSpotlight);
  return (
    <AnimatePresence>
      {spotlightOpen && <SpotlightPanel onClose={() => setSpotlight(false)} />}
    </AnimatePresence>
  );
}
