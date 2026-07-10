import { motion } from "framer-motion";
import { Check, FileText, MessageCircle, Sparkles } from "lucide-react";
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
    label: "Visible strength",
    body: "Your claim is specific and supported by two sources.",
  },
  {
    tone: "blue" as const,
    label: "Practise this skill",
    body: "Explain how the second quote supports your claim.",
  },
  {
    tone: "amber" as const,
    label: "Clarify the mark",
    body: "The rubric lists 4 points for evidence; the written deduction is unclear.",
  },
];

const toneClass = {
  green: "border-green/20 bg-green/[0.06] text-green",
  blue: "border-blue/20 bg-blue/[0.06] text-blue",
  amber: "border-[#bd7b00]/20 bg-[#fff8e6] text-[#a86800]",
};

export function Hero({ ready }: { ready: boolean }) {
  return (
    <header className="relative overflow-hidden border-b border-black/[0.07] bg-[linear-gradient(120deg,#eef2ff_0%,#dce7ff_25%,#f3efff_50%,#dfeaff_75%,#eef2ff_100%)] bg-animated-gradient px-6 pb-16 pt-12 text-center">
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
          className="mt-8 font-display text-[clamp(2.75rem,6.4vw,5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink"
          data-speakable="hero-subhead"
        >
          Know what happened on your grade.
          <br />
          <span className="text-gradient-live">Know what to do next.</span>
        </motion.h1>

        <motion.p
          variants={block}
          className="mx-auto mt-6 max-w-[620px] font-display text-[clamp(17px,2.1vw,20px)] font-medium leading-[1.65] tracking-[-0.02em] text-muted"
        >
          Upload a marked exam, PDF, or screenshot. Regrade organizes the visible score, rubric, and
          teacher feedback. Mr Whale helps you understand the result, practise the weak spots, and
          prepare a clear appeal when the evidence supports one.
        </motion.p>

        <motion.p
          variants={block}
          className="mx-auto mt-3 max-w-[520px] font-ui text-[13px] font-medium text-faint"
        >
          Powered by OpenAI&apos;s newest and fastest model · grounded in your marked work
        </motion.p>

        <motion.div variants={block} className="mx-auto mt-9 w-full max-w-[780px]">
          <div className="rounded-[22px] border-2 border-blue/25 bg-white/80 p-3 shadow-[0_20px_50px_-18px_rgba(77,140,255,0.45)] backdrop-blur-md sm:p-4">
            <WaitlistForm
              source="hero"
              submitLabel="Join the waitlist"
              variant="light"
              layout="inline"
              accent="blue"
              size="lg"
            />
          </div>
        </motion.div>

        <motion.div
          variants={block}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#how");
            }}
            className="group font-ui text-[14px] font-semibold text-blue transition-colors hover:text-blue-deep"
          >
            See how it works{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          {[
            "Evidence before escalation",
            "You review every draft",
            "Clear evidence. Honest uncertainty.",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 font-ui text-[13px] font-medium text-muted"
            >
              <Check className="h-3.5 w-3.5 text-green" strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.85, delay: 0.28, ease }}
        className="relative mx-auto mt-16 w-full max-w-[980px] text-left"
        aria-label="Preview of Regrade Review Studio"
      >
        <div className="overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_28px_80px_rgba(9,9,11,0.12)]">
          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3.5 font-ui text-[12px] font-semibold text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-green" />
              </span>
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
                Question 4 · Evidence and analysis
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
            <div className="bg-[#f8faff] p-6 md:p-7">
              <p className="font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                Ask Mr Whale
              </p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.45, ease }}
                className="mt-5 flex justify-end"
              >
                <div className="max-w-[210px] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[14px] leading-relaxed text-white">
                  What should I practise before the final?
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5, ease }}
                className="mt-5 flex items-end gap-2.5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center animate-whale">
                  <RegradeLogo variant="whale" size={34} />
                </span>
                <div className="rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-3 text-[14px] leading-relaxed text-ink shadow-sm">
                  Practice connecting each quote back to your claim. Start with this question, then
                  review the same pattern in Exam 1.
                </div>
              </motion.div>
              <div className="mt-4 flex items-center gap-2 font-ui text-[12px] font-medium text-muted">
                <MessageCircle className="h-3.5 w-3.5 text-blue" />
                Grounded in this mark and rubric
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.5, ease }}
          className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-blue/15 bg-white px-4 py-2 font-ui text-[12px] font-semibold text-blue shadow-lg sm:flex animate-breathe-slow"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Bring one marked exam. Leave with a clearer next step.
        </motion.div>
      </motion.div>

      <div className="relative mt-14">
        <ScrollHint />
      </div>
    </header>
  );
}
