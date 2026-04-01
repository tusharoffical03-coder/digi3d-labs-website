import { useCallback, useState } from "react";
import AIChatbot from "./components/AIChatbot";
import AboutSection from "./components/AboutSection";
import AmbientSound from "./components/AmbientSound";
import Background3D from "./components/Background3D";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import PortfolioSection from "./components/PortfolioSection";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Background3D />
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <PortfolioSection />
          <AboutSection />
          <PricingSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <AmbientSound />
      <AIChatbot />
    </>
  );
}
