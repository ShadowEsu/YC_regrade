import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 22 });
  const sy = useSpring(y, { stiffness: 120, damping: 22 });

  useEffect(() => {
    setEnabled(!reduced && window.matchMedia("(pointer: fine)").matches);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35]"
      style={{
        left: sx,
        top: sy,
        background:
          "radial-gradient(circle, rgba(30,79,255,0.18) 0%, rgba(30,79,255,0.04) 40%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
