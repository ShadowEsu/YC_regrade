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
  "Free during beta",
  "Works with any grading system",
  "You send everything yourself",
];

type Props = {
  ready: boolean;
};

export function Hero({ ready }: Props) {
  return (
    <header
      id="top"
      className="relative flex min-h-[calc(100vh-108px)] flex-col items-center justify-center bg-gradient-to-b from-blue-soft via-[#f5f3ef] to-[#f8f6f3] px-6 pt-[108px] text-center sm:min-h-[calc(100vh-112px)] sm:pt-[116px]"
    >
      <motion.div
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
        className="mx-auto w-full max-w-[860px]"
      >
        <motion.div variants={block}>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-white/80 px-4 py-2 font-ui text-[13px] font-semibold text-ink shadow-[0_1px_2px_rgba(9,9,11,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
            Private beta · First 100 get Pro Max free for 1 year
          </span>
        </motion.div>

        <motion.h1
          variants={block}
          className="mt-8 font-display text-[clamp(2.75rem,6.8vw,5.25rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink"
        >
          Every grade can go higher.
          <br />
          <span className="text-blue">Regrade shows you how.</span>
        </motion.h1>

        <motion.p
          variants={block}
          className="mx-auto mt-7 max-w-[600px] font-display text-[clamp(17px,2.1vw,20px)] font-medium leading-[1.6] tracking-[-0.02em] text-muted"
        >
          Regrade scans your graded work against the rubric, finds every point you can get back, and
          shows your{" "}
          <span className="font-semibold text-ink">projected new score</span>. No redoing the work.
          Just the marks you already earned.
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
            className="font-ui text-[15px] font-semibold text-blue transition-colors hover:text-blue-deep"
          >
            See how it works →
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0">
        <ScrollHint />
      </div>
    </header>
  );
}
