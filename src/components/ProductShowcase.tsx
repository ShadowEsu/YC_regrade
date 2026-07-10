import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cn } from "../lib/utils";

const gaps = [
  {
    id: "evidence",
    label: "Evidence & sources",
    text: "Full credit for enough sources. Fewer were cited than the rubric required — points you may recover.",
    detail: "Criterion 3 · Source count requirement",
  },
  {
    id: "structure",
    label: "Structure",
    text: "The same intro issue was deducted twice, under Structure and again under Clarity.",
    detail: "Criteria 5 + 6 · Duplicate penalty on one issue",
  },
  {
    id: "formatting",
    label: "Formatting",
    text: "Docked for style. The syllabus allows more than one accepted format.",
    detail: "Criterion 7 · Syllabus allows either format",
  },
];

const line = {
  hidden: { opacity: 0, x: -16 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(gaps[0].id);
  const selected = gaps.find((g) => g.id === active)!;

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const idx = gaps.findIndex((g) => g.id === prev);
        return gaps[(idx + 1) % gaps.length].id;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [reduced, inView]);

  return (
    <div ref={wrapRef} className="section-shell relative">
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel mx-auto max-w-[980px] overflow-hidden rounded-[24px] text-left"
        aria-label="Preview of a Regrade analysis"
      >
        <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-5 py-3.5">
          <div className="flex gap-1.5">
            <i className="block h-2 w-2 rounded-full bg-[#ff5f57]" />
            <i className="block h-2 w-2 rounded-full bg-[#febc2e]" />
            <i className="block h-2 w-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto max-w-[260px] flex-1 rounded-md border border-black/[0.08] bg-cream px-3 py-1.5 text-center font-ui text-[12px] font-semibold text-muted">
            app.regradeapp.tech
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px]">
          <div className="border-b border-black/[0.05] bg-white p-7 lg:border-b-0 lg:border-r lg:p-9">
            <motion.p
              custom={0}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-2 font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-blue"
            >
              Sample rubric scan
            </motion.p>
            <motion.div
              custom={1}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-5 flex items-baseline justify-between gap-3"
            >
              <span className="text-[19px] font-bold tracking-[-0.02em] text-ink">
                Essay 2 · Rhetorical Analysis
              </span>
            </motion.div>
            <motion.div
              custom={2}
              variants={line}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-5 rounded-lg border border-blue/20 bg-blue/[0.06] px-4 py-3 text-[14px] font-semibold text-blue-deep"
            >
              Rubric gaps flagged across 3 criteria
            </motion.div>
            <div className="flex flex-col gap-2.5">
              {gaps.map((g, i) => (
                <motion.button
                  key={g.id}
                  type="button"
                  custom={i + 3}
                  variants={line}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  onClick={() => setActive(g.id)}
                  className={cn(
                    "rounded-xl border px-5 py-3.5 text-left transition-colors duration-300",
                    active === g.id
                      ? "border-blue/25 bg-white shadow-[inset_3px_0_0_0_#1e4fff]"
                      : "border-black/[0.06] bg-white hover:border-blue/15 hover:bg-blue/[0.03]"
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[14px] font-bold text-ink">{g.label}</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-muted">{g.text}</p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3.5 border-t border-black/[0.05] bg-white p-6 lg:border-t-0 lg:p-7">
            <span className="font-ui text-[12px] font-bold uppercase tracking-[0.07em] text-blue">
              Case summary
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg border border-black/[0.06] bg-cream p-4"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-blue">
                  Selected gap
                </p>
                <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-ink">
                  {selected.detail}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center gap-3 rounded-lg border border-black/[0.06] bg-cream p-4">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                <TrendingUp className="h-4 w-4" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink">See your projected grade</div>
                <div className="text-[12px] font-medium text-muted">Updates instantly as gaps are found</div>
              </div>
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="btn-pro mt-auto rounded-xl py-3 text-[14px]"
            >
              Draft appeal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
