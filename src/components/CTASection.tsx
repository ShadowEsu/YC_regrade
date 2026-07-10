import { SectionReveal } from "./SectionReveal";
import { WaitlistForm } from "./WaitlistForm";
import { REGRADE_CONFIG } from "../lib/site-config";

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

export function CTASection() {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-[120px] overflow-hidden bg-[linear-gradient(165deg,#050b1f_0%,#0b1a4a_40%,#1236c9_100%)] sm:scroll-mt-[132px]"
    >
      <div className="section-shell relative flex items-center py-[clamp(80px,11vw,128px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[740px] text-center">
            <p className="mb-4 font-ui text-[13px] font-bold uppercase tracking-[0.14em] text-[#9db5ff]">
              Waitlist · private beta
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              <span className="text-gradient-live">Bring one marked exam.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] rounded-[18px] border border-white/20 bg-white/10 px-5 py-4 font-display text-[clamp(1.2rem,2.5vw,1.55rem)] font-semibold leading-[1.3] text-white">
              First {REGRADE_CONFIG.waitlistDisplayMax} users get{" "}
              <span className="text-[#9db5ff]">Pro free for 1 year.</span>
            </p>
            <p className="mx-auto mt-4 max-w-[480px] font-ui text-[17px] leading-[1.6] text-white/70">
              Powered by OpenAI. Join the waitlist and we will email your invite.
            </p>

            <div className="mx-auto mt-9 w-full max-w-[680px] rounded-[22px] border border-white/20 bg-white p-4 sm:p-5">
              <WaitlistForm
                source="offer"
                submitLabel="Join waitlist"
                variant="light"
                layout="inline"
                size="lg"
              />
            </div>

            <div className="mx-auto mt-10 flex max-w-[460px] justify-center gap-10 text-center">
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1 font-ui text-[13px] text-white/55">Joined</p>
              </div>
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-[#9db5ff]">{spotsLeft}</p>
                <p className="mt-1 font-ui text-[13px] text-white/55">Pro spots left</p>
              </div>
              <div>
                <p className="font-display text-[1.75rem] font-semibold text-white">$0</p>
                <p className="mt-1 font-ui text-[13px] text-white/55">During beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
