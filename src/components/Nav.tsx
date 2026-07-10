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
      <div className="section-shell flex h-14 items-center justify-between">
        <a
          href="#top"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          aria-label="Regrade home"
        >
          <RegradeLogo variant="wordmark" size={40} />
        </a>
        <div className="flex items-center gap-7 text-[15px] font-medium text-muted">
          <a href="#how" className="relative hidden sm:inline transition-colors hover:text-ink group">
            How it works
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#product" className="relative hidden sm:inline transition-colors hover:text-ink group">
            Product
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#trust" className="relative hidden sm:inline transition-colors hover:text-ink group">
            Trust
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#waitlist");
            }}
            className="btn-pro inline-flex h-10 items-center rounded-xl px-5 text-[14px] transition-transform duration-300 hover:scale-105"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
