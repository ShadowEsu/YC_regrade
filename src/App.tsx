import { useState } from "react";
import { useVisitorTracking } from "./hooks/useVisitorTracking";
import { SmoothScroll } from "./components/SmoothScroll";
import { Preloader } from "./components/Preloader";
import { YCBanner } from "./components/YCBanner";
import { Nav } from "./components/Nav";
import { LaunchVideo } from "./components/LaunchVideo";
import { Hero } from "./components/Hero";
import { HowSection } from "./components/HowSection";
import { ProductShowcase } from "./components/ProductShowcase";
import { TrustSupervisorSection } from "./components/TrustSupervisorSection";
import { FounderProofSection } from "./components/FounderProofSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { SeoSchema } from "./components/SeoSchema";

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
          <LaunchVideo ready={ready} />
          <Hero ready={ready} />
          <HowSection />
          <ProductShowcase />
          <TrustSupervisorSection />
          <FounderProofSection />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
