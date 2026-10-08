import type { Transition } from "framer-motion";

export const motionTransitions = {
  springSnappy: { type: "spring", stiffness: 320, damping: 26 } satisfies Transition,
  springSoft: { type: "spring", stiffness: 220, damping: 28 } satisfies Transition,
  fadeFast: { duration: 0.15 } satisfies Transition,
};
