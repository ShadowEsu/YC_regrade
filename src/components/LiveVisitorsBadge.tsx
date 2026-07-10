import { motion } from "framer-motion";
import { useLiveVisitors } from "../hooks/useLiveVisitors";

export function LiveVisitorsBadge() {
  const liveCount = useLiveVisitors();

  if (liveCount === null || liveCount < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      className="pointer-events-none fixed bottom-[4.75rem] right-4 z-30 sm:bottom-4"
      aria-live="polite"
      aria-label={`${liveCount} live visitors`}
    >
      <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-paper/90 px-3 py-1.5 text-[11px] font-medium text-muted shadow-sm backdrop-blur-md">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        <span className="tabular-nums text-ink">
          {liveCount} <span className="text-muted">live</span>
        </span>
      </div>
    </motion.div>
  );
}
