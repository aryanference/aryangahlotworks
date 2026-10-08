"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "portfolio-theme";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // storage unavailable — theme still applies for this session
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

function subscribeToThemeClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

/** Reactive theme — updates whenever the <html> class changes (menu, terminal, spotlight). */
export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribeToThemeClass,
    () => getTheme(),
    () => "dark",
  );
}
