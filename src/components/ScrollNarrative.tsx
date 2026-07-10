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

export function ScrollNarrative() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const subsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current || !pinRef.current) {
      wordsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1, scale: 1, filter: "blur(0px)" }));
      subsRef.current.forEach((el) => el && gsap.set(el, { opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      beats.forEach((_, i) => {
        const word = wordsRef.current[i];
        const sub = subsRef.current[i];
        if (!word || !sub) return;

        const enter = i * 0.22;
        const hold = enter + 0.12;

        tl.fromTo(
          word,
          { opacity: 0, scale: 0.94, filter: "blur(4px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.18, ease: "power3.out" },
          enter
        );
        tl.fromTo(
          sub,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          enter + 0.04
        );

        if (i < beats.length - 1) {
          tl.to(word, { opacity: 0, scale: 1.02, filter: "blur(4px)", duration: 0.14, ease: "power2.in" }, hold);
          tl.to(sub, { opacity: 0, y: -8, duration: 0.1 }, hold);
        }
      });

      if (progressRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          scrub: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="section-cream border-y border-black/[0.05] py-20">
        <div className="section-shell text-center">
          {beats.map((b) => (
            <div key={b.line} className="mb-10 last:mb-0">
              <h2 className="text-gradient-live font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {b.line}
              </h2>
              <p className="mt-3 text-[16px] text-muted">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="narrative" className="relative bg-cream">
      <div ref={pinRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(30,79,255,0.05)_0%,transparent_70%)]"
          aria-hidden
        />

        <div className="relative z-10 h-[min(38vh,280px)] w-full max-w-[800px] text-center">
          {beats.map((b, i) => (
            <div
              key={b.line}
              className="absolute inset-0 flex flex-col items-center justify-center"
              aria-hidden={i > 0}
            >
              <h2
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className="narrative-word text-gradient-live font-display text-[clamp(2rem,5.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.025em]"
                style={{ opacity: i === 0 ? undefined : 0 }}
              >
                {b.line}
              </h2>
              <p
                ref={(el) => {
                  subsRef.current[i] = el;
                }}
                className="narrative-word mt-4 max-w-[440px] text-[16px] leading-[1.6] text-muted"
                style={{ opacity: i === 0 ? undefined : 0 }}
              >
                {b.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute left-0 right-0 top-0 z-10">
          <div className="h-1 w-full overflow-hidden bg-black/[0.06]">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-gradient-to-r from-blue via-blue-muted to-blue"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
