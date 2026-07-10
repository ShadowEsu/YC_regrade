import { motion } from "framer-motion";
import { FileText, MessageCircle } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import { ScrollHint } from "./ScrollHint";
import { RegradeLogo } from "./RegradeLogo";
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

const evidenceCards = [
  {
    tone: "green" as const,
    label: "Strength",
    body: "Claim is clear and backed by sources.",
  },
  {
    tone: "blue" as const,
    label: "Practise",
    body: "Connect the second quote to your claim.",
  },
  {
    tone: "amber" as const,
    label: "Clarify",
    body: "Rubric says 4 pts — the deduction is unclear.",
  },
];

const toneClass = {
  green: "border-green/20 bg-green/[0.06] text-green",
  blue: "border-blue/20 bg-blue/[0.06] text-blue",
  amber: "border-[#bd7b00]/20 bg-[#fff8e6] text-[#a86800]",
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
          className="mt-8 font-display text-[clamp(2.75rem,6.4vw,5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink"
          data-speakable="hero-subhead"
        >
          Know what happened on your grade.
          <br />
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

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, delay: 0.28, ease }}
        className="relative mx-auto mt-14 w-full max-w-[920px] text-left"
        aria-label="Preview of Regrade Review Studio"
      >
        <div className="overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_24px_70px_rgba(9,9,11,0.1)]">
          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3.5 font-ui text-[12px] font-semibold text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green" />
              Review Studio
            </span>
            <span>Essay 2 · marked work</span>
          </div>
          <div className="grid gap-0 md:grid-cols-[1.12fr_.88fr]">
            <div className="border-b border-black/[0.07] p-6 md:border-b-0 md:border-r md:p-8">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-blue">
                <FileText className="h-4 w-4" />
                Visible evidence
              </div>
              <h2 className="mt-3 text-[19px] font-bold tracking-[-0.025em] text-ink">
                Question 4 · Evidence
              </h2>
              <div className="mt-5 space-y-3">
                {evidenceCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={ready ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.5, ease }}
                    className={`rounded-xl border p-4 ${toneClass[card.tone]}`}
                  >
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em]">{card.label}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink">{card.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-cream p-6 md:p-7">
              <p className="font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                Ask Mr Whale
              </p>
              <div className="mt-5 flex justify-end">
                <div className="max-w-[210px] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[14px] leading-relaxed text-white">
                  What should I practise?
                </div>
              </div>
              <div className="mt-5 flex items-end gap-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center animate-whale">
                  <RegradeLogo variant="whale" size={34} />
                </span>
                <div className="rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-3 text-[14px] leading-relaxed text-ink shadow-sm">
                  Connect each quote back to your claim. Start here, then check Exam 1.
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 font-ui text-[12px] font-medium text-muted">
                <MessageCircle className="h-3.5 w-3.5 text-blue" />
                Grounded in this mark
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative mt-12">
        <ScrollHint />
      </div>
    </header>
  );
}
