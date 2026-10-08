"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { PROJECTS, getProject, type Project } from "@/data/projects";
import { DockGlyph } from "@/components/desktop/DockIcons";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onDoubleClick={onOpen}
      className="group flex w-full items-start gap-3 rounded-xl border border-border p-4 text-left transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
    >
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm">
        <DockGlyph app="projects" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold">{project.title}</h3>
          {project.featured && (
            <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              Featured
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>
      </div>
    </button>
  );
}

export default function Projects({ payload }: { payload?: Record<string, unknown> }) {
  const initial = getProject(typeof payload?.slug === "string" ? payload.slug : undefined);
  const [selected, setSelected] = useState<Project | null>(initial ?? null);

  return (
    <div className="flex h-full flex-col">
      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <motion.div
            key={selected.slug}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.18 }}
            className="flex h-full flex-col p-6"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-4 inline-flex w-fit items-center gap-1 text-sm text-accent hover:underline"
            >
              <ArrowLeft size={14} /> All projects
            </button>

            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl shadow">
                <DockGlyph app="projects" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{selected.title}</h2>
                <p className="text-sm text-muted">{selected.tagline}</p>
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed">{selected.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {selected.tech.map((t) => (
                <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-2 pt-6">
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <GithubIcon size={15} /> View on GitHub
              </a>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Star size={15} /> Star
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full space-y-2 overflow-auto p-4"
            role="listbox"
            aria-label="Projects"
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={() => setSelected(p)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
