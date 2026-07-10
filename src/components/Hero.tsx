import { motion } from "framer-motion";
import { Check, FileText, MessageCircle, Sparkles } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ ready }: { ready: boolean }) {
  return (
    <header id="top" className="relative overflow-hidden border-b border-black/[0.07] bg-paper pt-[calc(var(--site-header)+2.5rem)]">
      <div className="section-shell grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
            Evidence-led grade support
          </p>
          <h1 className="mt-5 max-w-[650px] font-display text-[clamp(3.1rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            Understand your grade. Learn from it. <span className="text-blue">Make the strongest appeal.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[18px] leading-[1.65] text-muted sm:text-[20px]">
            Upload marked work, a rubric, or teacher feedback. Regrade helps you see what happened,
            ask the right question, and turn past mistakes into a better finals plan.
          </p>
          <div className="mt-8 max-w-[620px]">
            <WaitlistForm source="hero" submitLabel="Join the waitlist" variant="light" layout="inline" accent="blue" size="lg" />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-ui text-[13px] font-medium text-muted">
            {[
              "Evidence before escalation",
              "You review every draft",
              "Private beta for Supervisor",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green" strokeWidth={2.5} />{item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="relative"
          aria-label="Preview of Regrade Review Studio"
        >
          <div className="overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_24px_70px_rgba(9,9,11,0.12)]">
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3.5 font-ui text-[12px] font-semibold text-muted">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green" />Review Studio</span>
              <span>Essay 2 · marked work</span>
            </div>
            <div className="grid gap-0 md:grid-cols-[1.12fr_.88fr]">
              <div className="border-b border-black/[0.07] p-6 md:border-b-0 md:border-r md:p-8">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-blue"><FileText className="h-4 w-4" />Visible evidence</div>
                <h2 className="mt-3 text-[19px] font-bold tracking-[-0.025em] text-ink">Question 4 · Evidence and analysis</h2>
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-green/20 bg-green/[0.06] p-4"><p className="text-[12px] font-bold uppercase tracking-[0.08em] text-green">Visible strength</p><p className="mt-1 text-[14px] leading-relaxed text-ink">Your claim is specific and supported by two sources.</p></div>
                  <div className="rounded-xl border border-blue/20 bg-blue/[0.06] p-4"><p className="text-[12px] font-bold uppercase tracking-[0.08em] text-blue">Practise next</p><p className="mt-1 text-[14px] leading-relaxed text-ink">Explain how the second quote supports your claim.</p></div>
                  <div className="rounded-xl border border-[#bd7b00]/20 bg-[#fff8e6] p-4"><p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#a86800]">Clarify</p><p className="mt-1 text-[14px] leading-relaxed text-ink">The rubric lists 4 points for evidence; the written deduction is unclear.</p></div>
                </div>
              </div>
              <div className="bg-[#f8faff] p-6 md:p-7">
                <p className="font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-muted">Ask Mr. Whale</p>
                <div className="mt-5 flex justify-end"><div className="max-w-[210px] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[14px] leading-relaxed text-white">What should I practise before the final?</div></div>
                <div className="mt-5 flex items-end gap-2.5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-transparent text-[25px] animate-whale" aria-label="Mr Whale">🐋</span><div className="rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-3 text-[14px] leading-relaxed text-ink shadow-sm">Practice connecting each quote back to your claim. Start with this question, then review the same pattern in Exam 1.</div></div>
                <div className="mt-4 flex items-center gap-2 font-ui text-[12px] font-medium text-muted"><MessageCircle className="h-3.5 w-3.5 text-blue" />Grounded in this mark and rubric</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-blue/15 bg-white px-4 py-2 font-ui text-[12px] font-semibold text-blue shadow-lg sm:flex"><Sparkles className="h-3.5 w-3.5" />One marked exam. A clearer next step.</div>
        </motion.div>
      </div>
    </header>
  );
}
