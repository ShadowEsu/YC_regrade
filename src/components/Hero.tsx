import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollHint } from "./ScrollHint";
import { WaitlistForm } from "./WaitlistForm";
import { scrollToId } from "../lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

const block = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const trustItems = [
  "Student advocate built in",
  "Parent Mode for families",
  "You send everything yourself",
];

type Props = {
  ready: boolean;
};

export function Hero({ ready }: Props) {
  return (
    <header
      className="relative box-border flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(120deg,#eef2ff_0%,#dce7ff_25%,#f3efff_50%,#dfeaff_75%,#eef2ff_100%)] bg-animated-gradient px-6 pb-8 pt-10 text-center"
    >
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-blue/20 blur-[100px] animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-[#8b6bff]/15 blur-[100px] animate-blob-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-blue-muted/20 blur-[100px] animate-blob"
        aria-hidden
        style={{ animationDelay: "-4s" }}
      />

      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
        className="relative mx-auto w-full max-w-[860px]"
      >
        <motion.div variants={block} className="animate-breathe-slow">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-[13px] font-semibold text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
            </span>
            Launching soon · First 100 get Pro Max free for 1 year
          </span>
        </motion.div>

        <motion.h1
          variants={block}
          className="mt-8 font-display text-[clamp(2.75rem,6.8vw,5.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink"
        >
          Every grade can go higher.
          <br />
          <span className="text-gradient-live">Regrade shows you how.</span>
        </motion.h1>

        <motion.p
          variants={block}
          data-speakable="hero-subhead"
          className="mx-auto mt-7 max-w-[600px] font-display text-[clamp(17px,2.1vw,20px)] font-medium leading-[1.6] tracking-[-0.02em] text-muted"
        >
          Regrade scans your graded work against the rubric, finds every point you can get back, and
          shows your{" "}
          <span className="font-semibold text-ink">projected new score</span>. Your student advocate
          in your pocket — with Parent Mode for families who want the same clarity.
        </motion.p>

        <motion.div variants={block} className="mx-auto mt-10 w-full max-w-[720px]">
          <WaitlistForm
            source="hero"
            submitLabel="Join the waitlist"
            variant="light"
            layout="inline"
            accent="blue"
            size="lg"
          />
        </motion.div>

        <motion.div
          variants={block}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 font-ui text-[13px] font-medium text-muted"
            >
              <Check className="h-3.5 w-3.5 text-green" strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div variants={block} className="mt-6">
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#how");
            }}
            className="group font-ui text-[15px] font-semibold text-blue transition-colors hover:text-blue-deep"
          >
            See how it works{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0">
        <ScrollHint />
      </div>
    </header>
  );
}
