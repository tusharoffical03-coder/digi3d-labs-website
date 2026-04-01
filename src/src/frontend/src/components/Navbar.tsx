import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1rem 1.5rem",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.5rem",
            ...(scrolled
              ? {
                  background: "rgba(10, 14, 26, 0.80)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 16,
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                }
              : {}),
          }}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "none",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "linear-gradient(135deg, #00E5FF, #8A46FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                color: "#050914",
                boxShadow: "0 0 16px rgba(0,229,255,0.4)",
              }}
            >
              D
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #EAF1FF, #00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.01em",
              }}
            >
              Digi3D Labs
            </span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32 }} className="hidden md:flex">
            {navLinks.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9AA8C7",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "none",
                  transition: "color 0.2s ease",
                  padding: "0.25rem 0",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#00E5FF";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#9AA8C7";
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="btn-neon-cyan hidden md:block"
            style={{ fontSize: "0.875rem" }}
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#EAF1FF",
              padding: "0.5rem",
              cursor: "none",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#EAF1FF",
                borderRadius: 1,
                transition: "all 0.3s",
                transform: open ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#EAF1FF",
                borderRadius: 1,
                transition: "all 0.3s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#EAF1FF",
                borderRadius: 1,
                transition: "all 0.3s",
                transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div
          role="button"
          tabIndex={0}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(5,9,20,0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(false);
          }}
        />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 280,
          background: "rgba(10,14,26,0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.10)",
          zIndex: 1001,
          padding: "5rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {navLinks.map((l) => (
          <button
            key={l.label}
            type="button"
            onClick={() => scrollTo(l.href)}
            style={{
              background: "none",
              border: "none",
              color: "#EAF1FF",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.75rem 0",
              textAlign: "left",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {l.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          className="btn-neon-cyan"
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          Get Started
        </button>
      </div>
    </>
  );
}
