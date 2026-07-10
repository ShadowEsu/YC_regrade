import { SectionReveal } from "./SectionReveal";
import { WaitlistForm } from "./WaitlistForm";
import { REGRADE_CONFIG } from "../lib/site-config";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

export function CTASection() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-[120px] overflow-hidden bg-ink sm:scroll-mt-[132px]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(242,101,34,0.35)_0%,transparent_55%)]"
        aria-hidden
      />

      <div className="section-shell relative flex items-center py-[clamp(72px,10vw,112px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/15 px-4 py-1.5 font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-[#ffb08a]">
              Waitlist
            </p>
            <h2 className="font-display text-[clamp(2.35rem,5.2vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              Bring one marked exam.
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] font-ui text-[17px] leading-[1.6] text-white/65">
              First {REGRADE_CONFIG.waitlistDisplayMax} get Pro Max free for a year. Powered by
              OpenAI.
            </p>

            <div className="mx-auto mt-9 w-full max-w-[680px] rounded-[22px] border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-5">
              <WaitlistForm
                source="offer"
                submitLabel="Join waitlist"
                variant="dark"
                layout="inline"
                size="lg"
              />
            </div>

            <div className="mx-auto mt-10 flex max-w-[420px] justify-center gap-10 text-center">
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1 font-ui text-[13px] text-white/50">Joined</p>
              </div>
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-blue-muted">{spotsLeft}</p>
                <p className="mt-1 font-ui text-[13px] text-white/50">Spots left</p>
              </div>
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-white">$0</p>
                <p className="mt-1 font-ui text-[13px] text-white/50">Beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
