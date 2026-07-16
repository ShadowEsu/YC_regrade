import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RegradeLogo } from "./RegradeLogo";
import { scrollToId } from "../lib/scroll";
import { cn } from "../lib/utils";

const links = [
  { label: "How", href: "#how" },
  { label: "Connections", href: "#connections" },
  { label: "Review Studio", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Supervisor", href: "#supervisor" },
];

export function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function goTo(href: string) {
    setOpen(false);
    scrollToId(href);
  }

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -12, opacity: 0 }}
      transition={{ duration: 0.65, delay: ready ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-11 left-0 right-0 z-50 transition-all duration-300 sm:top-12",
        scrolled || open
          ? "border-b border-blue/10 bg-paper/95"
          : "border-b border-transparent bg-paper/80"
      )}
    >
      <div className="section-shell flex h-14 items-center justify-between sm:h-16">
        <a
          href="#top"
          className="flex items-center transition-transform duration-300 hover:scale-105"
          aria-label="Regrade home"
          onClick={() => setOpen(false)}
        >
          <RegradeLogo variant="wordmark" size={36} />
        </a>

        <div className="hidden items-center gap-5 text-[15px] font-medium text-muted md:flex md:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                goTo(link.href);
              }}
              className="relative transition-colors hover:text-ink group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              goTo("#waitlist");
            }}
            className="btn-pro inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-bold shadow-[0_10px_28px_-8px_rgba(30,79,255,0.7)] transition-transform duration-300 hover:scale-105"
          >
            Join for onboarding
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue/20 bg-blue-wash text-blue md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-blue/10 bg-paper md:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-3 pb-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(link.href);
                  }}
                  className="rounded-xl px-4 py-3 font-ui text-[16px] font-semibold text-ink transition-colors hover:bg-blue-wash hover:text-blue"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("#waitlist");
                }}
                className="btn-pro mt-2 inline-flex h-12 items-center justify-center rounded-xl px-6 text-[15px] font-bold"
              >
                Join for onboarding
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
