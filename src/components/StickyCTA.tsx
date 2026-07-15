import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../lib/scroll";
import { REGRADE_CONFIG } from "../lib/site-config";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const download = document.getElementById("download");
      const downloadTop = download?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const nearDownload = downloadTop < window.innerHeight * 0.85;
      const waitlist = document.getElementById("waitlist");
      const waitlistTop = waitlist?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const nearWaitlist = waitlistTop < window.innerHeight * 0.85;
      setVisible(pastHero && !nearDownload && !nearWaitlist);
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
          className="fixed bottom-4 left-4 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:w-auto"
        >
          <a
            href={REGRADE_CONFIG.webAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pro flex h-12 items-center justify-center rounded-2xl px-6 text-[15px] font-bold shadow-[0_18px_40px_-12px_rgba(30,79,255,0.65)] sm:h-14 sm:min-w-[220px] sm:px-7 sm:text-[16px]"
          >
            Open web app
          </a>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#download");
            }}
            className="flex h-10 items-center justify-center rounded-2xl border border-blue/25 bg-paper/95 px-5 text-[13px] font-semibold text-blue backdrop-blur-sm transition-colors hover:border-blue hover:bg-blue-wash sm:h-11 sm:text-[14px]"
          >
            Download desktop
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
