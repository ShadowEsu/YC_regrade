import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { ScrollHint } from "./ScrollHint";
import { scrollToId } from "../lib/scroll";

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
        <motion.div variants={block}>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/25 bg-blue-wash px-4 py-2 font-ui text-[13px] font-semibold text-ink">
            <span className="h-2 w-2 rounded-full bg-blue" />
            First 100 get Pro free for 1 year · Private beta
          </span>
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

        <motion.div variants={block} className="mx-auto mt-9 w-full max-w-[740px]">
          <WaitlistForm
            source="hero"
            submitLabel="Get early access"
            variant="light"
            layout="inline"
            size="lg"
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
