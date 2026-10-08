"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { PAPERS } from "@/data/papers";
import { SKILL_GROUPS, EXPLORING } from "@/data/skills";
import { LINKS, PROFILE } from "@/data/links";
import { setTheme, getTheme } from "@/lib/theme";
import { useDesktopStore } from "@/store/desktop";

interface Line {
  id: number;
  text: string;
  kind: "in" | "out" | "err" | "ok" | "link";
  href?: string;
}

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "papers",
  "exploring",
  "contact",
  "resume",
  "theme",
  "clear",
] as const;

const HELP: [string, string][] = [
  ["help", "list commands"],
  ["about", "whoami"],
  ["skills", "tech stack"],
  ["projects", "featured projects"],
  ["papers", "research notes"],
  ["exploring", "what I'm exploring now"],
  ["contact", "how to reach me"],
  ["resume", "open resume PDF"],
  ["theme dark|light", "switch theme"],
  ["clear", "clear the screen"],
];

let lineId = 0;
const L = (text: string, kind: Line["kind"] = "out", href?: string): Line => ({
  id: ++lineId,
  text,
  kind,
  href,
});

function banner(): Line[] {
  return [
    L("┌─ aryan@portfolio ──────────────────────┐", "ok"),
    L("│  ML & AI Researcher · Data Scientist   │", "ok"),
    L("└────────────────────────────────────────┘", "ok"),
    L('Type "help" for commands.'),
    L(""),
  ];
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(banner);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = useCallback((ls: Line[]) => {
    // Stagger output lines for a typed feel (brief per-line delay).
    setLines((prev) => [...prev, ...ls]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmdline = raw.trim();
      push([L(`aryan@portfolio ~ % ${cmdline}`, "in")]);
      if (!cmdline) return;
      setHistory((h) => [...h, cmdline]);
      setHistIdx(-1);

      const [cmd, ...args] = cmdline.split(/\s+/);
      const arg = args.join(" ").toLowerCase();

      switch (cmd.toLowerCase()) {
        case "help":
          push([L("Available commands:", "ok"), ...HELP.map(([c, d]) => L(`  ${c.padEnd(18)} ${d}`)), L("")]);
          break;
        case "about":
          push([
            L(PROFILE.name, "ok"),
            L(PROFILE.title),
            L(PROFILE.roles.join(" · ")),
            L(PROFILE.bio),
            L(""),
            L(`Status: ${PROFILE.status}`),
            L("Building now: SecorAi — see Notes app for details."),
            ...PROFILE.stats.map((s) => L(`  ${s.value.padEnd(4)} ${s.label}`)),
            L(""),
          ]);
          break;
        case "skills":
          push([
            ...SKILL_GROUPS.flatMap((g) => [L(`${g.label}:`, "ok"), L(`  ${g.items.join("  ·  ")}`), L("")]),
          ]);
          break;
        case "projects":
          push([
            L("Projects (9+ total — featured):", "ok"),
            ...PROJECTS.flatMap((p, i) => [
              L(`  ${i + 1}. ${p.title} — ${p.tagline}`),
              L(`     ${p.tech.join(", ")}`),
              L(`     ${p.url}`, "link", p.url),
            ]),
            L(""),
          ]);
          break;
        case "papers":
          push([
            L("Papers & studies:", "ok"),
            ...PAPERS.map((p) => L(`  [${p.status}] ${p.title}`)),
            L(""),
          ]);
          break;
        case "exploring":
          push([L("Currently exploring:", "ok"), ...EXPLORING.map((e) => L(`  → ${e}`)), L("")]);
          break;
        case "contact":
          push([
            L(`  email   ${LINKS.email}`, "link", `mailto:${LINKS.email}`),
            L(`  github  ${LINKS.github}`, "link", LINKS.github),
            L(`  x       ${LINKS.x} (${LINKS.xHandle})`, "link", LINKS.x),
            L(""),
          ]);
          break;
        case "resume":
          push([L("Opening resume…", "ok"), L(`  ${LINKS.resume}`, "link", LINKS.resume), L("")]);
          useDesktopStore.getState().openApp("resume");
          break;
        case "theme": {
          if (arg === "dark" || arg === "light") {
            setTheme(arg);
          } else {
            // toggle
            setTheme(getTheme() === "dark" ? "light" : "dark");
          }
          push([L(`Theme → ${getTheme()}`, "ok"), L("")]);
          break;
        }
        case "clear":
          setLines([]);
          break;
        default:
          push([L(`zsh: command not found: ${cmd}`, "err"), L('Type "help".'), L("")]);
      }
    },
    [push],
  );

  /* --- keyboard: history + tab completion --- */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      setHint(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      if (histIdx === -1) setDraft(input);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput(draft);
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const q = input.split(/\s+/)[0] ?? "";
      const matches = COMMANDS.filter((c) => c.startsWith(q.toLowerCase()) && q);
      if (matches.length === 1) {
        setInput(matches[0] + (matches[0] === "theme" ? " " : ""));
        setHint(null);
      } else if (matches.length > 1) {
        setHint(matches.join("   "));
      }
    } else if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      push([L(`aryan@portfolio ~ % ${input}^C`, "in")]);
      setInput("");
    }
  };

  return (
    <div
      className="flex h-full min-h-[200px] flex-col bg-[#0d1117] font-mono text-[12.5px] leading-relaxed text-[#c9d1d9]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3" aria-live="polite">
        {lines.map((l) =>
          l.href ? (
            <div key={l.id} className="term-line">
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="text-[#58a6ff] underline decoration-dotted underline-offset-2"
              >
                {l.text}
              </a>
            </div>
          ) : (
            <div
              key={l.id}
              className={`term-line ${
                l.kind === "in"
                  ? "text-[#e6edf3]"
                  : l.kind === "err"
                    ? "text-[#f85149]"
                    : l.kind === "ok"
                      ? "text-[#3fb950]"
                      : ""
              }`}
            >
              {l.text || "\u00a0"}
            </div>
          ),
        )}
        {hint && (
          <div className="term-line text-[#8b949e]">{hint}</div>
        )}
        {/* Prompt */}
        <label className="mt-1 flex items-baseline gap-1.5">
          <span className="shrink-0 text-[#3fb950]">aryan@portfolio</span>
          <span className="shrink-0 text-[#8b949e]">~ %</span>
          <span className="term-caret relative flex-1 cursor-text">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setHint(null);
              }}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent text-[#e6edf3] caret-transparent outline-none focus-visible:outline-none"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
            />
          </span>
        </label>
      </div>
    </div>
  );
}
