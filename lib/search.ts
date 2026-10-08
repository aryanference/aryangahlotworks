import type { AppId } from "@/store/desktop";

export interface SearchItem {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  kind: "app" | "project" | "paper" | "post" | "command";
  appId?: AppId;
  payload?: Record<string, unknown>;
  command?: "toggle-theme" | "email" | "resume";
}

import { PROJECTS } from "@/data/projects";
import { PAPERS } from "@/data/papers";
import { POSTS } from "@/data/posts";

export function buildSearchItems(): SearchItem[] {
  const apps: SearchItem[] = [
    { id: "app-finder", label: "Finder", hint: "Browse everything", keywords: "finder files browse", kind: "app", appId: "finder" },
    { id: "app-terminal", label: "Terminal", hint: "Interactive shell", keywords: "terminal shell cli commands", kind: "app", appId: "terminal" },
    { id: "app-projects", label: "Projects", hint: "Featured projects", keywords: "projects work github code", kind: "app", appId: "projects" },
    { id: "app-notes", label: "Notes", hint: "Papers and research", keywords: "notes papers research", kind: "app", appId: "notes" },
    { id: "app-writing", label: "Writing", hint: "Posts", keywords: "writing blog posts", kind: "app", appId: "writing" },
    { id: "app-resume", label: "Resume", hint: "PDF preview", keywords: "resume cv pdf", kind: "app", appId: "resume" },
    { id: "app-about", label: "About Me", hint: "Bio, skills, links", keywords: "about bio skills links contact", kind: "app", appId: "about" },
    {
      id: "cmd-theme",
      label: "Toggle Dark Mode",
      hint: "Command",
      keywords: "theme dark light mode toggle appearance",
      kind: "command",
      command: "toggle-theme",
    },
    {
      id: "cmd-email",
      label: "Email Aryan",
      hint: "Command",
      keywords: "email contact mail",
      kind: "command",
      command: "email",
    },
    {
      id: "cmd-resume",
      label: "Open Resume",
      hint: "Command",
      keywords: "resume cv download",
      kind: "command",
      command: "resume",
    },
  ];

  const projects: SearchItem[] = PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    hint: p.tagline,
    keywords: `${p.title} ${p.tagline} ${p.tech.join(" ")} project`,
    kind: "project" as const,
    appId: "projects" as const,
    payload: { slug: p.slug },
  }));

  const papers: SearchItem[] = PAPERS.map((p) => ({
    id: `paper-${p.slug}`,
    label: p.title,
    hint: `Paper — ${p.status}`,
    keywords: `${p.title} ${p.abstract} ${p.tags.join(" ")} paper research`,
    kind: "paper" as const,
    appId: "notes" as const,
    payload: { slug: p.slug },
  }));

  const posts: SearchItem[] = POSTS.map((p) => ({
    id: `post-${p.slug}`,
    label: p.title,
    hint: `Post — ${p.publishedOn}${p.date ? ` · ${p.date}` : ""}`,
    keywords: `${p.title} ${p.excerpt} ${p.tags.join(" ")} blog writing article`,
    kind: "post" as const,
    appId: "writing" as const,
    payload: { slug: p.slug },
  }));

  return [...apps, ...projects, ...papers, ...posts];
}

/** Simple fuzzy scorer: substring rank first, then in-order subsequence. */
export function fuzzyScore(query: string, item: SearchItem): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const hay = `${item.label} ${item.keywords}`.toLowerCase();
  const idx = hay.indexOf(q);
  if (idx !== -1) return 1000 - idx;
  // subsequence match
  let i = 0;
  for (const ch of hay) {
    if (ch === q[i]) i++;
    if (i === q.length) return 500 - (hay.length - q.length);
  }
  return -1;
}

export function searchItems(query: string): SearchItem[] {
  const items = buildSearchItems();
  return items
    .map((item) => ({ item, score: fuzzyScore(query, item) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
