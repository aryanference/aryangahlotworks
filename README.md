# Aryan Gahlot — Portfolio (macOS-style desktop)

An interactive portfolio built as a macOS-style desktop in the browser: menu bar, magnifying dock, draggable/resizable windows, Spotlight search, and a working terminal — with a mobile home-screen fallback under 768px.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Zustand, and lucide-react.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Regenerate assets

`public/og.png` (1200x630 social card) is generated art:

```bash
node scripts/gen-assets.cjs
```

## Deploy (Vercel)

Repository: https://github.com/aryanference/aryangahlotworks

1. Push to GitHub (branch `main`).
2. Import at [vercel.com/new](https://vercel.com/new) — no environment variables required.
3. Framework preset: Next.js (auto-detected). Build command `npm run build`.

The canonical/OG URL resolves automatically from Vercel's production domain; to pin a custom domain later, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://aryangahlotworks.com`) in Vercel project settings.

## Structure

- `app/` — layout (fonts, metadata, theme), page (deep links via `?open=`)
- `components/desktop/` — Window manager chrome: Desktop, MenuBar, Dock, Window, Spotlight, BootScreen, MobileHome, Wallpaper, MusicWidget
- `components/apps/` — Finder, Projects, Notes, Writing, Terminal, About, Resume (lazy-loaded)
- `store/desktop.ts` — Zustand window manager (positions, z-order, persistence)
- `data/` — typed content: projects, papers, posts, skills, links, music, wallpapers
- `scripts/gen-assets.cjs` — OG image generation

## Notes

- `framer-motion` is pinned to the 13.5.x line: 14.0.0 (published Oct 2026) does not apply `animate`/`exit` values on React 19.2 — windows render but never animate. Verify animations before upgrading past 13.x.
- The Resume window embeds the Google-Drive-hosted PDF. To switch to a local file, drop `public/resume.pdf` and update `LINKS.resume`/`LINKS.resumeEmbed` in `data/links.ts`.

## Wallpapers

Five curated wallpapers rotate hourly on a fixed schedule (epoch-hour based, so every visitor sees the same one per hour). Sources live in `public/wallpapers/wall-*.webp`, the list/schedule in `data/wallpapers.ts`. The same set is used in light and dark themes. To swap one, replace the file and keep the name, or edit `WALLPAPERS` in the data file.

## On Rotation (music widget)

Currently wired to a YouTube playlist: the widget embeds the playlist player inline, and OPEN/the play button link out. A Spotify/custom-track-list mode is also supported — see `data/music.ts` (`platform`, `tracks`, `previewUrl`). Fill in only your own playlist data.

## Content edits

All real content lives in typed data files: `data/projects.ts`, `data/papers.ts`, `data/posts.ts`, `data/skills.ts`, `data/links.ts`, `data/music.ts`, `data/wallpapers.ts`. Dock badges, terminal output, Spotlight search, and the On Rotation widget derive from these automatically.
