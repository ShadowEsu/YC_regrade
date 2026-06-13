import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const beats = [
  { line: "The grade drops.", sub: "You see the number. Points might still be yours." },
  { line: "Free points hide in the rubric.", sub: "Credit you earned but did not get." },
  { line: "Regrade finds them.", sub: "Every line scanned. Every recoverable point flagged." },
  { line: "Your GPA can move.", sub: "Get back what you earned. You stay in control." },
];

/** Extra scroll segment so the final beat holds before unpinning */
const HOLD_SEGMENTS = 1;
const TOTAL_SEGMENTS = beats.length + HOLD_SEGMENTS;

export function ScrollNarrative() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const subsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) return;

    const words = wordsRef.current.filter(Boolean) as HTMLDivElement[];
    const subs = subsRef.current.filter(Boolean) as HTMLParagraphElement[];
    const n = beats.length;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 32 });
      gsap.set(subs, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * TOTAL_SEGMENTS}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      const segment = 1 / TOTAL_SEGMENTS;

      beats.forEach((_, i) => {
        const enter = i * segment;
        const fadeIn = segment * 0.18;
        const fadeOut = segment * 0.16;
        const isLast = i === n - 1;

        tl.to(
          words[i],
          { opacity: 1, y: 0, duration: fadeIn, ease: "power3.out" },
          enter
        );
        tl.to(
          subs[i],
          { opacity: 1, y: 0, duration: fadeIn * 0.85, ease: "power3.out" },
          enter + segment * 0.04
        );

        if (!isLast) {
          tl.to(
            [words[i], subs[i]],
            { opacity: 0, y: -24, duration: fadeOut, ease: "power2.in" },
            enter + segment - fadeOut
          );
        }
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    refresh();

    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="section-dark py-24">
        <div className="section-shell space-y-10 text-center">
          {beats.map((b) => (
            <div key={b.line}>
              <p className="font-display text-3xl font-semibold text-white">{b.line}</p>
              <p className="mt-2 text-white/55">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${TOTAL_SEGMENTS * 100}vh` }}
    >
      <div
        ref={pinRef}
        className="section-dark flex h-screen items-center justify-center overflow-hidden px-6"
      >
        <div className="relative mx-auto h-[min(44vh,400px)] w-full max-w-[800px]">
          {beats.map((b, i) => (
            <div
              key={b.line}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white"
              >
                {b.line}
              </div>
              <p
                ref={(el) => {
                  subsRef.current[i] = el;
                }}
                className="mt-5 max-w-[480px] text-[17px] leading-[1.6] text-white/50"
              >
                {b.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
