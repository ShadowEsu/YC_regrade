const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Features", href: "/#why" },
      { label: "Join waitlist", href: "/#waitlist" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "regradeteam@gmail.com", href: "mailto:regradeteam@gmail.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy.html" },
      { label: "Terms of service", href: "/terms.html" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com/regrade_app", external: true },
      { label: "X", href: "https://x.com/regrade_app", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#00236f] via-[#1a4fd6] to-[#1e4fff] text-white">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(157,181,255,0.2)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="section-shell relative py-16 sm:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <div className="max-w-[360px]">
            <a href="/#top" className="inline-block">
              <img
                src="/regrade-wordmark.png"
                alt="Regrade"
                className="h-11 w-auto brightness-0 invert sm:h-12"
                width={180}
                height={48}
              />
            </a>
            <p className="mt-6 font-display text-[clamp(17px,2vw,19px)] font-medium leading-[1.6] tracking-[-0.01em] text-white/85">
              Re-check your grade against the rubric — we email only when your invite is ready.
            </p>
          </div>

          <div className="grid w-full max-w-[720px] grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-white/55">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-ui text-[16px] leading-snug text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[14px] text-white/60">
            © {new Date().getFullYear()} Preston Jay Susanto. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f26522] font-display text-[11px] font-bold text-white">
              Y
            </span>
            <span className="font-display text-[14px] font-medium tracking-[-0.01em] text-white/90">
              Applying to Y Combinator · Winter 2026 Batch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
