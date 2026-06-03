"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A warm glow that trails the cursor — the prototype "noticing" you.
 * Disabled for touch devices and reduced-motion users.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full opacity-60 blur-3xl"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(237,202,140,0.24),rgba(175,197,171,0.12)_42%,transparent_70%)]" />
    </motion.div>
  );
}
