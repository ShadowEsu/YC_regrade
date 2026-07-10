import { Check, X } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const rows = [
  {
    label: "Reads your rubric and graded work together",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Flags specific lines where you may deserve more credit",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Shows projected new score and GPA impact",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Drafts a professor-safe email you can edit and send",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Built for after grades come back, not before you submit",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Parent Mode with conference prep sheets",
    chatgpt: false,
    regrade: true,
  },
  {
    label: "Free to try during beta",
    chatgpt: true,
    regrade: true,
  },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <Check className="mx-auto h-5 w-5 text-green" strokeWidth={2.5} aria-label="Yes" />
  ) : (
    <X className="mx-auto h-5 w-5 text-faint" strokeWidth={2} aria-label="No" />
  );
}

export function CompareSection() {
  return (
    <section className="section-cream py-[clamp(56px,8vw,88px)]">
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-[640px] text-center">
            <p className="mb-3 font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-blue">
              Why not just use ChatGPT?
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              ChatGPT gives general advice. Regrade checks your actual grade.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.65] text-muted">
              A chatbot does not know your rubric, your professor&apos;s comments, or which three
              points you lost on criterion 2. Regrade is built only for that job.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="card-pro mx-auto mt-10 max-w-[720px] overflow-hidden">
            <div className="grid grid-cols-[1fr_88px_88px] border-b border-black/[0.06] bg-black/[0.02] px-4 py-3 font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-faint sm:px-6">
              <span />
              <span className="text-center">ChatGPT</span>
              <span className="text-center text-blue">Regrade</span>
            </div>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_88px_88px] items-center gap-2 px-4 py-4 sm:px-6 ${
                  i < rows.length - 1 ? "border-b border-black/[0.06]" : ""
                }`}
              >
                <p className="text-[15px] leading-snug text-ink sm:text-[16px]">{row.label}</p>
                <Cell value={row.chatgpt} />
                <Cell value={row.regrade} />
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
