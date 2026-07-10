import { motion } from "framer-motion";
import { useLiveVisitors } from "../hooks/useLiveVisitors";

export function LiveVisitorsBadge() {
  const visitorCount = useLiveVisitors();

  if (visitorCount === null || visitorCount < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
      className="pointer-events-none fixed bottom-[4.75rem] right-4 z-50 sm:bottom-4"
      aria-live="polite"
      aria-label={`${visitorCount} site visitors`}
    >
      <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-paper/90 px-3 py-1.5 text-[11px] font-medium text-muted shadow-sm backdrop-blur-md">
        <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-green" />
        <span className="tabular-nums text-ink">
          {visitorCount} <span className="text-muted">visited</span>
        </span>
      </div>
    </motion.div>
  );
}
