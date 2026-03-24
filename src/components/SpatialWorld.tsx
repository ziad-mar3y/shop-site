"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const data = [
  "/images/carsoule8.jpg",
  "/images/carsoule9.jpg",
  "/images/carousel10.jpg",
];

// 🎯 Floating 3D scene
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, camera } = useThree();

  // 🧠 Smooth camera inertia
  useFrame(() => {
    if (!groupRef.current) return;

    const targetX = mouse.x * 2;
    const targetY = mouse.y * 1.2;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {/* 🧊 FLOATING PLANES IN 3D SPACE */}

      <DreiImage
        url={data[0]}
        position={[-2.5, 0, -2]}
        scale={[2, 2.5, 1]}
      />

      <DreiImage
        url={data[1]}
        position={[0, 0, -1]}
        scale={[2.5, 3, 1]}
      />

      <DreiImage
        url={data[2]}
        position={[2.5, 0, -2.5]}
        scale={[2, 2.5, 1]}
      />
    </group>
  );
}

// 🌐 MAIN WORLD WRAPPER
export default function SpatialWorld() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* ambient spatial light */}
        <ambientLight intensity={0.8} />

        {/* soft directional light (Apple style glow) */}
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Scene />
      </Canvas>

      {/* 🧊 FLOATING UI OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-xl">
          <h1 className="text-5xl font-semibold">
            Spatial Shopping
          </h1>
          <p className="mt-4 text-white/70">
            Move your cursor — you are navigating a 3D world, not a page.
          </p>
        </div>
      </div>
    </div>
  );
}