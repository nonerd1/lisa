"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import dynamic from 'next/dynamic';

// Dynamically import the ModelViewer to prevent SSR issues
const ModelViewer = dynamic(() => import('./three/model-viewer'), { ssr: false });

type ThreeSceneProps = {
  modelPath: string;
};

export default function ThreeScene({ modelPath }: ThreeSceneProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [4, 4, 4], fov: 50 }}
        style={{ background: "#252525" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          intensity={1}
          position={[5, 5, 5]}
          castShadow
        />
        <Suspense fallback={<FallbackCube />}>
          <ModelViewer modelPath={modelPath} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}

// Fallback component to show while the model is loading
function FallbackCube() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2563eb" wireframe />
    </mesh>
  );
} 