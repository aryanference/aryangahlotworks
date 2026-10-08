"use client";

import { create } from "zustand";

export type AppId =
  | "finder"
  | "notes"
  | "writing"
  | "terminal"
  | "about"
  | "projects"
  | "resume";

export interface WindowState {
  id: string;
  app: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: { x: number; y: number; width: number; height: number };
  payload?: Record<string, unknown>;
}

interface DesktopStore {
  windows: WindowState[];
  focusedId: string | null;
  spotlightOpen: boolean;
  /** Apps that should be playing the dock bounce animation right now. */
  bouncing: AppId[];
  openApp: (app: AppId, payload?: Record<string, unknown>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number, x?: number, y?: number) => void;
  setSpotlight: (open: boolean) => void;
  clearBounce: (app: AppId) => void;
  hydrate: (windows: WindowState[], focusedId: string | null) => void;
  reset: () => void;
}

export const APP_META: Record<
  AppId,
  { title: string; defaultSize: { w: number; h: number }; minSize: { w: number; h: number } }
> = {
  finder: { title: "Finder", defaultSize: { w: 720, h: 480 }, minSize: { w: 420, h: 300 } },
  projects: { title: "Projects", defaultSize: { w: 680, h: 480 }, minSize: { w: 400, h: 320 } },
  notes: { title: "Notes", defaultSize: { w: 760, h: 500 }, minSize: { w: 460, h: 320 } },
  writing: { title: "Writing", defaultSize: { w: 760, h: 500 }, minSize: { w: 460, h: 320 } },
  terminal: { title: "Terminal", defaultSize: { w: 640, h: 420 }, minSize: { w: 380, h: 260 } },
  about: { title: "About Me", defaultSize: { w: 520, h: 560 }, minSize: { w: 360, h: 420 } },
  resume: { title: "Resume — Preview", defaultSize: { w: 720, h: 560 }, minSize: { w: 420, h: 380 } },
};

export const MENU_BAR_HEIGHT = 28;
/** Vertical breathing room kept below maximized windows (no bottom dock). */
export const DOCK_HEIGHT = 26;
const CASCADE = 24;
const MIN_VISIBLE = 60;

let counter = 0;
let zCounter = 10;

function nextId(app: AppId): string {
  counter += 1;
  return `${app}-${counter.toString(36)}`;
}

/** Clamp so the title bar always stays reachable. */
function clampPosition(x: number, y: number, width: number): { x: number; y: number } {
  if (typeof window === "undefined") return { x, y };
  const maxX = window.innerWidth - MIN_VISIBLE;
  const maxY = window.innerHeight - MENU_BAR_HEIGHT - 8;
  return {
    x: Math.min(Math.max(x, -width + MIN_VISIBLE + 24), Math.max(maxX, 0)),
    y: Math.min(Math.max(y, MENU_BAR_HEIGHT + 4), Math.max(maxY, MENU_BAR_HEIGHT + 4)),
  };
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [],
  focusedId: null,
  spotlightOpen: false,
  bouncing: [],

  openApp: (app, payload) => {
    const { windows } = get();
    const existing = windows.find((w) => w.app === app);
    if (existing) {
      set({
        windows: windows.map((w) =>
          w.id === existing.id
            ? { ...w, minimized: false, z: ++zCounter, payload: payload ?? w.payload }
            : w,
        ),
        focusedId: existing.id,
      });
      return;
    }

    const meta = APP_META[app];
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const openCount = windows.length;
    const w = Math.min(meta.defaultSize.w, vw - 24);
    const h = Math.min(meta.defaultSize.h, vh - MENU_BAR_HEIGHT - DOCK_HEIGHT - 16);
    // Tablet default: open maximized.
    const startMaximized = vw >= 768 && vw < 1024;
    let x = Math.max(12, Math.round((vw - w) / 2));
    let y = Math.max(MENU_BAR_HEIGHT + 8, Math.round((vh - DOCK_HEIGHT - h) / 2.4));
    x += (openCount % 6) * CASCADE;
    y += (openCount % 6) * CASCADE;
    ({ x, y } = clampPosition(x, y, w));

    const id = nextId(app);
    set({
      windows: [
        ...windows,
        {
          id,
          app,
          title: meta.title,
          x,
          y,
          width: w,
          height: h,
          z: ++zCounter,
          minimized: false,
          maximized: startMaximized,
          payload,
        },
      ],
      focusedId: id,
      bouncing: [...get().bouncing, app],
    });
  },

  closeWindow: (id) => {
    const { windows, focusedId } = get();
    const rest = windows.filter((w) => w.id !== id);
    const focusNext = rest.length
      ? rest.reduce((a, b) => (a.z > b.z ? a : b)).id
      : null;
    set({ windows: rest, focusedId: focusedId === id ? focusNext : focusedId });
  },

  focusWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, z: ++zCounter, minimized: false } : w,
      ),
      focusedId: id,
    });
  },

  minimizeWindow: (id) => {
    const { windows, focusedId } = get();
    const next = windows.map((w) => (w.id === id ? { ...w, minimized: true } : w));
    let nextFocus = focusedId;
    if (focusedId === id) {
      const visible = next.filter((w) => !w.minimized);
      nextFocus = visible.length
        ? visible.reduce((a, b) => (a.z > b.z ? a : b)).id
        : null;
    }
    set({ windows: next, focusedId: nextFocus });
  },

  toggleMaximize: (id) => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    set({
      windows: get().windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prevBounds) {
          const { x, y } = clampPosition(w.prevBounds.x, w.prevBounds.y, w.prevBounds.width);
          return { ...w, maximized: false, x, y, width: w.prevBounds.width, height: w.prevBounds.height, prevBounds: undefined };
        }
        return {
          ...w,
          maximized: true,
          prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 0,
          y: MENU_BAR_HEIGHT,
          width: vw,
          height: Math.max(240, vh - MENU_BAR_HEIGHT - DOCK_HEIGHT),
        };
      }),
    });
  },

  moveWindow: (id, x, y) => {
    set({
      windows: get().windows.map((w) => {
        if (w.id !== id || w.maximized) return w;
        const clamped = clampPosition(x, y, w.width);
        return { ...w, ...clamped };
      }),
    });
  },

  resizeWindow: (id, width, height, x, y) => {
    const meta = get().windows.find((w) => w.id === id);
    if (!meta) return;
    const m = APP_META[meta.app].minSize;
    set({
      windows: get().windows.map((w) =>
        w.id === id
          ? {
              ...w,
              width: Math.max(m.w, width),
              height: Math.max(m.h, height),
              x: x ?? w.x,
              y: y ?? w.y,
            }
          : w,
      ),
    });
  },

  setSpotlight: (open) => set({ spotlightOpen: open }),

  clearBounce: (app) => set({ bouncing: get().bouncing.filter((a) => a !== app) }),

  hydrate: (windows, focusedId) => {
    counter = windows.length;
    zCounter = windows.reduce((acc, w) => Math.max(acc, w.z), 10);
    set({ windows, focusedId });
  },

  reset: () => set({ windows: [], focusedId: null, spotlightOpen: false, bouncing: [] }),
}));

/* ---------- sessionStorage persistence ---------- */

const STORAGE_KEY = "portfolio-windows-v1";

let persistTimer: ReturnType<typeof setTimeout> | undefined;

function writeWindows() {
  const { windows, focusedId } = useDesktopStore.getState();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ windows, focusedId }));
  } catch {
    // quota/private mode — persistence is best-effort
  }
}

/** Debounced so dragging doesn't hammer storage; flushed on page hide. */
export function persistWindows() {
  if (typeof window === "undefined") return;
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(writeWindows, 120);
}

if (typeof window !== "undefined") {
  // Ensure the final state lands before the tab goes away.
  window.addEventListener("pagehide", () => {
    if (persistTimer) clearTimeout(persistTimer);
    writeWindows();
  });
}

export function restoreWindows(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { windows: WindowState[]; focusedId: string | null };
    if (!Array.isArray(parsed.windows)) return false;
    useDesktopStore.getState().hydrate(parsed.windows, parsed.focusedId);
    return parsed.windows.length > 0;
  } catch {
    return false;
  }
}
