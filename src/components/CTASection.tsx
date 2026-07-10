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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,79,255,0.42)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(30,79,255,0.22)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(157,181,255,0.14)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="section-shell relative flex items-center py-[clamp(76px,10vw,112px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="mb-5 font-ui text-[13px] font-semibold uppercase tracking-[0.14em] text-[#9db5ff]">
              Early access
            </p>
            <h2 className="font-display text-[clamp(2.35rem,5.5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              Bring one marked exam. Leave with a{" "}
              <span className="text-gradient-live">clearer next step</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] font-ui text-[clamp(17px,2.2vw,20px)] leading-[1.65] text-white/65">
              Join the waitlist for early access to Review, Appeal, Study, and Coach — powered by
              OpenAI&apos;s newest and fastest model. The first {REGRADE_CONFIG.waitlistDisplayMax}{" "}
              students receive Pro Max free for one year.
            </p>

            <div className="mx-auto mt-11 w-full max-w-[620px]">
              <WaitlistForm
                source="offer"
                submitLabel="Join waitlist"
                variant="dark"
                layout="inline"
                size="lg"
              />
            </div>

            <p className="mx-auto mt-6 max-w-[560px] font-ui text-[15px] text-white/50">
              Investors or partners?{" "}
              <a
                href={REGRADE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#9db5ff] underline decoration-[#9db5ff]/35 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50"
              >
                Book an interview on Calendly
              </a>
              .
            </p>

            <div className="mx-auto mt-12 grid max-w-[520px] grid-cols-3 gap-6 text-center sm:gap-10">
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/50">Joined</p>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-[#9db5ff]">
                  {spotsLeft}
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/50">Spots left</p>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-green">
                  $0
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/50">During beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
