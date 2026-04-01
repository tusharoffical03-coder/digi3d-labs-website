import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

function WormholePortal() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;
  });
  const rings = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);
  return (
    <group ref={groupRef} position={[0, 0, -18]}>
      {rings.map((i) => {
        const scale = 2 + i * 1.4;
        const opacity = 0.5 - i * 0.035;
        return (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
            <torusGeometry args={[scale, 0.04, 8, 80]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00E5FF" : "#8A46FF"}
              emissive={i % 2 === 0 ? "#00E5FF" : "#8A46FF"}
              emissiveIntensity={0.9}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}

type GeoType =
  | "icosahedron"
  | "torus"
  | "octahedron"
  | "tetrahedron"
  | "dodecahedron";

function ShapeGeo({ geometry }: { geometry: GeoType }) {
  if (geometry === "icosahedron") return <icosahedronGeometry args={[1, 1]} />;
  if (geometry === "torus") return <torusGeometry args={[0.8, 0.25, 8, 32]} />;
  if (geometry === "octahedron") return <octahedronGeometry args={[1]} />;
  if (geometry === "tetrahedron") return <tetrahedronGeometry args={[1]} />;
  return <dodecahedronGeometry args={[1]} />;
}

function GlowGeo({ geometry }: { geometry: GeoType }) {
  if (geometry === "icosahedron") return <icosahedronGeometry args={[1, 0]} />;
  if (geometry === "torus") return <torusGeometry args={[0.8, 0.3, 8, 24]} />;
  if (geometry === "octahedron") return <octahedronGeometry args={[1]} />;
  if (geometry === "tetrahedron") return <tetrahedronGeometry args={[1]} />;
  return <dodecahedronGeometry args={[1]} />;
}

function DriftingShape({
  geometry,
  position,
  color,
  depth,
  driftAmp,
  speed,
}: {
  geometry: GeoType;
  position: [number, number, number];
  color: string;
  depth: number;
  driftAmp: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const offsetRef = useRef(Math.random() * 100);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + offsetRef.current;
    const mi = 2.5 * (1 - depth * 0.6);
    meshRef.current.position.x =
      position[0] + mouse.x * mi + Math.sin(t * 0.3 * speed) * driftAmp;
    meshRef.current.position.y =
      position[1] +
      mouse.y * mi * 0.8 +
      Math.cos(t * 0.25 * speed) * driftAmp * 0.7;
    meshRef.current.position.z =
      position[2] + Math.sin(t * 0.15 * speed) * driftAmp * 0.5;
    meshRef.current.rotation.x = t * speed * 0.25;
    meshRef.current.rotation.y = t * speed * 0.4;
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  const scale = 0.6 + (1 - depth) * 0.8;

  return (
    <>
      <mesh ref={glowRef} position={position} scale={scale * 1.6}>
        <GlowGeo geometry={geometry} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={meshRef} position={position} scale={scale}>
        <ShapeGeo geometry={geometry} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </>
  );
}

function ParticleLayer({
  depth,
  count,
  color,
  zOffset,
}: { depth: number; count: number; color: string; zOffset: number }) {
  const groupRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = zOffset + (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count, zOffset]);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const shift = (1 - depth) * 1.8;
    groupRef.current.position.x = mouse.x * shift * 0.4;
    groupRef.current.position.y = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05 + (1 - depth) * 0.08}
        color={color}
        transparent
        opacity={0.5 + (1 - depth) * 0.3}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.z = (clock.getElapsedTime() * 0.4) % 2;
  });
  return (
    <gridHelper
      ref={ref}
      args={[60, 40, "#00E5FF22", "#0a122a"]}
      position={[0, -6, -8]}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, -10]} intensity={4} color="#00E5FF" />
      <pointLight position={[5, 8, 2]} intensity={2} color="#00BFFF" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#8A46FF" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#FF4FD8" />
      <WormholePortal />
      {!isMobile && (
        <>
          <ParticleLayer depth={0.1} count={80} color="#00E5FF" zOffset={2} />
          <ParticleLayer depth={0.5} count={100} color="#8A46FF" zOffset={-4} />
          <ParticleLayer depth={0.9} count={60} color="#FF4FD8" zOffset={-10} />
        </>
      )}
      {isMobile && (
        <ParticleLayer depth={0.5} count={50} color="#00E5FF" zOffset={0} />
      )}
      <DriftingShape
        geometry="icosahedron"
        position={[-5, 2, 0]}
        color="#00E5FF"
        depth={0.1}
        driftAmp={0.8}
        speed={0.9}
      />
      <DriftingShape
        geometry="torus"
        position={[5, -1.5, -1]}
        color="#8A46FF"
        depth={0.2}
        driftAmp={0.7}
        speed={0.7}
      />
      <DriftingShape
        geometry="octahedron"
        position={[-3, -3, -5]}
        color="#00BFFF"
        depth={0.5}
        driftAmp={1.0}
        speed={0.6}
      />
      <DriftingShape
        geometry="dodecahedron"
        position={[4, 3, -6]}
        color="#FF4FD8"
        depth={0.5}
        driftAmp={1.2}
        speed={0.5}
      />
      <DriftingShape
        geometry="tetrahedron"
        position={[-1, 1, -4]}
        color="#8A46FF"
        depth={0.4}
        driftAmp={0.9}
        speed={0.8}
      />
      <GridFloor />
      <Stars
        radius={80}
        depth={30}
        count={isMobile ? 150 : 400}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function HeroSection() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPortfolio = () =>
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  const scrollToNext = () =>
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 65 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ powerPreference: "high-performance", antialias: false }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(5,9,20,0.55) 80%, rgba(5,9,20,0.92) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, #070B18)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.25)",
            borderRadius: 9999,
            padding: "0.375rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#00E5FF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00E5FF",
              display: "block",
              boxShadow: "0 0 6px #00E5FF",
              animation: "pulse-glow 2s infinite",
            }}
          />
          Premium Digital Agency
        </div>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 820,
            marginBottom: "1.25rem",
            textShadow: "0 0 60px rgba(0,229,255,0.2)",
          }}
        >
          We Build{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #00E5FF 0%, #8A46FF 50%, #FF4FD8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            Future-Ready 3D
          </span>{" "}
          Websites That Convert
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#9AA8C7",
            maxWidth: 520,
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          Web Design, Ads &amp; Growth Solutions
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            className="btn-neon-cyan"
            onClick={scrollToContact}
            style={{ fontSize: "1rem", padding: "0.75rem 2.25rem" }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="btn-glass-outline"
            onClick={scrollToPortfolio}
            style={{ fontSize: "1rem", padding: "0.75rem 2.25rem" }}
          >
            View Portfolio
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToNext}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          background: "none",
          border: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "none",
          color: "#9AA8C7",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Scroll
        <div
          style={{
            width: 24,
            height: 38,
            border: "2px solid rgba(0,229,255,0.4)",
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              background: "#00E5FF",
              borderRadius: 2,
              boxShadow: "0 0 6px #00E5FF",
              animation: "bounce-dot 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </button>
    </section>
  );
}
