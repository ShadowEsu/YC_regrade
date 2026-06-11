export function YCBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] border-b border-[#e6e2da] bg-gradient-to-r from-[#f5f7ff] via-[#fdfcf7] to-[#f5f7ff] backdrop-blur-md">
      <div className="section-shell flex h-11 items-center justify-center gap-2.5 sm:h-12 sm:gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#f26522] font-display text-[12px] font-bold text-white sm:h-8 sm:w-8 sm:text-[13px]"
          aria-hidden
        >
          Y
        </span>
        <p className="font-display text-center text-[13px] font-medium leading-snug tracking-[-0.02em] text-[#444651] sm:text-[15px]">
          Applying to{" "}
          <span className="font-semibold text-[#00236f]">Y Combinator</span>
          <span className="mx-2 text-[#a1a1aa] sm:mx-2.5">·</span>
          <span className="font-semibold text-ink">Winter 2026 Batch</span>
        </p>
      </div>
    </div>
  );
}
