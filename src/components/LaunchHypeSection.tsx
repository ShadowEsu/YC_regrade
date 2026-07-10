import { motion } from "framer-motion";
import { SectionReveal } from "./SectionReveal";
import { scrollToId } from "../lib/scroll";

export function LaunchHypeSection() {
  return (
    <section
      id="launch"
      className="relative overflow-hidden border-y border-blue/10 bg-gradient-to-b from-[#eef3ff] via-[#f5f8ff] to-paper py-[clamp(56px,8vw,96px)]"
    >
      <div
        className="pointer-events-none absolute -right-24 top-8 h-64 w-64 rounded-full bg-blue/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-blue-muted/15 blur-3xl"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <div className="mx-auto max-w-[720px] text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-4 py-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-blue shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
              </span>
              Launching very soon
            </motion.span>

            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
              New look. Bigger mission.
              <br />
              <span className="text-blue">The accountability layer for grading.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.65] text-muted">
              Regrade 2.0 is almost here — a student advocate for appeals, Parent Mode for families,
              and the first real check on whether grading matches the rubric.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mx-auto mt-10 max-w-[860px]">
            <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(30,79,255,0.12)]">
              <video
                src="/launch-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/logo-wordmark.png"
                className="aspect-video w-full object-cover"
                aria-label="Regrade logo launch animation"
              />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <div className="mx-auto mt-8 flex max-w-[520px] flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#waitlist");
              }}
              className="btn-pro inline-flex h-12 items-center rounded-xl px-8 text-[15px]"
            >
              Get early access
            </a>
            <p className="text-center text-[14px] text-muted sm:text-left">
              First 100 on the waitlist get{" "}
              <span className="font-semibold text-ink">Pro Max free for 1 year</span>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
