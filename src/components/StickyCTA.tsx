import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../lib/scroll";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const nearBottom =
        window.innerHeight + window.scrollY < document.body.offsetHeight - 120;
      setVisible(pastHero && nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 64, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/[0.06] bg-paper/95 px-4 py-3 backdrop-blur-xl sm:hidden"
        >
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#waitlist");
            }}
            className="btn-pro flex h-12 w-full items-center justify-center rounded-xl text-sm"
          >
            Join the waitlist
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
