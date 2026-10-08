"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  WALLPAPERS,
  WALLPAPER_INTERVAL_MS,
  wallpaperIndexForDate,
} from "@/data/wallpapers";

/**
 * Hourly rotating wallpaper. The index is deterministic (epoch hour modulo
 * the set size), so the rotation is on a fixed schedule and identical for
 * every visitor — it flips exactly at the top of each hour.
 */
export default function Wallpaper() {
  const [idx, setIdx] = useState(() => wallpaperIndexForDate(new Date()));
  // Frozen snapshot of the mount-time index: only that image gets LCP priority.
  const [firstIdx] = useState(() => wallpaperIndexForDate(new Date()));
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sync = () => {
      const next = wallpaperIndexForDate(new Date());
      setIdx((cur) => (cur === next ? cur : next));
    };
    // Re-check exactly at each hour boundary (with a small epsilon).
    const tick = (): ReturnType<typeof setTimeout> =>
      setTimeout(() => {
        sync();
        handle = tick();
      }, WALLPAPER_INTERVAL_MS - (Date.now() % WALLPAPER_INTERVAL_MS) + 10);
    let handle = tick();
    return () => clearTimeout(handle);
  }, []);

  const src = WALLPAPERS[idx];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={idx === firstIdx}
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
