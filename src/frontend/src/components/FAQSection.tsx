import { useState } from "react";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "A basic website is ready in 7–10 days. With 3D + advanced features, it takes 15–20 days.",
  },
  {
    q: "Do you provide website maintenance?",
    a: "Yes, we offer 3 months of free support after delivery, with affordable maintenance plans available after that.",
  },
  {
    q: "What is the pricing?",
    a: "Basic websites start from ₹15,000. With 3D + AI features, it goes up to ₹49,999. Contact us for an exact quote.",
  },
  {
    q: "Do you run Google Ads and Facebook Ads?",
    a: "Yes, we offer full-service digital marketing — Google Ads, Facebook/Instagram Ads, SEO, and Sales Funnels.",
  },
  {
    q: "Will the website be mobile-friendly?",
    a: "Absolutely. Every website we build is fully responsive and works perfectly on desktop, tablet, and mobile.",
  },
  {
    q: "How do I make payment?",
    a: "50% advance and 50% on delivery. UPI, bank transfer, and online payments are all accepted.",
  },
  {
    q: "Do I need to buy domain and hosting separately?",
    a: "No, we help you set up everything. Hosting cost is separate (annual charges apply).",
  },
  {
    q: "How many revisions do I get?",
    a: "Every package includes 3 free revisions. Additional revisions are available at nominal charges.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "5rem 1.5rem",
        background: "rgba(5,9,30,0.6)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 20,
              background: "rgba(138,70,255,0.1)",
              border: "1px solid rgba(138,70,255,0.3)",
              color: "#8A46FF",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            FAQ
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#EAF1FF",
              margin: 0,
            }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8A46FF, #FF4FD8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: isOpen
                    ? "1px solid rgba(0,229,255,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  backdropFilter: "blur(12px)",
                  overflow: "hidden",
                  transition: "border-color 0.3s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: isOpen ? "0 0 20px rgba(0,229,255,0.08)" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "1.2rem 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 16,
                    textAlign: "left",
                  }}
                  data-ocid={`faq.item.${i + 1}`}
                >
                  <span
                    style={{
                      color: isOpen ? "#00E5FF" : "#EAF1FF",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      transition: "color 0.3s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      color: isOpen ? "#00E5FF" : "#9AA8C7",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition:
                        "transform 0.3s cubic-bezier(0.4,0,0.2,1), color 0.3s",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div
                    style={{
                      padding: "0 1.5rem 1.25rem",
                      color: "#9AA8C7",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
