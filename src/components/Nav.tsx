import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RegradeLogo } from "./RegradeLogo";
import { scrollToId } from "../lib/scroll";
import { cn } from "../lib/utils";

export function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -12, opacity: 0 }}
      transition={{ duration: 0.65, delay: ready ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-11 left-0 right-0 z-50 transition-all duration-300 sm:top-12",
        scrolled
          ? "border-b border-black/[0.06] bg-paper/90 backdrop-blur-xl"
          : "border-b border-transparent bg-paper/70 backdrop-blur-md"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          aria-label="Regrade home"
        >
          <RegradeLogo variant="mark" size={42} />
        </a>
        <div className="flex items-center gap-5 text-[15px] font-medium text-muted sm:gap-6">
          <a href="#how" className="relative hidden sm:inline transition-colors hover:text-ink group">
            How
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#connections" className="relative hidden md:inline transition-colors hover:text-ink group">
            Connections
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#pricing" className="relative hidden md:inline transition-colors hover:text-ink group">
            Pricing
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#supervisor" className="relative hidden lg:inline transition-colors hover:text-ink group">
            Supervisor
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#waitlist");
            }}
            className="btn-pro animate-breathe-slow inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-bold transition-transform duration-300 hover:scale-105"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
