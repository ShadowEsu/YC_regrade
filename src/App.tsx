import { useState } from "react";
import { useVisitorTracking } from "./hooks/useVisitorTracking";
import { SmoothScroll } from "./components/SmoothScroll";
import { Preloader } from "./components/Preloader";
import { YCBanner } from "./components/YCBanner";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ScrollNarrative } from "./components/ScrollNarrative";
import { ProductShowcase } from "./components/ProductShowcase";
import { LMSMarquee } from "./components/LMSMarquee";
import { Testimonial } from "./components/Testimonial";
import { SocialProofBar } from "./components/SocialProofBar";
import { ProblemSection } from "./components/ProblemSection";
import { WhySection } from "./components/WhySection";
import { HowSection } from "./components/HowSection";
import { StatsBand } from "./components/StatsBand";
import { FounderQuote } from "./components/FounderQuote";
import { CTASection } from "./components/CTASection";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";

export default function App() {
  const [ready, setReady] = useState(false);
  useVisitorTracking();

  return (
    <>
      <div className="grain" aria-hidden />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <YCBanner />
      <SmoothScroll>
        <Nav ready={ready} />
        <main
          className={ready ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Hero ready={ready} />
          <ScrollNarrative />
          <section className="section-paper pb-[clamp(56px,7vw,88px)] pt-2">
            <ProductShowcase />
          </section>
          <div id="social-proof">
            <SocialProofBar />
          </div>
          <LMSMarquee />
          <Testimonial />
          <ProblemSection />
          <WhySection />
          <HowSection />
          <StatsBand />
          <FounderQuote />
          <CTASection />
          <FAQ />
        </main>
        <Footer />
        <StickyCTA />
      </SmoothScroll>
    </>
  );
}
