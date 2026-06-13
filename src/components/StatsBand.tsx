import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { REGRADE_CONFIG } from "../lib/site-config";
import { SectionReveal } from "./SectionReveal";

const staticStats = [
  { value: 16, suffix: "", label: "Regions supported", accent: "ink" as const },
  { value: 3, suffix: "", label: "Steps to recover points", accent: "ink" as const },
  { value: 0, prefix: "$", suffix: "", label: "Cost during beta", accent: "green" as const },
];

const spotsLeft =
  REGRADE_CONFIG.waitlistDisplayMax - REGRADE_CONFIG.waitlistDisplayCount;

function CountUp({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const accentClass = {
  blue: "text-blue",
  ink: "text-ink",
  green: "text-green",
};

export function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [
    { value: spotsLeft, suffix: "", label: "Pro Max spots left", prefix: "", accent: "blue" as const },
    ...staticStats,
  ];

  return (
    <section className="pb-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <div
            ref={ref}
            className="card-pro grid overflow-hidden sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-7 py-9 text-center ${i < stats.length - 1 ? "border-b border-black/[0.06] sm:border-b-0 sm:border-r" : ""}`}
              >
                <div
                  className={`font-display text-[clamp(1.85rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] ${accentClass[s.accent]}`}
                >
                  <CountUp
                    value={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix}
                    active={inView}
                  />
                </div>
                <div className="mt-2 text-[15px] font-medium text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
