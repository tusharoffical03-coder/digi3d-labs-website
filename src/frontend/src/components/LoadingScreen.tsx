import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { IcosahedronGeometry } from "three";
import type * as THREE from "three";

function LogoGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 1.5;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.7) * 0.3;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#00E5FF"
        emissive="#00BFFF"
        emissiveIntensity={0.8}
        wireframe
      />
    </mesh>
  );
}

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(onComplete, 700);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #050914 0%, #070B18 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div style={{ width: 180, height: 180 }}>
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00E5FF" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#8A46FF" />
          <LogoGeometry />
        </Canvas>
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            background: "linear-gradient(90deg, #00E5FF, #8A46FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          DIGI3D LABS
        </div>
        <div
          style={{
            color: "#9AA8C7",
            fontSize: "0.8rem",
            marginTop: 4,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Loading Experience...
        </div>
      </div>

      <div style={{ marginTop: 32, width: 280 }}>
        <div
          style={{
            height: 4,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, #00E5FF, #8A46FF)",
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(0,229,255,0.6)",
              transition: "width 0.15s ease",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            color: "#9AA8C7",
            fontSize: "0.75rem",
          }}
        >
          {Math.round(Math.min(progress, 100))}%
        </div>
      </div>
    </div>
  );
}
