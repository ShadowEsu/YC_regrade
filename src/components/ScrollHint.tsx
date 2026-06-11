import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function ScrollHint() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.a
      href="#narrative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mx-auto flex justify-center text-ink/35 transition-colors hover:text-ink/55"
      aria-label="Scroll down"
    >
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  );
}
