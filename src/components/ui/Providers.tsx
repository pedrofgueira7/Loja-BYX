"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** `reducedMotion="user"` respeita prefers-reduced-motion em todas as animações. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
