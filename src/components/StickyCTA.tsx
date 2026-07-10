import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../lib/scroll";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const waitlist = document.getElementById("waitlist");
      const waitlistTop = waitlist?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const nearWaitlist = waitlistTop < window.innerHeight * 0.85;
      setVisible(pastHero && !nearWaitlist);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto"
        >
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#waitlist");
            }}
            className="btn-pro flex h-14 items-center justify-center rounded-2xl px-7 text-[16px] font-bold shadow-[0_18px_40px_-12px_rgba(30,79,255,0.65)] sm:min-w-[220px]"
          >
            Join the waitlist
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
