import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const testimonials = [
  {
    id: "rs",
    name: "Rahul Sharma",
    company: "TechVenture India",
    role: "Founder & CEO",
    initials: "RS",
    color: "#00E5FF",
    review:
      "Digi3D Labs transformed our online presence completely. Our website now gets 3x more leads, and the 3D design blows visitors away. ROI has been incredible!",
  },
  {
    id: "pm",
    name: "Priya Mehta",
    company: "StyleCraft Boutique",
    role: "Business Owner",
    initials: "PM",
    color: "#8A46FF",
    review:
      "The Google Ads campaign they ran for us brought ₹40 lakhs in sales in just 3 months. Their funnel design is pure genius. Highly recommend!",
  },
  {
    id: "ak",
    name: "Arjun Kapoor",
    company: "RealEstate360",
    role: "Marketing Head",
    initials: "AK",
    color: "#FF4FD8",
    review:
      "We've worked with 5 agencies before. None came close to Digi3D Labs. The 3D website they built for us is a conversion machine. Our cost per lead dropped by 60%.",
  },
  {
    id: "sr",
    name: "Sneha Reddy",
    company: "FitLife Wellness",
    role: "Co-Founder",
    initials: "SR",
    color: "#00BFFF",
    review:
      "From SEO to Facebook Ads to an insane 3D landing page — they did it all. Our app downloads went from 500 to 12,000 per month. Worth every rupee!",
  },
];

// CSS 3D orbiting dot component
function OrbitingDots({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: -20,
        pointerEvents: "none",
        perspective: 500,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            animation: `orbit3d-${i} ${3 + i * 0.8}s linear infinite`,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}60`,
              opacity: 0.8,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes orbit3d-0 {
          0%   { transform: rotateY(0deg)   translateX(200px) rotateY(0deg); }
          100% { transform: rotateY(360deg) translateX(200px) rotateY(-360deg); }
        }
        @keyframes orbit3d-1 {
          0%   { transform: rotateX(60deg) rotateY(0deg)   translateX(180px) rotateY(0deg); }
          100% { transform: rotateX(60deg) rotateY(360deg) translateX(180px) rotateY(-360deg); }
        }
        @keyframes orbit3d-2 {
          0%   { transform: rotateX(-40deg) rotateY(0deg)   translateX(220px) rotateY(0deg); }
          100% { transform: rotateX(-40deg) rotateY(360deg) translateX(220px) rotateY(-360deg); }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useScrollReveal();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      4000,
    );
  };

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: 9999,
              padding: "0.3rem 1rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#00E5FF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Client Stories
          </div>
          <h2 className="section-title">
            What Our <span className="neon-text-cyan">Clients Say</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <OrbitingDots color={t.color} />

          {/* Glowing ring */}
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: 28,
              border: `2px solid ${t.color}40`,
              boxShadow: `0 0 30px ${t.color}20, inset 0 0 30px ${t.color}05`,
              pointerEvents: "none",
              animation: "pulseBorder 2s ease-in-out infinite",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, rotateY: -90, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              style={{ perspective: 1000 }}
            >
              <div
                className="glass-card"
                style={{
                  padding: "3rem 2.5rem",
                  textAlign: "center",
                  boxShadow: `0 0 40px ${t.color}20, 0 0 0 1px ${t.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                  border: `1px solid ${t.color}30`,
                }}
              >
                <div
                  style={{
                    marginBottom: "1.5rem",
                    color: "#FFD700",
                    fontSize: "1.4rem",
                    filter: "drop-shadow(0 0 4px #FFD70060)",
                    letterSpacing: 4,
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.15rem)",
                    color: "#D0DCFF",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    maxWidth: 680,
                    margin: "0 auto 2rem",
                  }}
                >
                  &ldquo;{t.review}&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#050914",
                      boxShadow: `0 0 16px ${t.color}50`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#EAF1FF",
                        fontSize: "1rem",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        color: t.color,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                      }}
                    >
                      {t.role} &middot; {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: "2rem",
          }}
        >
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#00E5FF" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "none",
                transition: "all 0.35s ease",
                boxShadow:
                  i === active ? "0 0 10px rgba(0,229,255,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulseBorder {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
