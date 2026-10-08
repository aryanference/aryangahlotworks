"use client";

import Image from "next/image";
import { Mail, Rocket, GraduationCap } from "lucide-react";
import { GithubIcon, XIcon, MediumIcon } from "@/components/icons";
import { LINKS, PROFILE, EXPERIENCE, EDUCATION } from "@/data/links";
import { SKILL_GROUPS } from "@/data/skills";
import { useDesktopStore } from "@/store/desktop";

export default function About() {
  const openApp = useDesktopStore((s) => s.openApp);

  return (
    <div className="mx-auto max-w-lg p-6">
      {/* Header — the photo is the visual anchor */}
      <div className="flex items-start gap-4">
        <Image
          src="/avatar.webp"
          alt={`Portrait of ${PROFILE.name}`}
          width={84}
          height={84}
          priority
          className="h-[84px] w-[84px] shrink-0 rounded-2xl object-cover shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-1 ring-black/10 dark:ring-white/15"
        />
        <div className="min-w-0 pt-0.5">
          <h2 className="text-[22px] font-semibold leading-tight tracking-tight">
            {PROFILE.name}
          </h2>
          <p className="mt-0.5 text-sm text-muted">{PROFILE.title}</p>
          <p className="text-[13px] text-muted">
            Builder, marketer, entrepreneur — currently building SecorAi.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11.5px] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {PROFILE.status}
          </span>
        </div>
      </div>

      <p className="mt-4 text-[14.5px] leading-relaxed">{PROFILE.bio}</p>

      {/* The one bold element: the founder story */}
      <button
        type="button"
        onClick={() => openApp("notes", { slug: "secorai" })}
        className="mt-5 flex w-full items-start gap-3 rounded-xl border border-accent/25 bg-accent/[0.07] p-4 text-left transition-colors hover:bg-accent/[0.12]"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Rocket size={17} />
        </span>
        <span className="min-w-0">
          <span className="block text-[11.5px] font-semibold text-accent">
            Building now
          </span>
          <span className="mt-0.5 block text-[14.5px] font-semibold">
            SecorAi
          </span>
          <span className="block text-[12.5px] leading-relaxed text-muted">
            A self-hosted control layer that scopes, contains, and proves every
            AI-agent action. Open the note in Notes for the full story.
          </span>
        </span>
      </button>

      {/* Stats — quiet strip, no card kit */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-border">
        {PROFILE.stats.map((s, i) => (
          <div key={s.label} className={i === 0 ? "pr-3" : "px-3"}>
            <div className="text-[20px] font-semibold tabular-nums leading-none">
              {s.value}
            </div>
            <div className="mt-1 text-[11.5px] text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Experience — a real chronology, so the timeline is earned */}
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted">Experience</div>
        <ol className="relative ml-1 mt-2.5 space-y-3 border-l border-border pl-4">
          {EXPERIENCE.map((e) => (
            <li key={`${e.role}-${e.org}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[21px] top-[7px] h-2 w-2 rounded-full bg-accent shadow-[0_0_0_3px_var(--surface)]"
              />
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13.5px]">
                  <span className="font-medium">{e.role}</span>
                  <span className="text-muted"> — {e.org}</span>
                </span>
                {e.period && (
                  <span className="shrink-0 text-[11px] tabular-nums text-muted">
                    {e.period}
                  </span>
                )}
              </div>
              {e.detail && <div className="mt-0.5 text-xs text-muted">{e.detail}</div>}
            </li>
          ))}
        </ol>
        <p className="mt-3.5 flex items-start gap-2 text-[12.5px] text-muted">
          <GraduationCap size={14} className="mt-0.5 shrink-0" />
          {EDUCATION}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted">Skills</div>
        <div className="mt-2.5 space-y-2.5">
          {SKILL_GROUPS.map((g) => (
            <div key={g.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
              <span className="w-[8.5rem] shrink-0 text-[13px] font-medium">
                {g.label}
              </span>
              <span className="flex flex-wrap gap-1">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] dark:bg-white/10"
                  >
                    {s}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mt-6">
        <div className="text-[12px] font-medium text-muted">Links</div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] hover:bg-black/5 dark:hover:bg-white/10"
          >
            <GithubIcon size={15} /> GitHub
          </a>
          <a
            href={LINKS.x}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] hover:bg-black/5 dark:hover:bg-white/10"
          >
            <XIcon size={14} /> X
          </a>
          <a
            href={LINKS.medium}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] hover:bg-black/5 dark:hover:bg-white/10"
          >
            <MediumIcon size={14} /> Medium
          </a>
          <a
            href={`mailto:${LINKS.email}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] hover:bg-black/5 dark:hover:bg-white/10"
          >
            <Mail size={15} /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
