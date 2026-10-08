"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * First-visit boot animation (~1.2s). Skipped on repeat visits within the
 * session and for prefers-reduced-motion users.
 */
export default function BootScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hideTimer: number | undefined;
    const markBooted = () => {
      try {
        sessionStorage.setItem("portfolio-booted", "1");
      } catch {
        // can't persist — the boot screen may replay next visit; harmless
      }
    };
    // Decide asynchronously (post-mount) so first paint matches SSR output.
    const decideTimer = window.setTimeout(() => {
      let dismissed = true;
      try {
        dismissed = sessionStorage.getItem("portfolio-booted") === "1";
      } catch {
        // storage blocked — treat as dismissed so users aren't stuck in boot
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (dismissed || reduced) {
        markBooted();
        return;
      }
      setShow(true);
      hideTimer = window.setTimeout(() => {
        setShow(false);
        markBooted();
      }, 1350);
    }, 0);
    return () => {
      window.clearTimeout(decideTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[1100] flex flex-col items-center justify-center gap-5 bg-[#0b0b10]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 text-2xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            AG
          </motion.div>
          <div className="text-sm font-medium text-white/90">Aryan Gahlot</div>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-white/85"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
