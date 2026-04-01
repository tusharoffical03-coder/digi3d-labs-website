import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import type React from "react";
import { memo, useRef, useState } from "react";
import type * as THREE from "three";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  {
    title: "Website Design (3D + AI)",
    desc: "Immersive 3D websites powered by AI that captivate visitors and drive conversions.",
    color: "#00E5FF",
    icon: "icosahedron",
  },
  {
    title: "Google Ads Management",
    desc: "Data-driven Google campaigns that deliver measurable ROI and qualified leads.",
    color: "#8A46FF",
    icon: "torus",
  },
  {
    title: "Facebook Ads",
    desc: "Hyper-targeted Facebook & Instagram campaigns that grow your audience and sales.",
    color: "#FF4FD8",
    icon: "octahedron",
  },
  {
    title: "Funnel Design",
    desc: "High-converting sales funnels engineered to maximize your customer lifetime value.",
    color: "#00BFFF",
    icon: "cone",
  },
  {
    title: "SEO Optimization",
    desc: "Dominate search rankings with technical SEO, content strategy, and link building.",
    color: "#7B2FBE",
    icon: "sphere",
  },
];

function IcosahedronMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.8;
      ref.current.rotation.y += d * 0.6;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function TorusMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 1.2;
    if (ring1.current) ring1.current.rotation.x += d * 0.8;
  });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[0.8, 0.15, 6, 12]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.1, 0.08, 4, 10]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function OctahedronMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.7;
      ref.current.rotation.z += d * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function ConeMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.9;
  });
  return (
    <mesh ref={ref}>
      <coneGeometry args={[1, 1.8, 5, 1, true]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function SphereMesh({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.5;
    if (ring.current) ring.current.rotation.z += d * 1.5;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.9, 10, 8]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.3, 0.05, 4, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

const IconCanvas = memo(function IconCanvas({
  icon,
  color,
}: { icon: string; color: string }) {
  return (
    <div style={{ width: 80, height: 80, margin: "0 auto 1rem" }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1]}
        frameloop="always"
      >
        {icon === "icosahedron" && <IcosahedronMesh color={color} />}
        {icon === "torus" && <TorusMesh color={color} />}
        {icon === "octahedron" && <OctahedronMesh color={color} />}
        {icon === "cone" && <ConeMesh color={color} />}
        {icon === "sphere" && <SphereMesh color={color} />}
      </Canvas>
    </div>
  );
});

function ServiceCard({
  service,
  index,
}: { service: (typeof services)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 15;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        className="glass-card holographic-shimmer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        onMouseMove={onMouseMove}
        style={{
          padding: "2rem 1.5rem",
          textAlign: "center",
          cursor: "default",
          transform: hovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px)`
            : "perspective(800px) rotateX(0) rotateY(0) translateY(0)",
          transition:
            "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: hovered
            ? `0 0 30px ${service.color}50, 0 0 60px ${service.color}20, 0 20px 40px rgba(0,0,0,0.5)`
            : "0 4px 40px rgba(0,0,0,0.4)",
        }}
      >
        <IconCanvas icon={service.icon} color={service.color} />
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#EAF1FF",
            marginBottom: "0.75rem",
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "#9AA8C7", lineHeight: 1.6 }}>
          {service.desc}
        </p>
        <div
          style={{
            marginTop: "1.25rem",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="services"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem" }}
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
            What We Do
          </div>
          <h2 className="section-title">
            Our <span className="neon-text-cyan">Services</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: "1rem" }}>
            End-to-end digital solutions engineered for growth and maximum ROI.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
