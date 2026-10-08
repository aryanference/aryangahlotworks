# MASTER PROMPT: Convert Portfolio into a macOS-Style Desktop Experience

> Paste everything below into your coding agent (Claude Code, Cursor, etc.) with your portfolio repo open.

---

## 0. ROLE AND GOAL

You are a senior front-end engineer and interaction designer. Convert my existing portfolio (https://aryan-portfolio-web.vercel.app, a multi-page Next.js site) into an interactive **macOS-style desktop in the browser**, inspired by the interaction model of https://www.pranavhari.com/.

Keep all of my real content and facts. Change the presentation and interaction model, not what I say about myself. Do not copy another person's text, wallpaper, icons, or branding.

---

## 1. WHAT THE REFERENCE SITE DOES (OBSERVED, NOT ASSUMED)

Reference: https://www.pranavhari.com/

Observed from the rendered page:

- It is **not** a scrolling page. It is a single-screen desktop.
- **Wallpaper:** a full-bleed painting, with a small artwork credit link (title, artist) in a corner.
- **Dock** with icons: Finder, Notes (with a numeric badge), Terminal, Sightings, About, and a Projects folder (also with a count badge).
- **Windows** opened from the dock:
  - *Writing* (Notes-style)
  - *Projects* (a featured project card with an icon, short description, and Download / Star buttons)
  - *On Rotation* (an embedded Spotify playlist iframe)
  - *About*, containing outbound links: Twitter, LinkedIn, GitHub, Email
- Social links live inside the About window, not in a footer.

**Not verified:** the framework and libraries it uses. I could not read its script bundles and found no public repo. Treat the stack as unknown. Do not claim it uses any specific library. Build with the stack in section 3.

**Before you start:** if you can browse, open the reference site and inspect the Network and Elements panels to refine details such as window chrome, dock magnification, easing, and the open/close animation. Use it only as an interaction and layout reference.

---

## 2. REFERENCE IMPLEMENTATIONS TO STUDY (OPEN SOURCE)

Read the structure of these before writing code. Take architecture ideas, not code verbatim, and respect each repo's license.

| Repo | Stack | Learn from it |
|---|---|---|
| https://github.com/ekas-7/MAC-OS-Themed-Portfolio | Next.js, React, Tailwind, Framer Motion, TypeScript | Closest to my stack. Layout and responsive breakpoints (desktop 1024+, tablet 768-1023, mobile below 768). |
| https://github.com/Renovamen/playground-macos | React, Zustand, UnoCSS, TypeScript, Vite | Window and app state management with a Zustand store. |
| https://github.com/sebastienlato/MacOs-Portfolio | macOS-themed desktop | Boot sequence, magnifying dock, drag/resize/tile windows, working terminal. |
| https://github.com/Pranav-error/portfolio | Vanilla HTML/CSS/JS | Window momentum and snap, menu bar dropdowns, Spotlight-style search, keyboard shortcuts, toasts. |
| https://github.com/souravprogrammer/macos-portfolio | React, TypeScript, Vite | Light/dark mode handling. |
| https://github.com/PortfolioOS/macOS | Index of macOS-themed portfolios | More examples (it links PuruVJ/macos-web). |

---

## 3. TECH STACK AND CONSTRAINTS

- **Framework:** keep Next.js (App Router) and TypeScript. Check my `package.json` first and keep the existing major versions unless there is a blocker.
- **Styling:** Tailwind CSS, with design tokens as CSS variables.
- **Animation:** Framer Motion (drag, layout, presence, springs).
- **State:** Zustand for the window manager and the dock.
- **Icons:** `lucide-react` plus custom SVG dock icons I will draw or you generate originally. Do not use Apple's icons or any artist's assets.
- **No new heavy dependencies** without justification. Keep the initial JS bundle lean. Lazy-load each app window with `next/dynamic`.
- Deploy target: Vercel.

---

## 4. INFORMATION ARCHITECTURE: MAP MY CONTENT TO APPS

My current site: Home (hero, stats, tech stack), Projects, Papers, Blog, About, Resume, Contact. Convert as follows.

| Current section | New desktop element |
|---|---|
| Hero (name, tagline, "Available for research collaborations") | Desktop widget (top-right) plus the About window header |
| Tech Stack and Skills | **Terminal** app. Commands: `help`, `about`, `skills`, `projects`, `papers`, `exploring`, `contact`, `resume`, `clear`, `theme dark/light` |
| Featured Projects | **Finder** window with a "Projects" folder. Grid or list of project cards, each opening a detail window |
| Papers and Implementations | **Notes** app (sidebar list of papers and notes, content pane on the right) |
| Blog | **Writing** app (Notes-style list, MDX or markdown content) |
| Resume | Dock icon that opens a **Preview** window with an embedded PDF and a Download button |
| Contact and socials (GitHub, X, Email) | **About** window plus a **Contact** dock icon (mailto) |
| "Currently Exploring" | Terminal `exploring` command and a desktop sticky-note widget |

### My real content (do not invent anything else)

- **Name:** Aryan Gahlot. **Title:** ML & AI Researcher, Data Scientist.
- **Bio line:** Building intelligent systems at the intersection of machine learning, AI research, and data science.
- **Stats:** 9+ Projects, ML focused, 7+ Technologies.
- **Skills:**
  - ML & AI: PyTorch, TensorFlow, Scikit-learn, Deep Learning, NLP, LLMs, Transformers
  - Data Engineering: PySpark, Pandas, NumPy, SQL, Data Pipelines, ETL, Feature Engineering
  - Backend & Infra: Java (Spring Boot), .NET 8, Kubernetes, Kafka, AWS/GCP/Azure, Docker, Microservices
  - Development: Python, TypeScript, Next.js, Vue 3, REST APIs, Git, CI/CD
  - Research: Bayesian Methods, Statistical Modeling, Evolutionary Algorithms, Inference Optimization
- **Currently exploring:** LLM Reasoning, Evolutionary Search, Agent Systems, Mechanistic Interpretability.
- **Projects:**
  1. Heisenberg: autonomous financial research agent (TypeScript, LLM agents, finance). https://github.com/aryanference/Heisenberg-
  2. Evolving Deeper LLM Thinking: evolutionary inference-scaling framework (Python). https://github.com/aryanference/Evolving-Deeper-LLM-Thinking-impl
  3. Brain Tumor Detection: CNN on MRI scans. https://github.com/usergotnewexp/brain-tumor-res
  4. Bayesian Modeling: https://github.com/usergotnewexp/Bayesian-Model-re
  5. PySpark Data Pipeline: https://github.com/usergotnewexp/Pyspark-pipeline-implementation
- **Papers:** "Evolving Deeper LLM Thinking, Implementation Study" (In Progress); a "Coming Soon" placeholder.
- **Links:** GitHub https://github.com/aryanference, X @indeedlemonpie, email aryangahlot50@gmail.com, resume https://drive.google.com/file/d/1WK_-B1n7LUmYURGNdxpghS02xbI4plqv/view?usp=sharing
- **Bug to fix:** the current page metadata contains `localhost:3000` OG image URLs and leftover text from another person's site ("sumit.ml"). Replace these with correct values for my site.

Reuse the existing project and paper data by moving it into typed data files (`/data/projects.ts`, `/data/papers.ts`, `/data/skills.ts`) so the UI is data-driven.

---

## 5. VISUAL DESIGN SPEC

- **Wallpaper:** choose a public-domain or CC0 artwork or an original gradient/abstract image tied to ML (for example a generated mesh gradient). Include a small credit link bottom-left like the reference. Provide 2 wallpapers (light and dark) and serve them as optimized `.webp` through `next/image`.
- **Menu bar (top, 28px):** left: app name of the focused window plus File / Edit / View / Window / Help dropdowns (only meaningful items); right: clock (live, my local time), battery-style icon optional, a theme toggle. Translucent blur: `backdrop-filter: blur(20px) saturate(180%)`.
- **Dock (bottom, centered):** translucent rounded container, icon size 56px, magnify to ~80px on hover with neighbors scaling by distance (use Framer Motion `useMotionValue` and `useTransform` on mouse X). Running-app indicator dot. Bounce animation on first open. Tooltip label above icon.
- **Windows:** rounded corners (10-12px), subtle border and layered shadow, traffic-light buttons (close, minimize, maximize), title bar, drag by title bar, resize from edges and corners, focus raises z-index and dims inactive title bars.
  - Open animation: scale 0.92 → 1 and opacity 0 → 1 with a spring (stiffness ~300, damping ~28).
  - Minimize: shrink toward the dock icon position (genie-lite, using scale and translate).
  - Maximize: fill the area between menu bar and dock.
- **Typography:** system UI stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif`), monospace for Terminal (`"SF Mono", "JetBrains Mono", monospace`). Load Inter and JetBrains Mono via `next/font`.
- **Theme:** light and dark with tokens (`--bg`, `--surface`, `--surface-blur`, `--border`, `--text`, `--text-muted`, `--accent`). Respect `prefers-color-scheme`; the toggle overrides it and persists in `localStorage`.
- **Motion:** respect `prefers-reduced-motion` (disable magnification, bounce, and genie; keep simple fades).
- **Badges:** small red count badges on dock icons (for example Notes = number of papers/posts, Projects = number of projects), computed from data.

---

## 6. WINDOW MANAGER SPEC (CORE ENGINE)

Zustand store `useDesktopStore`:

```ts
type AppId = "finder" | "notes" | "writing" | "terminal" | "about" | "projects" | "resume" | "music" | "settings";

interface WindowState {
  id: string;            // unique per window instance
  app: AppId;
  title: string;
  x: number; y: number;
  width: number; height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: { x: number; y: number; width: number; height: number };
  payload?: Record<string, unknown>; // e.g. which project to show
}

interface DesktopStore {
  windows: WindowState[];
  focusedId: string | null;
  openApp(app: AppId, payload?: object): void;   // focus if already open (single-instance apps)
  closeWindow(id: string): void;
  focusWindow(id: string): void;
  minimizeWindow(id: string): void;
  toggleMaximize(id: string): void;
  moveWindow(id: string, x: number, y: number): void;
  resizeWindow(id: string, w: number, h: number, x?: number, y?: number): void;
}
```

Rules:

- New windows cascade with a 24px offset, clamped to the viewport.
- Windows cannot be dragged fully off-screen; keep the title bar reachable.
- Persist open windows and positions in `sessionStorage` (wrapped in try/catch) so a refresh restores the layout.
- Deep links: `/?open=projects` or `/?open=terminal` open that app on load, which also helps sharing and SEO.
- Keyboard: `Cmd/Ctrl+W` close, `Cmd/Ctrl+M` minimize, `Cmd/Ctrl+K` Spotlight search, `Esc` closes Spotlight, `Tab` cycles focus within the focused window.

---

## 7. APP SPECS

1. **Finder:** sidebar (Projects, Papers, Resume), main pane with icon grid or list toggle. Double-click a project opens a project detail window (title, description, tech tags, GitHub button).
2. **Projects window:** featured card layout like the reference (icon, short description, primary and secondary buttons), but with my five projects and a "View on GitHub" action.
3. **Notes / Writing:** two-column master-detail. Content loaded from MDX or markdown in `/content`. Include the "Evolving Deeper LLM Thinking" study as the first entry.
4. **Terminal:** real input handling with command history (up/down arrows), tab completion for command names, typed output with a short per-line delay, a `help` command listing all commands, unknown-command message, and `clear`.
5. **About:** photo placeholder or avatar, bio, stats, "Available for research collaborations" status chip, and the links row (GitHub, X, Email).
6. **Resume (Preview):** embedded PDF viewer of my resume file placed in `/public/resume.pdf` (I will supply it; until then, link to the Drive URL), with a Download button.
7. **On Rotation / Music (optional):** a Spotify embed iframe window, only if I provide a playlist URL. Skip it otherwise.
8. **Spotlight search (Cmd+K):** fuzzy search across projects, papers, posts, and commands. Enter opens the matching app and window.
9. **Boot screen (optional, first visit only):** a 1.2s logo fade and progress bar, skipped on repeat visits and with reduced motion.

---

## 8. RESPONSIVE AND MOBILE BEHAVIOR

- **Desktop (1024px and up):** full window manager.
- **Tablet (768-1023px):** windows open maximized by default, dock remains.
- **Mobile (below 768px):** do not render freeform draggable windows. Use an iOS-style home screen: app icon grid, tapping an icon opens a full-screen sheet with a back/close button; the dock becomes a fixed bottom bar with 4 apps. Terminal remains usable with the on-screen keyboard.
- Touch: support touch drag on desktop-sized tablets; minimum 44px tap targets.

---

## 9. SEO, ACCESSIBILITY, PERFORMANCE

- Because the UI is client-heavy, render a **server-side semantic fallback** (hidden visually but present in the DOM and in `<noscript>`): name, bio, project list with links, papers, and contact info, so crawlers and no-JS users still get everything.
- Fix metadata: correct `<title>`, description, OG and Twitter images (a real `/og.png` at 1200x630), canonical URL, and remove all `localhost` and "sumit.ml" references.
- Accessibility: windows use `role="dialog"` with `aria-labelledby`; dock is a `nav` with labeled buttons; full keyboard operability; visible focus rings; WCAG AA contrast in both themes.
- Performance targets: Lighthouse 90+ on Performance, Accessibility, and SEO. LCP under 2.5s: wallpaper through `next/image` with `priority`, apps code-split, no layout shift from the dock.

---

## 10. SUGGESTED FILE STRUCTURE

```
/app
  layout.tsx            // fonts, metadata, theme provider
  page.tsx              // <Desktop />, reads ?open= param
/components
  desktop/Desktop.tsx
  desktop/MenuBar.tsx
  desktop/Dock.tsx
  desktop/DockIcon.tsx
  desktop/Window.tsx    // chrome, drag, resize, traffic lights
  desktop/Spotlight.tsx
  desktop/MobileHome.tsx
  apps/Finder.tsx
  apps/Projects.tsx
  apps/Notes.tsx
  apps/Terminal.tsx
  apps/About.tsx
  apps/Resume.tsx
  apps/Music.tsx
/store/desktop.ts       // Zustand store
/data/{projects,papers,skills,links}.ts
/content/*.mdx
/lib/{search,commands,cn}.ts
/public/{wallpapers,icons,resume.pdf,og.png}
```

---

## 11. EXECUTION PLAN (WORK IN THIS ORDER)

1. Audit the current repo: list routes, components, data, and dependencies. Report what you will keep, move, or delete before changing anything.
2. Extract content into typed data files. Fix the metadata bugs.
3. Build the theme tokens, wallpaper, and menu bar.
4. Build the Zustand store and the `Window` component (drag, focus, minimize, maximize, resize).
5. Build the Dock with magnification and running indicators.
6. Build apps in this order: About, Projects/Finder, Terminal, Notes/Writing, Resume, Spotlight.
7. Add deep links, persistence, keyboard shortcuts.
8. Build the mobile home screen variant.
9. Add the SSR semantic fallback, SEO, and accessibility pass.
10. Test and polish: run lint, type-check, and a production build; fix all errors. Check Lighthouse.

After each numbered step, summarize what changed and what is next. Do not skip the audit.

---

## 12. ACCEPTANCE CRITERIA

- [ ] Opening the site shows a desktop with wallpaper, menu bar, and dock; no page scrolling on desktop.
- [ ] Every dock app opens a draggable, resizable, focusable window with working traffic-light buttons.
- [ ] All five projects, the paper entry, skills, and links from section 4 appear with correct data.
- [ ] Terminal supports `help`, `about`, `skills`, `projects`, `papers`, `exploring`, `contact`, `resume`, `clear`, and theme switching, with command history.
- [ ] Cmd/Ctrl+K opens Spotlight and finds content.
- [ ] Light and dark themes work and persist.
- [ ] Mobile below 768px shows the home-screen layout, not floating windows.
- [ ] `?open=projects` deep link works.
- [ ] No `localhost` or "sumit.ml" strings remain. `npm run build` passes with zero type errors.
- [ ] No third-party wallpapers, icons, or text copied from pranavhari.com.

---

## 13. RULES FOR THE AGENT

- Ask me before deleting any existing page or content file.
- If something here conflicts with my repo's reality (for example a different Next.js version), tell me and propose the smallest change.
- Do not invent projects, publications, employers, or metrics. If data is missing, leave a clearly marked TODO.
- Prefer small, reviewable commits with clear messages.
- When unsure about a design detail, choose the simplest macOS-faithful behavior and note the assumption.
