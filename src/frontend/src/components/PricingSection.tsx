import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { memo, useRef, useState } from "react";
import type * as THREE from "three";
import { useScrollReveal } from "../hooks/useScrollReveal";

const plans = [
  {
    name: "Basic",
    price: "₹15,000",
    tagline: "Perfect to get started",
    color: "#00BFFF",
    features: [
      "5-Page Website Design",
      "Mobile Responsive",
      "3D Hero Section",
      "Basic SEO Setup",
      "Contact Form",
      "1 Month Support",
    ],
    popular: false,
    icon: "tetrahedron",
  },
  {
    name: "Standard",
    price: "₹35,000",
    tagline: "For growing businesses",
    color: "#00E5FF",
    features: [
      "10-Page 3D Website",
      "Google + Facebook Ads",
      "Sales Funnel Design",
      "Advanced SEO",
      "WhatsApp Integration",
      "Analytics Dashboard",
      "3 Months Support",
    ],
    popular: false,
    icon: "double-torus",
  },
  {
    name: "Premium",
    price: "₹75,000",
    tagline: "Full-scale growth system",
    color: "#8A46FF",
    features: [
      "Unlimited Pages + 3D",
      "Complete Ad Management",
      "Multi-step Funnels",
      "Full SEO Domination",
      "CRM Integration",
      "AI Chatbot",
      "Priority 24/7 Support",
      "Monthly Performance Reports",
    ],
    popular: true,
    icon: "dodecahedron",
  },
];

function TetrahedronScene({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.8;
      ref.current.rotation.y += d * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[1.3, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function DoubleTorusScene({ color }: { color: string }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (r1.current) r1.current.rotation.y += d * 1.2;
    if (r2.current) r2.current.rotation.x += d * 0.9;
  });
  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[0.9, 0.18, 6, 14]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.1, 4, 14]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function DodecahedronScene({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const orb1 = useRef<THREE.Group>(null);
  const orb2 = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.008;
    }
    if (orb1.current) orb1.current.rotation.y = clock.elapsedTime * 1.5;
    if (orb2.current) orb2.current.rotation.z = clock.elapsedTime * 1.0;
  });
  return (
    <group>
      <mesh ref={ref}>
        <dodecahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <group ref={orb1}>
        <mesh position={[1.6, 0, 0]}>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      <group ref={orb2} rotation={[Math.PI / 3, 0, 0]}>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

const PlanIcon = memo(function PlanIcon({
  icon,
  color,
}: { icon: string; color: string }) {
  return (
    <div style={{ width: 120, height: 100, margin: "0 auto 1rem" }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1]}
        frameloop="always"
      >
        {icon === "tetrahedron" && <TetrahedronScene color={color} />}
        {icon === "double-torus" && <DoubleTorusScene color={color} />}
        {icon === "dodecahedron" && <DodecahedronScene color={color} />}
      </Canvas>
    </div>
  );
});

function PricingCard({
  plan,
  index,
}: { plan: (typeof plans)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={plan.popular ? "holographic-shimmer pulse-glow-purple" : ""}
        style={{
          background: plan.popular
            ? "linear-gradient(160deg, rgba(138,70,255,0.15) 0%, rgba(0,229,255,0.08) 50%, rgba(255,79,216,0.10) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: plan.popular
            ? "2px solid rgba(138,70,255,0.6)"
            : "1px solid rgba(255,255,255,0.10)",
          borderRadius: 24,
          padding: plan.popular ? "2.5rem 2rem" : "2rem 1.75rem",
          position: "relative",
          transform: hovered
            ? "translateY(-10px)"
            : plan.popular
              ? "translateY(-8px) scale(1.03)"
              : "translateY(0)",
          transition:
            "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: plan.popular
            ? hovered
              ? "0 0 50px rgba(138,70,255,0.5), 0 0 100px rgba(138,70,255,0.2), 0 20px 50px rgba(0,0,0,0.5)"
              : "0 0 35px rgba(138,70,255,0.35), 0 0 70px rgba(138,70,255,0.15), 0 10px 40px rgba(0,0,0,0.5)"
            : hovered
              ? "0 0 30px rgba(0,229,255,0.2), 0 20px 40px rgba(0,0,0,0.4)"
              : "0 4px 30px rgba(0,0,0,0.35)",
        }}
      >
        {plan.popular && (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #00E5FF, #8A46FF)",
              color: "#050914",
              fontWeight: 700,
              fontSize: "0.7rem",
              padding: "0.3rem 1.2rem",
              borderRadius: 9999,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(0,229,255,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            ⭐ Most Popular
          </div>
        )}

        <PlanIcon icon={plan.icon} color={plan.color} />

        <div
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: plan.color,
          }}
        >
          {plan.name}
        </div>
        <div
          style={{
            color: "#9AA8C7",
            fontSize: "0.82rem",
            marginBottom: "1.5rem",
          }}
        >
          {plan.tagline}
        </div>
        <div
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: "2rem",
            color: "#EAF1FF",
            textShadow: plan.popular ? `0 0 20px ${plan.color}50` : "none",
          }}
        >
          {plan.price}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: "2rem",
          }}
        >
          {plan.features.map((f) => (
            <div
              key={f}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: `${plan.color}20`,
                  border: `1px solid ${plan.color}60`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  color: plan.color,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <span style={{ fontSize: "0.85rem", color: "#9AA8C7" }}>{f}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            width: "100%",
            padding: "0.75rem",
            background: plan.popular
              ? "linear-gradient(135deg, #8A46FF, #00E5FF)"
              : "rgba(255,255,255,0.06)",
            border: plan.popular ? "none" : `1px solid ${plan.color}40`,
            borderRadius: 9999,
            color: plan.popular ? "#050914" : "#EAF1FF",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "none",
            transition:
              "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: plan.popular ? "0 0 20px rgba(138,70,255,0.4)" : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            if (plan.popular)
              e.currentTarget.style.boxShadow = "0 0 30px rgba(138,70,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = plan.popular
              ? "0 0 20px rgba(138,70,255,0.4)"
              : "none";
          }}
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useScrollReveal();
  return (
    <section
      id="pricing"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem", background: "rgba(5,9,20,0.5)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
            Transparent Pricing
          </div>
          <h2 className="section-title">
            Choose Your <span className="neon-text-purple">Growth Plan</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            No hidden costs. All-inclusive packages built for Indian businesses.
          </p>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "center",
          }}
        >
          {plans.map((p, i) => (
            <PricingCard key={p.name} plan={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
