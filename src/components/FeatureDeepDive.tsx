import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";

type Gap = {
  id: string;
  criterion: string;
  issue: string;
  pts: string;
  rubric: string;
  submission: string;
  score: string;
};

const gaps: Gap[] = [
  {
    id: "c3",
    criterion: "C3 · Evidence & sources",
    issue: "Rubric mismatch",
    pts: "+5 pts",
    rubric: "10 pts for 3+ credible, peer-reviewed sources.",
    submission: "Four peer-reviewed sources cited in paragraphs 2–4.",
    score: "Awarded 5/10 — half credit without stated reason.",
  },
  {
    id: "c5",
    criterion: "C5 · Structure",
    issue: "Duplicate deduction",
    pts: "+2 pts",
    rubric: "Structure and Clarity are separate criteria.",
    submission: "Same intro concern penalized under both categories.",
    score: "Double-deducted for a single issue.",
  },
  {
    id: "c7",
    criterion: "C7 · Formatting",
    issue: "Syllabus conflict",
    pts: "+2 pts",
    rubric: "Syllabus §4 accepts MLA or APA formatting.",
    submission: "Essay formatted in MLA throughout.",
    score: "Docked for MLA despite syllabus allowance.",
  },
];

const tabs = [
  { id: "audit", label: "Line-by-line audit" },
  { id: "evidence", label: "Evidence mapping" },
  { id: "appeal", label: "Appeal draft" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function RubricAuditPanel({
  activeGap,
  onSelect,
}: {
  activeGap: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-2">
        <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
          Flagged deductions
        </p>
        {gaps.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g.id)}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-250",
              activeGap === g.id
                ? "border-blue/25 bg-blue/[0.05]"
                : "surface-hover border-black/[0.06] bg-white/60"
            )}
          >
            <div>
              <p className="text-[13px] font-semibold text-ink">{g.criterion}</p>
              <p className="mt-0.5 text-[12px] text-muted">{g.issue}</p>
            </div>
            <span className="shrink-0 rounded-full bg-green/10 px-2.5 py-1 text-[12px] font-semibold text-green">
              {g.pts}
            </span>
          </button>
        ))}
      </div>

      <GapDetail gap={gaps.find((g) => g.id === activeGap)!} />
    </div>
  );
}

function GapDetail({ gap }: { gap: Gap }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gap.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28 }}
        className="rounded-xl border border-white/70 bg-white/55 p-5 backdrop-blur-sm"
      >
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-blue">Detail</p>
        <div className="mt-4 space-y-3">
          {[
            { label: "Rubric", value: gap.rubric },
            { label: "Your work", value: gap.submission },
            { label: "What happened", value: gap.score },
          ].map((row) => (
            <div key={row.label} className="rounded-lg border border-black/[0.05] bg-white/80 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-faint">
                {row.label}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink">{row.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function EvidencePanel({ activeGap }: { activeGap: string }) {
  const gap = gaps.find((g) => g.id === activeGap)!;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        { label: "Rubric line", value: gap.rubric, accent: "text-blue" },
        { label: "Submission", value: gap.submission, accent: "text-ink" },
        { label: "Grading outcome", value: gap.score, accent: "text-rose-500" },
      ].map((col, i) => (
        <motion.div
          key={col.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="glass flex h-full flex-col rounded-xl p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-faint">
            {col.label}
          </p>
          <p className={cn("mt-3 flex-1 text-[14px] leading-[1.65] font-semibold", col.accent)}>
            {col.value}
          </p>
          <div className="mt-4 h-px bg-black/[0.06]" />
          <p className="mt-3 text-[12px] font-semibold text-green">{gap.pts} recoverable</p>
        </motion.div>
      ))}
    </div>
  );
}

function AppealPanel({ activeGap }: { activeGap: string }) {
  const gap = gaps.find((g) => g.id === activeGap)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-white/70 bg-white/55 p-6 backdrop-blur-sm"
    >
      <p className="text-[12px] font-medium text-faint">Subject: ENGL 1A — Essay 2 regrade request</p>
      <div className="mt-4 space-y-4 text-[14px] leading-[1.75] text-muted">
        <p>Dear Professor Chen,</p>
        <p>
          I am writing to respectfully request a review of my Essay 2 grade. Regarding{" "}
          <span className="font-semibold text-ink">{gap.criterion}</span>, the rubric states that{" "}
          <span className="font-semibold text-blue">{gap.rubric.toLowerCase()}</span>
        </p>
        <p>
          In my submission, <span className="font-semibold text-ink">{gap.submission}</span> I believe
          this supports a revision of the current score.
        </p>
        <p>Thank you for your time and consideration.</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
        <span className="text-[12px] text-faint">Draft only — you send from your inbox</span>
        <span className="rounded-full bg-green/10 px-3 py-1 text-[12px] font-semibold text-green">
          {gap.pts}
        </span>
      </div>
    </motion.div>
  );
}

export function FeatureDeepDive() {
  const [tab, setTab] = useState<TabId>("audit");
  const [activeGap, setActiveGap] = useState(gaps[0].id);

  return (
    <section className="section-paper py-[clamp(72px,9vw,112px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Product"
            title={
              <>
                Built for the moment
                <br />
                <span className="text-muted">after the grade posts.</span>
              </>
            }
            description="Click through a real case — rubric lines, evidence, and the appeal draft connected in one workflow."
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-12">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] transition-all duration-250",
                    tab === t.id
                      ? "bg-ink text-white shadow-[0_4px_16px_rgba(9,9,11,0.15)]"
                      : "glass text-muted hover:text-ink"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="glass-panel mt-5 rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {tab === "audit" && (
                    <>
                      <p className="mb-5 max-w-[520px] text-[15px] leading-[1.65] text-muted">
                        Every deduction is mapped to the criterion it claims to enforce. Select a
                        flagged line to inspect the mismatch.
                      </p>
                      <RubricAuditPanel activeGap={activeGap} onSelect={setActiveGap} />
                    </>
                  )}
                  {tab === "evidence" && (
                    <>
                      <p className="mb-5 max-w-[520px] text-[15px] leading-[1.65] text-muted">
                        Evidence only — each claim links rubric, submission, and outcome side by side.
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {gaps.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setActiveGap(g.id)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
                              activeGap === g.id
                                ? "bg-blue text-white"
                                : "bg-black/[0.04] text-muted hover:text-ink"
                            )}
                          >
                            {g.criterion.split("·")[0].trim()}
                          </button>
                        ))}
                      </div>
                      <EvidencePanel activeGap={activeGap} />
                    </>
                  )}
                  {tab === "appeal" && (
                    <>
                      <p className="mb-5 max-w-[520px] text-[15px] leading-[1.65] text-muted">
                        A respectful draft citing the rubric — edited by you, sent from your inbox.
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {gaps.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setActiveGap(g.id)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors",
                              activeGap === g.id
                                ? "bg-blue text-white"
                                : "bg-black/[0.04] text-muted hover:text-ink"
                            )}
                          >
                            {g.criterion.split("·")[0].trim()}
                          </button>
                        ))}
                      </div>
                      <AppealPanel activeGap={activeGap} />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
