"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

// ── Inner 3D scene components ──────────────────────────────────────────────

function ParticleField({ count = 800 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrb({ position, color, scale = 1, speed = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.3;
      mesh.current.rotation.y += 0.008 * speed;
    }
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            distort={0.35}
            speed={2}
            roughness={0.1}
            metalness={0.6}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function NeuralNode({ position, color = "#3b82f6", size = 0.08 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.scale.setScalar(
        size * (1 + 0.15 * Math.sin(state.clock.elapsedTime * 2 + position[0]))
      );
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.1}
      />
    </mesh>
  );
}

function NeuralLine({ start, end, color = "#3b82f6" }) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

function NeuralNetwork() {
  const nodes = useMemo(() => {
    const n = [];
    // layer 1
    [-1.2, 0, 1.2].forEach((y) => n.push([-2.5, y, 0]));
    // layer 2
    [-1.8, -0.6, 0.6, 1.8].forEach((y) => n.push([-0.8, y, 0.2]));
    // layer 3
    [-1.2, 0, 1.2].forEach((y) => n.push([0.8, y, 0]));
    // layer 4
    [-0.6, 0.6].forEach((y) => n.push([2.2, y, 0.1]));
    return n;
  }, []);

  const edges = useMemo(() => {
    const e = [];
    // L1→L2
    [0,1,2].forEach((i) =>
      [3,4,5,6].forEach((j) => e.push([nodes[i], nodes[j]]))
    );
    // L2→L3
    [3,4,5,6].forEach((i) =>
      [7,8,9].forEach((j) => e.push([nodes[i], nodes[j]]))
    );
    // L3→L4
    [7,8,9].forEach((i) =>
      [10,11].forEach((j) => e.push([nodes[i], nodes[j]]))
    );
    return e;
  }, [nodes]);

  const colors = ["#3b82f6","#3b82f6","#3b82f6","#8b5cf6","#8b5cf6","#8b5cf6","#8b5cf6","#06b6d4","#06b6d4","#06b6d4","#8b5cf6","#8b5cf6"];

  return (
    <group position={[0, 0, -1]}>
      {edges.map((e, i) => (
        <NeuralLine key={i} start={e[0]} end={e[1]} color={i % 3 === 0 ? "#8b5cf6" : "#3b82f6"} />
      ))}
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}

function MouseParallax({ children }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );
  }

  useFrame((_, delta) => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return <>{children}</>;
}

function Scene() {
  return (
    <MouseParallax>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={2} />
      <pointLight position={[-5, -5, 3]} color="#8b5cf6" intensity={1.5} />
      <pointLight position={[0, 8, -5]} color="#06b6d4" intensity={1} />

      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <ParticleField count={600} />
      <NeuralNetwork />

      <FloatingOrb position={[-5, 2.5, -3]} color="#3b82f6" scale={0.7} speed={0.8} />
      <FloatingOrb position={[5, -2, -2]} color="#8b5cf6" scale={0.55} speed={1.2} />
      <FloatingOrb position={[0, 3.5, -5]} color="#06b6d4" scale={0.4} speed={0.6} />
    </MouseParallax>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
