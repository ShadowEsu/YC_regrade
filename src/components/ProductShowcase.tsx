import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, ClipboardCheck, GraduationCap, MessageCircle, Send } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SectionReveal } from "./SectionReveal";
import { RegradeLogo } from "./RegradeLogo";
import { cn } from "../lib/utils";

const modes = [
  {
    id: "review",
    label: "Review",
    title: "See the grade, not just the number.",
    description: "Marks, rubric rows, and feedback — with uncertainty called out.",
    labelText: "Question review",
    question: "Why did I lose points on question 4?",
    answer:
      "Your claim is clear. The note is about the explanation after quote two — practise that before the final.",
    icon: MessageCircle,
    image: "/icons/how-scan.png",
  },
  {
    id: "appeal",
    label: "Appeal",
    title: "Ask with the right evidence.",
    description: "A respectful draft when a real discrepancy exists. You send it.",
    labelText: "Potential issue",
    question: "Help me ask about the evidence deduction.",
    answer:
      "The rubric awards four points for evidence. Ask how the deduction maps to that criterion before requesting a regrade.",
    icon: ClipboardCheck,
    image: "/icons/how-match.png",
  },
  {
    id: "study",
    label: "Study",
    title: "Turn marks into a study plan.",
    description: "Recurring patterns from marked exams become your finals checklist.",
    labelText: "Finals Prep",
    question: "What should I practise before the final?",
    answer:
      "Link evidence to your claim. It shows up across two exams — drill that first.",
    icon: GraduationCap,
    image: "/icons/how-checklist.png",
  },
  {
    id: "coach",
    label: "Coach",
    title: "Mr Whale beside the work.",
    description: "Plain-language help on the selected mark. No invented guarantees.",
    labelText: "Ask Mr Whale",
    question: "Explain this mark simply.",
    answer:
      "You got credit for a clear claim. The deduction is the link after quote two. Practise restating that link.",
    icon: CheckCircle2,
    image: "/logo-mark.png",
  },
] as const;

const studyItems = [
  {
    title: "Link evidence to claim",
    detail: "Teacher note on Q4 · appears in 2 exams",
    done: false,
  },
  {
    title: "Explain after the quote",
    detail: "Rubric row · Evidence and analysis",
    done: false,
  },
  {
    title: "Check source count against rubric",
    detail: "Visible strength in Exam 1 · keep it",
    done: true,
  },
];

type ModeId = (typeof modes)[number]["id"];

export function ProductShowcase() {
  const [mode, setMode] = useState<ModeId>("review");
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
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      let index = 0;
      timer = window.setInterval(() => {
        index += 2;
        setTyped(selected.answer.slice(0, index));
        if (index >= selected.answer.length) {
          if (timer) window.clearInterval(timer);
          setLoading(false);
        }
      }, 16);
    }, 680);
    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
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
          <SectionHeader
            centered
            eyebrow="What you get"
            title={
              <>
                Four modes.{" "}
                <span className="text-gradient-live">One marked exam.</span>
              </>
            }
          />
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-black/[0.1] bg-white shadow-[0_18px_55px_rgba(9,9,11,0.08)]">
            <div className="flex gap-1 overflow-x-auto border-b border-black/[0.08] bg-cream px-3 py-3 sm:px-5">
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={cn(
                    "shrink-0 rounded-lg px-4 py-2 font-ui text-[13px] font-semibold transition-all duration-300",
                    mode === item.id
                      ? "bg-blue text-white shadow-[0_8px_20px_rgba(242,101,34,0.28)]"
                      : "text-muted hover:bg-blue/[0.08] hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-[.88fr_1.12fr]">
              <div className="border-b border-black/[0.08] bg-[#fcfaf7] p-7 lg:border-b-0 lg:border-r lg:p-9">
                <img
                  src={selected.image}
                  alt=""
                  aria-hidden
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-[16px] object-contain shadow-[0_10px_24px_-10px_rgba(9,9,11,0.35)]"
                />
                <p className="mt-7 font-ui text-[12px] font-bold uppercase tracking-[0.1em] text-blue">
                  {selected.labelText}
                </p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                  {selected.title}
                </h3>
                <p className="mt-4 max-w-[430px] text-[17px] leading-relaxed text-muted">
                  {selected.description}
                </p>
                <div className="mt-8 rounded-xl border border-black/[0.08] bg-white p-4">
                  <p className="font-ui text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
                    Evidence in view
                  </p>
                  <p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink">
                    Rubric: “Explain how evidence supports the claim.”
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">
                    Teacher note: “Explain the link after quote two.”
                  </p>
                </div>
              </div>

              {mode === "study" ? (
                <div className="flex min-h-[450px] flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[12px] font-bold uppercase tracking-[0.09em] text-muted">
                      Study checklist · from marked exams
                    </span>
                    <span className="rounded-full bg-blue/[0.1] px-3 py-1 font-ui text-[11px] font-bold text-blue">
                      2 exams
                    </span>
                  </div>
                  <ul className="mt-7 flex flex-1 flex-col gap-3">
                    {studyItems.map((item) => (
                      <li
                        key={item.title}
                        className={cn(
                          "rounded-xl border px-4 py-3.5 transition-colors",
                          item.done
                            ? "border-green/20 bg-green/[0.05]"
                            : "border-black/[0.08] bg-white"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                              item.done
                                ? "border-green bg-green text-white"
                                : "border-black/15 bg-white"
                            )}
                          >
                            {item.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                          </span>
                          <div>
                            <p
                              className={cn(
                                "text-[15px] font-semibold text-ink",
                                item.done && "line-through opacity-70"
                              )}
                            >
                              {item.title}
                            </p>
                            <p className="mt-1 text-[13px] text-muted">{item.detail}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-ui text-[13px] leading-relaxed text-muted">
                    Uses exams only. Check-offs stay on your profile with links back to the original
                    feedback.
                  </p>
                </div>
              ) : (
                <div className="flex min-h-[450px] flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[12px] font-bold uppercase tracking-[0.09em] text-muted">
                      Mr Whale · beside the work
                    </span>
                    <span className="rounded-full bg-green/[0.1] px-3 py-1 font-ui text-[11px] font-bold text-green">
                      Evidence-linked
                    </span>
                  </div>
                  <div className="mt-7 flex flex-1 flex-col gap-5">
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue px-4 py-3 text-[15px] leading-relaxed text-white">
                        {sent}
                      </div>
                    </div>
                    <div className="flex items-end gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center animate-whale">
                        <RegradeLogo variant="whale" size={34} />
                      </span>
                      <div className="max-w-[84%] rounded-2xl rounded-bl-md border border-black/[0.09] bg-white px-4 py-3 text-[15px] leading-relaxed text-ink shadow-sm">
                        {loading ? (
                          <span
                            className="inline-flex gap-1 px-1 py-1"
                            aria-label="Mr Whale is typing"
                          >
                            <i className="typing-dot" />
                            <i className="typing-dot" />
                            <i className="typing-dot" />
                          </span>
                        ) : (
                          typed
                        )}
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={submit}
                    className="mt-6 flex gap-2 border-t border-black/[0.07] pt-5"
                  >
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      aria-label="Ask Mr Whale about the mark"
                      className="min-w-0 flex-1 rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-[14px] text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/15"
                    />
                    <button
                      type="submit"
                      className="btn-pro grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
