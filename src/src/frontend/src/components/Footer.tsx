const socials = ["📸", "💼", "📧", "🌐"];
const serviceLinks = [
  "Website Design (3D+AI)",
  "Google Ads",
  "Facebook Ads",
  "Funnel Design",
  "SEO Optimization",
];
const companyLinks = [
  { label: "About Us", id: "#about" },
  { label: "Portfolio", id: "#portfolio" },
  { label: "Pricing", id: "#pricing" },
  { label: "Testimonials", id: "#testimonials" },
  { label: "Contact", id: "#contact" },
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      style={{
        padding: "60px 1.5rem 30px",
        background: "rgba(5,9,20,0.9)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1rem",
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
                  color: "#EAF1FF",
                }}
              >
                Digi3D Labs
              </span>
            </div>
            <p
              style={{
                color: "#9AA8C7",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              Building future-ready 3D digital experiences that convert visitors
              into loyal clients.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: "1.25rem" }}>
              {socials.map((icon) => (
                <div
                  key={icon}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    cursor: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0,229,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,229,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.10)";
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#EAF1FF",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Services
            </div>
            {serviceLinks.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => scrollTo("#services")}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: "#9AA8C7",
                  fontSize: "0.82rem",
                  marginBottom: 8,
                  cursor: "none",
                  transition: "color 0.2s",
                  textAlign: "left",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00E5FF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#9AA8C7";
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#EAF1FF",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Company
            </div>
            {companyLinks.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => scrollTo(l.id)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: "#9AA8C7",
                  fontSize: "0.82rem",
                  marginBottom: 8,
                  cursor: "none",
                  transition: "color 0.2s",
                  textAlign: "left",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00E5FF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#9AA8C7";
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div>
            <div
              style={{
                fontWeight: 700,
                color: "#EAF1FF",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              Start Your Project
            </div>
            <p
              style={{
                color: "#9AA8C7",
                fontSize: "0.82rem",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              Ready to grow? Let's build something extraordinary together.
            </p>
            <button
              type="button"
              className="btn-neon-cyan"
              style={{ fontSize: "0.85rem" }}
              onClick={() => scrollTo("#contact")}
            >
              Get Free Consultation
            </button>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ color: "#9AA8C7", fontSize: "0.8rem" }}>
            &copy; {new Date().getFullYear()} Digi3D Labs. All rights reserved.
          </div>
          <div style={{ color: "#9AA8C7", fontSize: "0.8rem" }}>
            Crafted with <span style={{ color: "#FF4FD8" }}>♥</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
