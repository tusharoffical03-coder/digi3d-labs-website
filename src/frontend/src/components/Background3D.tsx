import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

function ParticleField() {
  const count = isMobile() ? 50 : 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
      ),
      speed: 0.003 + Math.random() * 0.005,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.position.x + Math.sin(t * p.speed + p.offset) * 2,
        p.position.y + Math.cos(t * p.speed * 0.7 + p.offset) * 1.5,
        p.position.z,
      );
      dummy.scale.setScalar(0.05 + Math.sin(t * 0.5 + p.offset) * 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function FloatingShape({
  geometry,
  position,
  color,
  speed,
  rotationAxis,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  color: string;
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * rotationAxis[0];
    meshRef.current.rotation.y = t * rotationAxis[1];
    meshRef.current.rotation.z = t * rotationAxis[2];
    meshRef.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.4 + position[0]) * 0.8;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

const SHAPE_DEFS = [
  {
    color: "#00E5FF",
    speed: 0.15,
    axis: [1, 0.5, 0] as [number, number, number],
    pos: [-14, 4, -8] as [number, number, number],
    type: "ico3",
  },
  {
    color: "#8A46FF",
    speed: 0.1,
    axis: [0.3, 1, 0.2] as [number, number, number],
    pos: [14, -3, -10] as [number, number, number],
    type: "dod",
  },
  {
    color: "#FF4FD8",
    speed: 0.2,
    axis: [0.6, 0, 1] as [number, number, number],
    pos: [-8, -6, -6] as [number, number, number],
    type: "tor",
  },
  {
    color: "#00BFFF",
    speed: 0.12,
    axis: [0, 0.8, 0.5] as [number, number, number],
    pos: [10, 6, -12] as [number, number, number],
    type: "oct",
  },
  {
    color: "#8A46FF",
    speed: 0.08,
    axis: [0.5, 0.5, 0] as [number, number, number],
    pos: [-18, -2, -15] as [number, number, number],
    type: "tet",
  },
  {
    color: "#FF4FD8",
    speed: 0.18,
    axis: [1, 1, 0.3] as [number, number, number],
    pos: [18, 2, -5] as [number, number, number],
    type: "ico2",
  },
];

const SHAPE_GEOS: Record<string, THREE.BufferGeometry> = {
  ico3: new THREE.IcosahedronGeometry(3, 0),
  dod: new THREE.DodecahedronGeometry(2.5, 0),
  tor: new THREE.TorusGeometry(2.5, 0.4, 6, 12),
  oct: new THREE.OctahedronGeometry(2.8, 0),
  tet: new THREE.TetrahedronGeometry(3.2, 0),
  ico2: new THREE.IcosahedronGeometry(2, 0),
};

function FloatingShapes() {
  const mobile = isMobile();

  if (mobile) return null;

  return (
    <>
      {SHAPE_DEFS.map((s, i) => (
        <FloatingShape
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          geometry={SHAPE_GEOS[s.type]}
          position={s.pos}
          color={s.color}
          speed={s.speed}
          rotationAxis={s.axis}
        />
      ))}
    </>
  );
}

function AnimatedGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    (gridRef.current.material as THREE.MeshBasicMaterial).map!.offset.y =
      -(clock.elapsedTime * 0.05) % 1;
  });

  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(0,229,255,0.15)";
    ctx.lineWidth = 1;
    const step = size / 8;
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 8);
    return tex;
  }, []);

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.02;
    target.current.y += (mouse.current.y - target.current.y) * 0.02;
    camera.position.x = target.current.x * 1.5;
    camera.position.y = target.current.y * 1;
  });

  return null;
}

const Scene = memo(function Scene() {
  return (
    <>
      <ParticleField />
      <FloatingShapes />
      <AnimatedGrid />
      <MouseParallax />
    </>
  );
});

export default memo(function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 70 }}
        dpr={[1, 1.2]}
        performance={{ min: 0.4 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Scene />
      </Canvas>
    </div>
  );
});
