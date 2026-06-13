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
          className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.02em] text-ink"
          aria-label="Regrade home"
        >
          <RegradeLogo />
          Regrade
        </a>
        <div className="flex items-center gap-7 text-[15px] font-medium text-muted">
          <a href="#how" className="hidden sm:inline transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#features" className="hidden sm:inline transition-colors hover:text-ink">
            Features
          </a>
          <a href="#faq" className="hidden sm:inline transition-colors hover:text-ink">
            FAQ
          </a>
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#waitlist");
            }}
            className="btn-pro inline-flex h-10 items-center rounded-xl px-5 text-[14px]"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
