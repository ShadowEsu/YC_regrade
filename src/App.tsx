import { useState } from "react";
import { useVisitorTracking } from "./hooks/useVisitorTracking";
import { SmoothScroll } from "./components/SmoothScroll";
import { Preloader } from "./components/Preloader";
import { YCBanner } from "./components/YCBanner";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { FeaturesSection } from "./components/FeaturesSection";
import { ScrollNarrative } from "./components/ScrollNarrative";
import { ProductShowcase } from "./components/ProductShowcase";
import { SocialProofBar } from "./components/SocialProofBar";
import { LMSMarquee } from "./components/LMSMarquee";
import { VideoSection } from "./components/VideoSection";
import { ProblemSection } from "./components/ProblemSection";
import { GradingSystemsSection } from "./components/GradingSystemsSection";
import { HowSection } from "./components/HowSection";
import { AIEnginesSection } from "./components/AIEnginesSection";
import { CompareSection } from "./components/CompareSection";
import { StatsBand } from "./components/StatsBand";
import { FounderQuote } from "./components/FounderQuote";
import { FounderProofSection } from "./components/FounderProofSection";
import { CTASection } from "./components/CTASection";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCTA } from "./components/StickyCTA";
import { SeoSchema } from "./components/SeoSchema";
import { AuthoritySection } from "./components/AuthoritySection";

export default function App() {
  const [ready, setReady] = useState(false);
  useVisitorTracking();

  return (
    <>
      <SeoSchema />
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
          <HowSection />
          <FeaturesSection />
          <ScrollNarrative />
          <section className="section-paper pb-[clamp(56px,7vw,88px)] pt-2">
            <ProductShowcase />
          </section>
          <VideoSection />
          <div id="social-proof">
            <SocialProofBar />
          </div>
          <LMSMarquee />
          <ProblemSection />
          <GradingSystemsSection />
          <AIEnginesSection />
          <CompareSection />
          <FounderProofSection />
          <StatsBand />
          <FounderQuote />
          <CTASection />
          <AuthoritySection />
          <FAQ />
        </main>
        <Footer />
        <StickyCTA />
      </SmoothScroll>
    </>
  );
}
