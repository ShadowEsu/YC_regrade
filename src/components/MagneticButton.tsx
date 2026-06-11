import { useRef, type ReactNode, type MouseEvent, type RefObject } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

function useMagnetic(ref: RefObject<HTMLElement | null>, reduced: boolean) {
  function onMove(e: MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return { onMove, onLeave };
}

export function MagneticButton({ children, className, href, onClick }: Props) {
  const reduced = useReducedMotion();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shared = cn(
    "inline-flex items-center justify-center transition-transform duration-200 ease-out",
    className
  );

  if (href) {
    const { onMove, onLeave } = useMagnetic(anchorRef, reduced);
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.97 }}
        className={shared}
      >
        {children}
      </motion.a>
    );
  }

  const { onMove, onLeave } = useMagnetic(buttonRef, reduced);
  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={shared}
    >
      {children}
    </motion.button>
  );
}
