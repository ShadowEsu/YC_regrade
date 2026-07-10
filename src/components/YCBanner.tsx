import { REGRADE_CONFIG } from "../lib/site-config";

export function YCBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] border-b border-[#f26522]/20 bg-[#fff3ec]">
      <div className="section-shell flex h-11 items-center justify-center gap-2.5 sm:h-12 sm:gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#f26522] font-display text-[12px] font-bold text-white sm:h-8 sm:w-8 sm:text-[13px]"
          aria-hidden
        >
          Y
        </span>
        <p className="font-ui text-center text-[13px] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[15px]">
          Applying to{" "}
          <span className="font-semibold text-[#f26522]">Y Combinator</span>
          <span className="mx-2 text-faint sm:mx-2.5">·</span>
          <span className="font-semibold">Winter 2026</span>
          <span className="mx-2 hidden text-faint sm:mx-2.5 sm:inline">·</span>
          <a
            href={REGRADE_CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-semibold text-[#f26522] underline decoration-[#f26522]/35 underline-offset-2 transition-colors hover:decoration-[#f26522] sm:inline"
          >
            Book an interview
          </a>
        </p>
      </div>
    </div>
  );
}
