import { SectionReveal } from "./SectionReveal";

const stars = [1, 2, 3, 4];

export function Testimonial() {
  return (
    <section className="relative overflow-hidden py-[clamp(64px,8vw,96px)]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(30,79,255,0.12)_0%,transparent_68%)]"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <div
            className="glass-panel surface-hover relative mx-auto max-w-[720px] overflow-hidden rounded-2xl p-8 sm:p-10"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(30,79,255,0.14)_0%,transparent_70%)]"
              aria-hidden
            />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                {stars.map((s) => (
                  <svg
                    key={s}
                    viewBox="0 0 16 16"
                    className="h-4 w-4 fill-blue text-blue"
                    aria-hidden
                  >
                    <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.48 4.48 12.34l.67-3.92L2.3 5.64l3.94-.57L8 1.5z" />
                  </svg>
                ))}
                <span className="ml-2 text-[13px] font-semibold text-muted">4 out of 5</span>
              </div>
              <span className="rounded-full border border-blue/12 bg-blue/[0.06] px-3 py-1 text-[12px] font-semibold text-blue-deep">
                Private beta
              </span>
            </div>

            <blockquote className="relative mt-7 font-display text-[clamp(1.2rem,2.4vw,1.5rem)] font-semibold leading-[1.55] tracking-[-0.02em] text-ink">
              <span className="absolute -left-1 -top-4 font-display text-5xl leading-none text-blue/15">
                “
              </span>
              Regrade helps me protect my GPA and AP scores when something does not line up with the
              the grading. It has become part of how I prepare for competitive admissions.
            </blockquote>

            <div className="mt-8 flex items-center gap-3.5 border-t border-black/[0.06] pt-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(9,9,11,0.2)]">
                GV
              </div>
              <div>
                <div className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
                  Giovanno Valyno
                </div>
                <div className="text-[13px] text-muted">Student · Early access</div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
