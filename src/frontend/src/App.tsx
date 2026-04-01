import { useCallback, useEffect, useState } from "react";
import AIChatbot from "./components/AIChatbot";
import AboutSection from "./components/AboutSection";
import AmbientSound from "./components/AmbientSound";
import Background3D from "./components/Background3D";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import PortfolioSection from "./components/PortfolioSection";
import PricingSection from "./components/PricingSection";
import ServicesSection from "./components/ServicesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
          <StatsSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <AmbientSound />
      <AIChatbot />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919991965178?text=Hi%20Digi3D%20Labs%2C%20I%20want%20to%20discuss%20my%20project"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 9998,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 0 rgba(37,211,102,0.5)",
          animation: "waPulse 2s infinite",
          textDecoration: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1.1)";
          el.style.boxShadow = "0 0 20px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 0 0 0 rgba(37,211,102,0.5)";
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="white"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <style>{`
          @keyframes waPulse {
            0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
            70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
            100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
          }
        `}</style>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        data-ocid="backtop.button"
        title="Back to top"
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: 90,
          right: 24,
          zIndex: 9998,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(0,229,255,0.12)",
          border: "1px solid rgba(0,229,255,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? "auto" : "none",
          transition:
            "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s",
          transform: showBackTop ? "translateY(0)" : "translateY(10px)",
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(0,229,255,0.22)";
          el.style.boxShadow = "0 0 16px rgba(0,229,255,0.4)";
          el.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(0,229,255,0.12)";
          el.style.boxShadow = "none";
          el.style.transform = showBackTop
            ? "translateY(0)"
            : "translateY(10px)";
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Arrow up"
        >
          <title>Arrow up</title>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
