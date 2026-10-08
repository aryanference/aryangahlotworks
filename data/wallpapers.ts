/**
 * Desktop wallpapers, rotated on a fixed schedule: the index is derived from
 * the UTC epoch hour, so the wallpaper changes at the top of every hour and
 * every visitor sees the same one for a given hour. The same set is used in
 * light and dark themes.
 */
export const WALLPAPERS = [
  "/wallpapers/wall-1.webp",
  "/wallpapers/wall-2.webp",
  "/wallpapers/wall-3.webp",
  "/wallpapers/wall-4.webp",
  "/wallpapers/wall-5.webp",
] as const;

export const WALLPAPER_INTERVAL_MS = 3_600_000; // one hour

export function wallpaperIndexForDate(date: Date): number {
  return Math.floor(date.getTime() / WALLPAPER_INTERVAL_MS) % WALLPAPERS.length;
}
