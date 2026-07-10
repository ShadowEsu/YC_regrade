import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegradeLogo } from "./RegradeLogo";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    const timer = setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 400);
    }, 900);

    return () => clearTimeout(timer);
  }, [reduced, onDone]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-paper"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div
              className="animate-glow-pulse pointer-events-none absolute h-24 w-24 rounded-full bg-blue/20 blur-2xl"
              aria-hidden
            />
            <div className="animate-breathe relative">
              <RegradeLogo variant="app" size={64} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
