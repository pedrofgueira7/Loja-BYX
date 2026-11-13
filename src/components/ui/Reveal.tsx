"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Anima ao montar (primeira dobra) em vez de ao entrar na viewport. */
  immediate?: boolean;
  y?: number;
};

/**
 * Entrada suave (fade + subida discreta).
 * `MotionConfig reducedMotion="user"` (ver Providers) desliga o movimento
 * para quem prefere menos animação, mantendo apenas o fade.
 */
export function Reveal({ children, delay = 0, className, immediate = false, y = 24 }: Props) {
  const transition = { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const };
  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
