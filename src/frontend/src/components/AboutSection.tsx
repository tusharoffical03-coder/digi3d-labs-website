import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import { useScrollReveal } from "../hooks/useScrollReveal";

function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3 + mouse.x * 0.5;
    meshRef.current.rotation.x = mouse.y * 0.3;
    wireRef.current.rotation.y = t * 0.2 - mouse.x * 0.3;
    wireRef.current.rotation.x = t * 0.1;
  });
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00BFFF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshStandardMaterial
          color="#8A46FF"
          emissive="#8A46FF"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </>
  );
}

function useCountUp(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatCounter({
  value,
  label,
  suffix = "+",
  color,
}: { value: number; label: string; suffix?: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          lineHeight: 1,
          background: `linear-gradient(90deg, ${color}, #EAF1FF)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          color: "#9AA8C7",
          fontSize: "0.85rem",
          marginTop: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="fade-in-up"
      style={{ padding: "100px 1.5rem" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left: Story */}
          <div>
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
                marginBottom: "1.25rem",
              }}
            >
              About Us
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
            >
              We're Not Just an Agency. We're Your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00E5FF, #8A46FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Growth Partner.
              </span>
            </h2>
            <p
              style={{
                color: "#9AA8C7",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              At Digi3D Labs, we merge cutting-edge 3D technology with
              performance-first digital marketing to build brands that don't
              just look premium — they convert at scale.
            </p>
            <p
              style={{
                color: "#9AA8C7",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Founded by engineers and marketers, we've helped 200+ businesses
              across India generate over ₹5 Crores in revenue through
              intelligent design, data-driven ads, and growth systems that work
              24/7.
            </p>
            <button
              type="button"
              className="btn-neon-cyan"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Work With Us
            </button>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
                marginTop: "3rem",
                padding: "1.5rem",
              }}
              className="glass-card"
            >
              <StatCounter value={200} label="Happy Clients" color="#00E5FF" />
              <StatCounter value={500} label="Projects Done" color="#8A46FF" />
              <StatCounter
                value={5}
                label="₹ Cr+ Revenue"
                suffix=" Cr+"
                color="#FF4FD8"
              />
            </div>
          </div>

          {/* Right: 3D sphere */}
          <div style={{ height: 380, position: "relative" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.4} />
              <pointLight position={[4, 4, 4]} intensity={3} color="#00E5FF" />
              <pointLight
                position={[-4, -4, 2]}
                intensity={2}
                color="#8A46FF"
              />
              <Suspense fallback={null}>
                <InteractiveSphere />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
