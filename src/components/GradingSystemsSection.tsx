import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { SectionHeader } from "./SectionHeader";
import {
  filterGradingRegions,
  gradingRegions,
  type GradingRegion,
} from "../data/grading-regions";
import { cn } from "../lib/utils";

function RegionCard({ region, compact = false }: { region: GradingRegion; compact?: boolean }) {
  return (
    <article
      className={cn(
        "flex shrink-0 items-center gap-4 rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(30,79,255,0.06)]",
        compact ? "w-full p-4 sm:p-5" : "w-[min(88vw,340px)] p-5"
      )}
    >
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-blue/[0.06] text-[2rem] leading-none"
        role="img"
        aria-label={region.region}
      >
        {region.flag}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
          {region.region}
        </h3>
        <p className="mt-1 font-ui text-[13px] leading-snug text-muted">
          {region.systems.join(" · ")}
        </p>
        {compact && (
          <p className="mt-2 text-[14px] leading-snug text-muted/90">{region.description}</p>
        )}
      </div>
    </article>
  );
}

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const items = [...gradingRegions, ...gradingRegions];

  return (
    <div
      className={cn(
        "flex w-max gap-4 py-1",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
    >
      {items.map((region, i) => (
        <RegionCard key={`${region.code}-${i}`} region={region} />
      ))}
    </div>
  );
}

export function GradingSystemsSection() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterGradingRegions(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <section className="section-cream border-y border-black/[0.05] py-[clamp(80px,10vw,128px)]">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Global from day one"
            title="Built for every grading system."
            description="Rubric-first. Works globally. Does not convert between scales."
          />
        </SectionReveal>

        <SectionReveal delay={0.06}>
          <div className="relative mx-auto mt-10 max-w-[480px]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country or system (e.g. ATAR, GPA, IB)"
              aria-label="Search grading systems by country or system name"
              className="h-12 w-full rounded-xl border border-black/[0.08] bg-white pl-11 pr-4 font-ui text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-blue/35 focus:ring-2 focus:ring-blue/10"
            />
          </div>
        </SectionReveal>

        {searching ? (
          <SectionReveal delay={0.04}>
            <div className="mt-8">
              {results.length > 0 ? (
                <>
                  <p className="mb-4 text-center font-ui text-[13px] font-medium text-muted">
                    {results.length} match{results.length === 1 ? "" : "es"} for &ldquo;{query}
                    &rdquo;
                  </p>
                  <div className="mx-auto grid max-w-[720px] gap-3">
                    {results.map((region) => (
                      <RegionCard key={region.code} region={region} compact />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center font-ui text-[15px] text-muted">
                  No match for &ldquo;{query}&rdquo;. Try ATAR, GPA, IB, CBSE, or your country name.
                </p>
              )}
            </div>
          </SectionReveal>
        ) : (
          <SectionReveal delay={0.08}>
            <div className="mt-10 space-y-4">
              <p className="text-center font-ui text-[13px] font-medium text-faint">
                Scrolls automatically · hover to pause · search above to find yours
              </p>
              <div className="marquee-pause mask-fade-x overflow-hidden">
                <MarqueeTrack />
              </div>
              <div className="marquee-pause mask-fade-x overflow-hidden">
                <MarqueeTrack reverse />
              </div>
            </div>
          </SectionReveal>
        )}

        <SectionReveal delay={0.1}>
          <p className="mt-10 text-center font-ui text-[13px] leading-relaxed text-faint">
            Regrade reads your rubric directly. It is not a grade converter.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
