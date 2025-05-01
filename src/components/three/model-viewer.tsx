"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from 'three-stdlib';
import * as THREE from "three";
import getConfig from 'next/config';

interface ModelProps {
  modelPath: string;
}

function Model({ modelPath }: ModelProps) {
  // Get runtime config
  const { publicRuntimeConfig } = getConfig();
  
  // Create a full path including the base path if it exists
  const fullModelPath = publicRuntimeConfig?.basePath 
    ? `${publicRuntimeConfig.basePath}${modelPath}`
    : modelPath;
  
  // Log the path for debugging
  console.log('Loading model from:', fullModelPath);
    
  const [error, setError] = useState<boolean>(false);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  
  // Load the STL file
  useEffect(() => {
    const loader = new STLLoader();
    
    // Clear previous errors
    setError(false);
    
    loader.load(
      fullModelPath,
      (loadedGeometry) => {
        console.log('Model loaded successfully');
        setGeometry(loadedGeometry);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      () => {
        console.error('Error loading model:', fullModelPath);
        setError(true);
      }
    );
  }, [fullModelPath]);
  
  const model = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (model.current && geometry) {
      // Center the model
      geometry.center();
      // Normalize the size
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox;
      const size = new THREE.Vector3();
      boundingBox?.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim; // Scale to fit in a 2 unit box
      model.current.scale.setScalar(scale);
    }
  }, [geometry]);

  useFrame((state) => {
    if (model.current) {
      // Slow automatic rotation
      model.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff0000" wireframe />
      </mesh>
    );
  }
  
  if (!geometry) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666666" wireframe />
      </mesh>
    );
  }

  return (
    <mesh ref={model} geometry={geometry}>
      <meshStandardMaterial 
        color="#2563eb"
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}

function ModelLoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2563eb" wireframe />
    </mesh>
  );
}

export default function ModelViewer({ modelPath }: ModelProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#252525]">
        <div className="text-white">Loading 3D model...</div>
      </div>
    );
  }
  
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
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={<ModelLoadingFallback />}>
          <Model modelPath={modelPath} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
} 