"use client";

import { useState } from "react";
import { PAPERS, type Paper } from "@/data/papers";
import { ExternalLink, ChevronLeft } from "lucide-react";

export default function Notes({ payload }: { payload?: Record<string, unknown> }) {
  const initial =
    PAPERS.find((p) => p.slug === (typeof payload?.slug === "string" ? payload.slug : "")) ??
    PAPERS[0];
  const [selected, setSelected] = useState<Paper>(initial);
  const [showListMobile, setShowListMobile] = useState(false);

  const pick = (p: Paper) => {
    setSelected(p);
    setShowListMobile(false);
  };

  return (
    <div className="flex h-full min-h-0">
      {/* Master list — always visible ≥sm, toggled on mobile */}
      <aside
        aria-label="Notes list"
        className={`w-full shrink-0 flex-col border-r border-border sm:flex sm:w-60 ${
          showListMobile ? "flex" : "hidden sm:flex"
        }`}
      >
        <div className="border-b border-border px-3 py-2 text-xs font-semibold text-muted">
          {PAPERS.length} {PAPERS.length === 1 ? "Note" : "Notes"}
        </div>
        <div className="flex-1 overflow-auto" role="listbox" aria-label="Papers and notes">
          {PAPERS.map((p) => (
            <button
              key={p.slug}
              type="button"
              role="option"
              aria-selected={selected.slug === p.slug}
              onClick={() => pick(p)}
              className={`block w-full border-b border-border px-3 py-2.5 text-left ${
                selected.slug === p.slug
                  ? "bg-accent/10"
                  : "hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
              }`}
            >
              <div className="truncate text-sm font-medium">{p.title}</div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                <span
                  className={`shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold ${
                    p.status === "Building"
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                      : p.status === "In Progress"
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                        : p.status === "Published"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-black/10 text-muted dark:bg-white/10"
                  }`}
                >
                  {p.status}
                </span>
                <span className="truncate">{p.abstract}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Detail pane — hidden on mobile while the list is open */}
      <article
        className={`min-w-0 flex-1 overflow-auto p-5 ${showListMobile ? "hidden" : "block"}`}
      >
        <button
          type="button"
          className="mb-3 inline-flex items-center gap-1 text-sm text-accent hover:underline sm:hidden"
          onClick={() => setShowListMobile(true)}
        >
          <ChevronLeft size={14} /> All notes
        </button>
        <h2 className="text-lg font-semibold tracking-tight">{selected.title}</h2>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">{selected.status}</span>
          {selected.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[11px] dark:bg-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        {selected.url && (
          <a
            href={selected.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            <ExternalLink size={13} /> View implementation on GitHub
          </a>
        )}
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
          {selected.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
