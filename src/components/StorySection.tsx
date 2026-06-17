import { useState } from "react";
import { Play, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { REGRADE_CONFIG } from "../lib/site-config";
import { cn } from "../lib/utils";

type Tab = "how" | "features";

const howSteps = [
  "Upload graded work + rubric.",
  "Regrade checks each criterion.",
  "See points to recover, new score, optional email draft.",
];

const features = [
  "Rubric line-by-line scan",
  "GPA / grade preview",
  "Plain-English case summary",
  "Email draft you edit and send yourself",
  "Works in 16 grading systems",
  "Delete your files anytime",
];

const engines = [
  {
    name: "Gemini",
    body: "Google's model. Fast. Good default for most assignments.",
  },
  {
    name: "Claude",
    body: "Anthropic's model. Strong on long essays and dense rubrics.",
  },
  {
    name: "Hybrid",
    body: "Both run your upload. You get the sharper result.",
  },
];

const faqs = [
  {
    q: "ChatGPT vs Regrade?",
    a: "ChatGPT doesn't read your rubric file next to your graded work. Regrade does, line by line.",
  },
  {
    q: "What do I upload?",
    a: "Graded assignment, rubric, professor comments. PDF or screenshot.",
  },
  {
    q: "Cost?",
    a: "Free in beta. First 100 waitlist = Pro Max free for 1 year.",
  },
];

export function StorySection() {
  const [tab, setTab] = useState<Tab>("how");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { demoVideoUrl } = REGRADE_CONFIG;

  return (
    <section
      id="story"
      className="scroll-mt-[var(--site-header)] border-t border-black/[0.06] bg-cream py-14 sm:py-16"
    >
      <div className="section-shell mx-auto max-w-[640px]">
        {/* Video */}
        <div>
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            60-second demo
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-black/[0.08] bg-white">
            {demoVideoUrl ? (
              <div className="aspect-video">
                <iframe
                  src={demoVideoUrl}
                  title="Regrade demo"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center px-6 text-center">
                <div className="mb-2 grid h-11 w-11 place-items-center rounded-full bg-blue text-white">
                  <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
                </div>
                <p className="font-ui text-[14px] text-muted">Screen recording coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* How / Features switch */}
        <div className="mt-12">
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1">
            {(["how", "features"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 rounded-md py-2.5 font-ui text-[14px] font-semibold transition-colors",
                  tab === t ? "bg-blue text-white" : "text-muted hover:text-ink"
                )}
              >
                {t === "how" ? "How it works" : "Features"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 rounded-xl border border-black/[0.06] bg-white p-5"
            >
              {tab === "how" ? (
                <ol className="list-decimal space-y-2 pl-5 font-ui text-[15px] leading-relaxed text-muted">
                  {howSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : (
                <ul className="space-y-2 font-ui text-[15px] leading-relaxed text-muted">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-blue">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 font-ui text-[13px] text-faint">
                Nothing emails your professor unless you send it.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI engines */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            AI engines
          </h2>
          <p className="mt-2 font-ui text-[14px] text-muted">
            Pick one in the app. Change anytime in Profile → AI Engine.
          </p>
          <div className="mt-4 space-y-2">
            {engines.map((e) => (
              <div
                key={e.name}
                className="rounded-lg border border-black/[0.06] bg-white px-4 py-3"
              >
                <p className="font-ui text-[14px] font-semibold text-ink">{e.name}</p>
                <p className="mt-0.5 font-ui text-[14px] text-muted">{e.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 font-ui text-[13px] text-faint">
            Your uploads are not used to train models.
          </p>
        </div>

        {/* Founder proof + GPA impact folded in */}
        <div className="mt-12 border-t border-black/[0.06] pt-12">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            Tested on my own grades
          </h2>
          <p className="mt-3 font-ui text-[15px] leading-relaxed text-muted">
            Rubric line counted twice on my final. Fixed it manually in 4 hours. Regrade found the
            same issue in 8 minutes.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { a: "82", b: "91", l: "Essay" },
              { a: "3.4", b: "3.6", l: "GPA" },
              { a: "4h", b: "8m", l: "Time" },
            ].map((r) => (
              <div
                key={r.l}
                className="rounded-lg border border-black/[0.06] bg-white py-3 text-center"
              >
                <p className="font-display text-lg font-semibold">
                  {r.a} <span className="text-faint">→</span>{" "}
                  <span className="text-blue">{r.b}</span>
                </p>
                <p className="font-ui text-[12px] text-muted">{r.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 font-ui text-[13px] text-faint">Preston Susanto, founder</p>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-12 border-t border-black/[0.06] pt-12">
          <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">FAQ</h2>
          <div className="mt-3 divide-y divide-black/[0.06]">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left font-ui text-[14px] font-semibold text-ink"
                  >
                    {f.q}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-faint transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pb-3 font-ui text-[14px] leading-relaxed text-muted"
                      >
                        {f.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
