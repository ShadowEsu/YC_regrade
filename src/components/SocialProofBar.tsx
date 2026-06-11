import { Fragment } from "react";
import { motion } from "framer-motion";
import { REGRADE_CONFIG } from "../lib/site-config";
import { useAnimatedCounter } from "../hooks/useAnimatedCounter";
import { SectionReveal } from "./SectionReveal";

function WaitlistStats() {
  const { ref, value } = useAnimatedCounter(REGRADE_CONFIG.waitlistDisplayCount);
  const max = REGRADE_CONFIG.waitlistDisplayMax;
  const spotsLeft = max - REGRADE_CONFIG.waitlistDisplayCount;
  const spots = useAnimatedCounter(spotsLeft);

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card-pro px-6 py-6 text-center"
      >
        <div className="font-display text-[clamp(1.6rem,2.5vw,2.1rem)] font-semibold tabular-nums tracking-[-0.02em] text-ink">
          <span ref={ref}>{value}</span>
          <span className="text-faint"> / {max}</span>
        </div>
        <div className="mt-1 text-[13px] text-muted">Students on the waitlist</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card-pro px-6 py-6 text-center"
      >
        <div className="font-display text-[clamp(1.6rem,2.5vw,2.1rem)] font-semibold tabular-nums tracking-[-0.02em] text-ink">
          <span ref={spots.ref}>{spots.value}</span>
        </div>
        <div className="mt-1 text-[13px] text-muted">Pro Max spots remaining</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card-pro px-6 py-6 text-center"
      >
        <div className="font-display text-[clamp(1.6rem,2.5vw,2.1rem)] font-semibold tabular-nums tracking-[-0.02em] text-ink">
          $0
        </div>
        <div className="mt-1 text-[13px] text-muted">Cost during private beta</div>
      </motion.div>
    </Fragment>
  );
}

export function SocialProofBar() {
  return (
    <section id="live-stats" className="section-wash border-y border-black/[0.05] py-10">
      <div className="section-shell">
        <SectionReveal>
          <p className="mb-6 text-center text-[13px] font-medium text-muted">
            Early access is limited — first 100 students receive Pro Max free for 12 months
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <WaitlistStats />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
