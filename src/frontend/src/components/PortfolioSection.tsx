import { motion } from "motion/react";
import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    id: "neo",
    title: "NeoCommerce Pro",
    category: "E-Commerce + 3D Product Views",
    desc: "A futuristic e-commerce platform with immersive 3D product visualization and AI-powered recommendations.",
    gradient:
      "linear-gradient(135deg, #050914 0%, #1a0540 40%, #00BFFF20 100%)",
    accentColor: "#00E5FF",
    tags: ["React", "3D", "AI"],
    stats: { leads: "3x", revenue: "\u20b92.5Cr", conversion: "18%" },
  },
  {
    id: "growth",
    title: "GrowthForce Ads",
    category: "Google Ads Dashboard",
    desc: "Real-time performance dashboard for a \u20b910Cr+ monthly ad spend client with AI optimization.",
    gradient:
      "linear-gradient(135deg, #050914 0%, #200830 40%, #8A46FF30 100%)",
    accentColor: "#8A46FF",
    tags: ["Analytics", "Google Ads", "Dashboard"],
    stats: { leads: "5x", revenue: "\u20b910Cr", conversion: "24%" },
  },
  {
    id: "mega",
    title: "MegaFunnel System",
    category: "Sales Funnel + CRM",
    desc: "End-to-end funnel system with 42% conversion rate, generating \u20b91Cr+ monthly revenue.",
    gradient:
      "linear-gradient(135deg, #050914 0%, #1a0818 40%, #FF4FD830 100%)",
    accentColor: "#FF4FD8",
    tags: ["Funnel", "CRM", "Automation"],
    stats: { leads: "42%", revenue: "\u20b91Cr", conversion: "42%" },
  },
];

const BROWSER_DOTS = ["#FF5F57", "#FEBC2E", "#28C840"];

function ProjectCard({
  project,
  index,
}: { project: (typeof projects)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
        height: 380,
        transition:
          "transform 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLElement).style.filter =
          `drop-shadow(0 0 20px ${project.accentColor}60)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.filter = "none";
      }}
    >
      <div
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 20,
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${project.accentColor}30`,
            background: "rgba(5,9,20,0.8)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              height: 220,
              background: project.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "85%",
                height: "80%",
                background: "rgba(10,14,26,0.8)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 22,
                  background: "rgba(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  gap: 5,
                }}
              >
                {BROWSER_DOTS.map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    height: 8,
                    width: "60%",
                    background: `${project.accentColor}40`,
                    borderRadius: 4,
                  }}
                />
                <div
                  style={{
                    height: 5,
                    width: "90%",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                  }}
                />
                <div
                  style={{
                    height: 5,
                    width: "75%",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                  }}
                />
                <div
                  style={{
                    height: 40,
                    width: "100%",
                    background: `${project.accentColor}15`,
                    borderRadius: 6,
                    marginTop: 4,
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ padding: "1.25rem 1.5rem" }}>
            <div
              style={{
                fontSize: "0.7rem",
                color: project.accentColor,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 6,
              }}
            >
              {project.category}
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#EAF1FF",
                marginBottom: 8,
              }}
            >
              {project.title}
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.2rem 0.6rem",
                    background: `${project.accentColor}15`,
                    border: `1px solid ${project.accentColor}30`,
                    borderRadius: 9999,
                    fontSize: "0.7rem",
                    color: project.accentColor,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 20,
            background: `linear-gradient(135deg, rgba(5,9,20,0.95) 0%, ${project.accentColor}20 100%)`,
            border: `2px solid ${project.accentColor}50`,
            boxShadow: `0 0 40px ${project.accentColor}30`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: project.accentColor,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {project.category}
          </div>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "#EAF1FF",
              textAlign: "center",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "0.82rem",
              color: "#9AA8C7",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {project.desc}
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {Object.entries(project.stats).map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color: project.accentColor,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#9AA8C7",
                    textTransform: "capitalize",
                  }}
                >
                  {k}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}AA)`,
              color: "#050914",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "0.625rem 1.5rem",
              borderRadius: 9999,
              border: "none",
              cursor: "none",
              boxShadow: `0 0 20px ${project.accentColor}60`,
              transition:
                "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = `0 0 30px ${project.accentColor}90`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 0 20px ${project.accentColor}60`;
            }}
          >
            Get This Built →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const ref = useScrollReveal();
  return (
    <section
      id="portfolio"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem", background: "rgba(5,9,20,0.5)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              background: "rgba(138,70,255,0.08)",
              border: "1px solid rgba(138,70,255,0.2)",
              borderRadius: 9999,
              padding: "0.3rem 1rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#8A46FF",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Our Work
          </div>
          <h2 className="section-title">
            Featured <span className="neon-text-purple">Portfolio</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            Real projects delivering real results for businesses across India.
          </p>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
