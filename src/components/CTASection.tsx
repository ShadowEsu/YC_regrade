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
      <div className="section-shell relative flex items-center py-[clamp(72px,10vw,112px)]">
        <SectionReveal className="w-full">
          <div className="mx-auto max-w-[700px] text-center">
            <p className="mb-3 font-ui text-[12px] font-bold uppercase tracking-[0.14em] text-[#9db5ff]">
              Waitlist · private beta
            </p>
            <h2 className="font-display text-[clamp(2.1rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              <span className="text-gradient-live">Bring One Marked Exam.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] font-ui text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
              First {REGRADE_CONFIG.waitlistDisplayMax} users get Pro free for 1 year. Powered by
              OpenAI.
            </p>

            <div className="mx-auto mt-8 w-full max-w-[640px]">
              <WaitlistForm
                source="offer"
                submitLabel="Get early access"
                variant="dark"
                layout="inline"
                size="lg"
              />
            </div>

            <p className="mx-auto mt-5 max-w-[480px] font-ui text-[13px] leading-relaxed text-white/55">
              Questions?{" "}
              <a
                href="mailto:preston@regrade.org"
                className="text-[#9db5ff] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                preston@regrade.org
              </a>
              {" · "}
              Updates and CS jobs on{" "}
              <a
                href={REGRADE_CONFIG.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9db5ff] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                LinkedIn
              </a>
            </p>

            <div className="mx-auto mt-9 flex max-w-[420px] justify-center gap-8 text-center">
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-white">
                  {REGRADE_CONFIG.waitlistDisplayCount}
                </p>
                <p className="mt-1 font-ui text-[12px] text-white/55">Joined</p>
              </div>
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-[#9db5ff]">{spotsLeft}</p>
                <p className="mt-1 font-ui text-[12px] text-white/55">Pro spots left</p>
              </div>
              <div>
                <p className="font-display text-[1.5rem] font-semibold text-white">$0</p>
                <p className="mt-1 font-ui text-[12px] text-white/55">During beta</p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
