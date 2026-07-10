import { motion } from "framer-motion";
import { Check, FileText, MessageCircle, Sparkles } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import { scrollToId } from "../lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

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
    <header
      id="top"
      className="relative overflow-hidden border-b border-black/[0.07] bg-paper pt-[calc(var(--site-header)+2.5rem)]"
    >
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue/[0.07] blur-3xl animate-blob-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#9db5ff]/20 blur-3xl animate-blob"
        aria-hidden
      />

      <div className="section-shell relative grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <motion.div
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
            className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue"
          >
            Evidence-first student support
          </motion.p>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            className="mt-5 max-w-[680px] font-display text-[clamp(2.85rem,5.8vw,5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink"
            data-speakable="hero-subhead"
          >
            Know what happened on your grade.{" "}
            <span className="text-blue">Know what to do next.</span>
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="mt-6 max-w-[560px] text-[18px] leading-[1.65] text-muted sm:text-[19px]"
          >
            Upload a marked exam, PDF, or screenshot. Regrade organizes the visible score, rubric,
            and teacher feedback. Mr Whale helps you understand the result, practise the weak spots,
            and prepare a clear appeal when the evidence supports one.
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
            className="mt-3 max-w-[520px] font-ui text-[13px] font-medium text-faint"
          >
            Powered by OpenAI&apos;s newest and fastest model · grounded in your marked work
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
            className="mt-8 max-w-[620px]"
          >
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
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
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
              <span key={item} className="inline-flex items-center gap-1.5 font-ui text-[13px] font-medium text-muted">
                <Check className="h-3.5 w-3.5 text-green" strokeWidth={2.5} />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          className="relative"
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
                      transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease }}
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
                  transition={{ delay: 0.55, duration: 0.45, ease }}
                  className="mt-5 flex justify-end"
                >
                  <div className="max-w-[210px] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[14px] leading-relaxed text-white">
                    What should I practise before the final?
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75, duration: 0.5, ease }}
                  className="mt-5 flex items-end gap-2.5"
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-transparent text-[25px] animate-whale"
                    aria-label="Mr Whale"
                  >
                    🐋
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
            transition={{ delay: 0.95, duration: 0.5, ease }}
            className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-blue/15 bg-white px-4 py-2 font-ui text-[12px] font-semibold text-blue shadow-lg sm:flex animate-breathe-slow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Bring one marked exam. Leave with a clearer next step.
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
