import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, ClipboardCheck, GraduationCap, MessageCircle, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { cn } from "../lib/utils";

const modes = [
  { id: "appeal", label: "Appeal", title: "Evidence before escalation.", description: "Turn a confusing deduction into a clear, respectful question grounded in the assignment.", labelText: "Potential issue", question: "Could you help me ask about the evidence deduction?", answer: "The rubric awards four points for evidence. Your paper includes two cited sources, but the comment does not say why the full deduction was applied. Ask for clarification before requesting a regrade.", icon: ClipboardCheck },
  { id: "understand", label: "Understand", title: "See the grade, not just the number.", description: "Read visible marks, rubric rows, and feedback together — with uncertainty called out honestly.", labelText: "Question review", question: "Why did I lose points on question 4?", answer: "Your main idea is clear. The marker’s note points to the explanation after the second quote, not the quote itself. That is a useful skill to practise before the final.", icon: MessageCircle },
  { id: "clarify", label: "Clarify", title: "Ask the right question first.", description: "When the evidence is incomplete, Regrade helps you request the detail you need without assuming an error.", labelText: "Clarification", question: "What should I ask my teacher about this mark?", answer: "Ask how the deduction maps to the evidence criterion and whether the missing explanation is the only reason for the score. Keep the question specific to this item.", icon: CheckCircle2 },
  { id: "finals", label: "Finals Prep", title: "Turn past marks into your next study plan.", description: "Use recurring patterns across marked exams to decide what deserves attention before finals.", labelText: "Pattern found", question: "What should I practise before the final?", answer: "Focus on linking evidence back to your claim. This pattern appears in two marked exams, so begin with a short explanation drill and check it off when it feels solid.", icon: GraduationCap },
] as const;

type ModeId = typeof modes[number]["id"];

export function ProductShowcase() {
  const [mode, setMode] = useState<ModeId>("appeal");
  const [message, setMessage] = useState<string>(modes[0].question);
  const [sent, setSent] = useState<string>(modes[0].question);
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const selected = modes.find((item) => item.id === mode)!;

  useEffect(() => {
    setMessage(selected.question);
    setSent(selected.question);
    setLoading(true);
    setTyped("");
    const start = window.setTimeout(() => {
      let index = 0;
      const timer = window.setInterval(() => {
        index += 2;
        setTyped(selected.answer.slice(0, index));
        if (index >= selected.answer.length) {
          window.clearInterval(timer);
          setLoading(false);
        }
      }, 16);
    }, 680);
    return () => window.clearTimeout(start);
  }, [selected]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value) return;
    setSent(value);
    setLoading(true);
    setTyped("");
    window.setTimeout(() => {
      let index = 0;
      const timer = window.setInterval(() => {
        index += 2;
        setTyped(selected.answer.slice(0, index));
        if (index >= selected.answer.length) {
          window.clearInterval(timer);
          setLoading(false);
        }
      }, 16);
    }, 680);
  }

  return (
    <section id="product" className="scroll-mt-[120px] bg-paper py-[clamp(72px,9vw,116px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader eyebrow="One product, four modes" title={<>Appeals are the reason to download. <span className="text-blue">Understanding is what makes them stronger.</span></>} description="Every mode starts with the same marked work. The next step changes with the evidence — not with four separate assistants." />
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_18px_55px_rgba(9,9,11,0.08)]">
            <div className="flex gap-1 overflow-x-auto border-b border-black/[0.08] bg-[#fbfcff] px-3 py-3 sm:px-5">
              {modes.map((item) => (
                <button key={item.id} type="button" onClick={() => setMode(item.id)} className={cn("shrink-0 rounded-lg px-4 py-2 font-ui text-[13px] font-semibold transition-colors", mode === item.id ? "bg-blue text-white" : "text-muted hover:bg-blue/[0.06] hover:text-ink")}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-[.88fr_1.12fr]">
              <div className="border-b border-black/[0.08] bg-[#fafbfe] p-7 lg:border-b-0 lg:border-r lg:p-9">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/[0.09] text-blue"><selected.icon className="h-5 w-5" /></div>
                <p className="mt-7 font-ui text-[12px] font-bold uppercase tracking-[0.1em] text-blue">{selected.labelText}</p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">{selected.title}</h3>
                <p className="mt-4 max-w-[430px] text-[17px] leading-relaxed text-muted">{selected.description}</p>
                <div className="mt-8 rounded-xl border border-black/[0.08] bg-white p-4"><p className="font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-muted">Evidence in view</p><p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink">Rubric: “Explain how evidence supports the claim.”</p><p className="mt-1 text-[14px] leading-relaxed text-muted">Teacher note: “Explain the link after quote two.”</p></div>
              </div>
              <div className="flex min-h-[450px] flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between"><span className="font-ui text-[12px] font-bold uppercase tracking-[0.09em] text-muted">Mr. Whale · beside the work</span><span className="rounded-full bg-green/[0.1] px-3 py-1 font-ui text-[11px] font-bold text-green">Evidence-linked</span></div>
                <div className="mt-7 flex flex-1 flex-col gap-5">
                  <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[15px] leading-relaxed text-white">{sent}</div></div>
                  <div className="flex items-end gap-2.5"><span className="grid h-9 w-9 shrink-0 place-items-center text-[26px] animate-whale" role="img" aria-label="Mr Whale">🐋</span><div className="max-w-[84%] rounded-2xl rounded-bl-md border border-black/[0.09] bg-white px-4 py-3 text-[15px] leading-relaxed text-ink shadow-sm">{loading ? <span className="inline-flex gap-1 px-1 py-1" aria-label="Mr Whale is typing"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></span> : typed}</div></div>
                </div>
                <form onSubmit={submit} className="mt-6 flex gap-2 border-t border-black/[0.07] pt-5"><input value={message} onChange={(event) => setMessage(event.target.value)} aria-label="Ask Mr Whale about the mark" className="min-w-0 flex-1 rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-[14px] text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15" /><button type="submit" className="btn-pro grid h-11 w-11 shrink-0 place-items-center rounded-xl" aria-label="Send message"><Send className="h-4 w-4" /></button></form>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
