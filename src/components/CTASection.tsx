import { SectionReveal } from "./SectionReveal";
import { WaitlistForm } from "./WaitlistForm";
import { REGRADE_CONFIG } from "../lib/site-config";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

export function CTASection() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-[120px] overflow-hidden bg-[linear-gradient(160deg,#1236c9_0%,#1e4fff_40%,#4d8cff_100%)] sm:scroll-mt-[132px]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.22)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,transparent_68%)]"
        aria-hidden
      />

      <div className="section-shell relative flex items-center py-[clamp(84px,11vw,128px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-white" />
              </span>
              Waitlist · Early access
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5.8vw,4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              Bring one marked exam. Leave with a clearer next step.
            </h2>
            <p className="mx-auto mt-6 max-w-[600px] font-ui text-[clamp(17px,2.2vw,20px)] leading-[1.65] text-white/80">
              Join the waitlist for Review, Appeal, Study, and Coach — powered by OpenAI&apos;s newest
              and fastest model. The first {REGRADE_CONFIG.waitlistDisplayMax} students receive Pro Max
              free for one year.
            </p>

            <div className="mx-auto mt-10 w-full max-w-[720px] rounded-[24px] border border-white/30 bg-white/15 p-4 shadow-[0_28px_70px_-20px_rgba(9,9,11,0.45)] backdrop-blur-xl sm:p-5">
              <WaitlistForm
                source="offer"
                submitLabel="Join waitlist"
                variant="dark"
                layout="inline"
                size="lg"
              />
            </div>

            <p className="mx-auto mt-6 max-w-[560px] font-ui text-[15px] text-white/65">
              Investors or partners?{" "}
              <a
                href={REGRADE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
              >
                Book an interview on Calendly
              </a>
              .
            </p>

            <div className="mx-auto mt-12 grid max-w-[560px] grid-cols-3 gap-6 text-center sm:gap-10">
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/65">Joined</p>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-white">
                  {spotsLeft}
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/65">Spots left</p>
              </div>
              <div>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold tabular-nums text-white">
                  $0
                </p>
                <p className="mt-1.5 font-ui text-[14px] font-medium text-white/65">During beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
