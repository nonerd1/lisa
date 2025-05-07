"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from 'three-stdlib';
import * as THREE from "three";

type ModelViewerProps = {
  modelPath: string;
  color?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const ModelViewer = ({ 
  modelPath, 
  color = '#1e88e5', 
  scale = 0.02, 
  position = [0, 0, 0],
  rotation = [0, 0, 0] 
}: ModelViewerProps) => {
  const geometry = useLoader(STLLoader, modelPath);

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default ModelViewer; 