"use client";

import { useState } from "react";
import { FolderOpen, FileText, LayoutGrid, List } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { PAPERS } from "@/data/papers";
import { useDesktopStore } from "@/store/desktop";
import { DockGlyph } from "@/components/desktop/DockIcons";

type Section = "projects" | "papers" | "resume";
type ViewMode = "grid" | "list";

const SIDEBAR: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "papers", label: "Papers", icon: FileText },
  { id: "resume", label: "Resume", icon: FileText },
];

export default function Finder() {
  const [section, setSection] = useState<Section>("projects");
  const [view, setView] = useState<ViewMode>("grid");
  const openApp = useDesktopStore((s) => s.openApp);

  const openItem = (slug: string) => {
    if (section === "projects") openApp("projects", { slug });
    else if (section === "papers") openApp("notes", { slug });
    else openApp("resume");
  };

  const items =
    section === "projects"
      ? PROJECTS.map((p) => ({ slug: p.slug, title: p.title, sub: p.tagline, glyph: "projects" as const }))
      : section === "papers"
        ? PAPERS.map((p) => ({ slug: p.slug, title: p.title, sub: p.status, glyph: "notes" as const }))
        : [{ slug: "resume", title: "Aryan Gahlot — Resume.pdf", sub: "PDF document", glyph: "resume" as const }];

  return (
    <div className="flex h-full min-h-0">
      {/* Sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col gap-0.5 border-r border-border bg-black/[0.02] p-2 dark:bg-white/[0.03] sm:flex">
        <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Favorites
        </div>
        {SIDEBAR.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSection(s.id)}
            aria-pressed={section === s.id}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] ${
              section === s.id
                ? "bg-accent/15 font-medium text-accent"
                : "hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
            }`}
          >
            <s.icon size={14} className="shrink-0" />
            {s.label}
          </button>
        ))}
      </aside>

      {/* Main pane */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          <span className="text-xs font-medium text-muted capitalize">
            {SIDEBAR.find((s) => s.id === section)?.label}
          </span>
          <div className="flex gap-0.5" role="group" aria-label="View mode">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`rounded p-1 ${view === "grid" ? "bg-black/10 dark:bg-white/15" : "opacity-60 hover:opacity-100"}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`rounded p-1 ${view === "list" ? "bg-black/10 dark:bg-white/15" : "opacity-60 hover:opacity-100"}`}
              onClick={() => setView("list")}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        <div
          className={
            view === "grid"
              ? "grid flex-1 grid-cols-[repeat(auto-fill,minmax(110px,1fr))] content-start gap-2 overflow-auto p-3"
              : "flex-1 divide-y divide-border overflow-auto"
          }
          role="list"
        >
          {items.map((item) =>
            view === "grid" ? (
              <button
                key={item.slug}
                type="button"
                role="listitem"
                onDoubleClick={() => openItem(item.slug)}
                onClick={() => openItem(item.slug)}
                className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl shadow-sm">
                  <DockGlyph app={item.glyph} />
                </div>
                <span className="text-xs font-medium leading-tight line-clamp-2">{item.title}</span>
                <span className="text-[10px] text-muted line-clamp-1">{item.sub}</span>
              </button>
            ) : (
              <button
                key={item.slug}
                type="button"
                role="listitem"
                onClick={() => openItem(item.slug)}
                onDoubleClick={() => openItem(item.slug)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-sm">
                  <DockGlyph app={item.glyph} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item.title}</div>
                  <div className="truncate text-xs text-muted">{item.sub}</div>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
