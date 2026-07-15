import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { ScrollHint } from "./ScrollHint";
import { scrollToId } from "../lib/scroll";
import { REGRADE_CONFIG } from "../lib/site-config";

const ease = [0.16, 1, 0.3, 1] as const;

const block = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export function Hero({ ready }: { ready: boolean }) {
  return (
    <header className="relative overflow-hidden border-b border-black/[0.07] bg-paper px-6 pb-16 pt-12 text-center">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue/[0.12] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-muted/25 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
        className="relative mx-auto w-full max-w-[820px]"
      >
        <motion.div variants={block} className="mx-auto max-w-[720px]">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue/30 bg-blue px-5 py-4 text-left text-white shadow-[0_16px_40px_-20px_rgba(30,79,255,0.7)] sm:px-6 sm:py-5">
              <p className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-white/75">
                When you start
              </p>
              <p className="mt-1.5 font-display text-[clamp(1.45rem,3.5vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
                2 months Plus free trial
              </p>
            </div>
            <div className="rounded-2xl border border-blue/25 bg-blue-wash px-5 py-4 text-left sm:px-6 sm:py-5">
              <p className="font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-blue">
                Waitlist offer
              </p>
              <p className="mt-1.5 font-display text-[clamp(1.45rem,3.5vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
                First 100 get Pro free for 1 year
              </p>
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={block}
          className="mt-7 font-display text-[clamp(2.6rem,7vw,4.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink"
        >
          Know what happened on your grade.{" "}
          <span className="text-gradient-live">Know what to do next.</span>
        </motion.h1>

        <motion.p
          variants={block}
          data-speakable="hero-subhead"
          className="mx-auto mt-5 max-w-[560px] font-ui text-[clamp(18px,2.2vw,21px)] leading-[1.6] text-muted"
        >
          Upload a marked exam. Understand it. Practise the weak spots. Appeal only when the
          evidence supports it.
        </motion.p>

        <motion.blockquote
          variants={block}
          className="mx-auto mt-7 max-w-[640px] border-l-4 border-blue pl-5 text-left sm:pl-6"
        >
          <p className="font-display text-[clamp(1.2rem,2.4vw,1.55rem)] font-medium leading-[1.35] tracking-[-0.02em] text-ink">
            “Built from a confusing mark — not a pitch deck story.”
          </p>
          <footer className="mt-2 font-ui text-[14px] text-muted">
            Preston Susanto · Founder
          </footer>
        </motion.blockquote>

        <motion.div variants={block} className="mx-auto mt-9 flex w-full max-w-[740px] flex-col items-center gap-4">
          <a
            href={REGRADE_CONFIG.webAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pro inline-flex h-14 w-full max-w-[420px] items-center justify-center rounded-xl px-8 text-[17px] font-bold shadow-[0_14px_36px_-14px_rgba(30,79,255,0.65)] transition-transform duration-300 hover:scale-[1.02] sm:w-auto sm:min-w-[280px]"
          >
            Open Regrade
          </a>
          <p className="font-ui text-[14px] text-muted">
            Use it in the browser — no download required.
          </p>
        </motion.div>

        <motion.div variants={block} className="mx-auto mt-8 w-full max-w-[560px]">
          <p className="mb-3 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
            Or join the waitlist for Pro offers
          </p>
          <WaitlistForm
            source="hero"
            submitLabel="Get early access"
            variant="light"
            layout="inline"
            size="md"
          />
        </motion.div>

        <motion.div variants={block} className="mt-5">
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#how");
            }}
            className="group font-ui text-[15px] font-semibold text-blue transition-colors hover:text-blue-deep"
          >
            See how it works{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="relative mt-12">
        <ScrollHint />
      </div>
    </header>
  );
}
