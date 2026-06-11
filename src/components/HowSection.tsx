import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Search, Send } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";

const steps = [
  {
    id: "upload",
    icon: Upload,
    title: "Upload your materials",
    body: "Add your graded work, the rubric or assignment sheet, and any instructor feedback. PDFs, docs, and screenshots all work.",
    preview: {
      label: "Incoming files",
      items: ["Essay_2_graded.pdf", "Rubric_ENGL1A.pdf", "Professor_comments.png"],
    },
  },
  {
    id: "analyze",
    icon: Search,
    title: "Review the analysis",
    body: "Regrade maps every deduction to a rubric line, flags mismatches, and ranks recoverable points by strength of evidence.",
    preview: {
      label: "Analysis output",
      items: ["3 rubric gaps detected", "+9 pts recoverable", "Evidence linked per line"],
    },
  },
  {
    id: "appeal",
    icon: Send,
    title: "Send your appeal",
    body: "Edit the draft email, send from your own inbox, and keep a record of every citation you used.",
    preview: {
      label: "Ready to send",
      items: ["Draft appeal generated", "Tone checked", "You control delivery"],
    },
  },
];

export function HowSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="how"
      className="section-cream scroll-mt-[120px] border-y border-black/[0.05] py-[clamp(80px,10vw,128px)] sm:scroll-mt-[132px]"
    >
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="How it works"
            title="From posted grade to polished appeal."
            description="No integrations and no school login. Upload, review, send — in three deliberate steps."
          />
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-14">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "glass flex flex-1 items-center gap-3.5 rounded-xl px-5 py-4 text-left transition-all duration-300",
                    active === i
                      ? "border-blue/20 bg-white/90"
                      : "surface-hover opacity-90 hover:opacity-100"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors",
                      active === i ? "bg-blue text-white" : "bg-black/[0.04] text-muted"
                    )}
                  >
                    <s.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-faint">
                      Step {i + 1}
                    </span>
                    <span className="block text-[16px] font-semibold tracking-[-0.02em] text-ink">
                      {s.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="relative mt-4 h-0.5 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue"
                animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel mt-7 grid gap-8 rounded-2xl p-8 sm:p-10 lg:grid-cols-[1fr_320px] lg:gap-12"
              >
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[17px] leading-[1.7] text-muted">{step.body}</p>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-6 backdrop-blur-sm">
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-faint">
                    {step.preview.label}
                  </p>
                  <ul className="space-y-2.5">
                    {step.preview.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        className="flex items-center gap-2.5 rounded-lg border border-black/[0.05] bg-white/80 px-4 py-3 text-[15px] font-medium text-ink"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
