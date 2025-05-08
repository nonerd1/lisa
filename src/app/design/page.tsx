"use client";

import { useState } from "react";
import NextImage from "@/components/ui/next-image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import React from "react";
import dynamic from 'next/dynamic';
import { resolvePath } from "@/utils/path-utils";

// Load ModelViewer component dynamically with no server-side rendering
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { 
  ssr: false,
});

// IMPORTANT INSTRUCTIONS:
// 1. Move these files from your Downloads folder to public/media in the project:
//    - First_CAD_Model.png
//    - Prototype_v1.png
//    - Linear_Actuator_Integration.png
//    - Prototype_v2.png
//    - Prototype_v3.JPG
//    - Final_Arm_Design.png
//
// 2. Move the Motor_Mount_Design.stl file to public/models in the project
//
// 3. After moving the files, you can uncomment the ModelViewer component below
//    and remove the placeholder images when you have the real images ready

// Note: Please make sure to move the following files to public/media:
// - Initial_Concept_Sketch.png (you need to create this file or take a photograph of the initial sketch)
// - First_CAD_Model.png
// - Prototype_v1.png
// - Linear_Actuator_Integration.png
// - Prototype_v2.png
// - Prototype_v3.JPG
// - Final_Arm_Design.png
// - Integration_Testing.png (you need to create this file or take a photograph of the integration testing)
// 
// Also move Motor_Mount_Design.stl to public/models/

// Design iteration data
const designIterations = [
  {
    id: 1,
    title: "Initial Concept Sketch",
    description: "First conceptual drawing of telescopic mechanism. The idea was to use a rack and pinion system initially.",
    image: "/media/isktch.png",
    date: "September 2022",
  },
  {
    id: 2,
    title: "First CAD Model",
    description: "First 3D model in Fusion360. We quickly realized the rack and pinion would be too heavy.",
    image: "/media/First_CAD_Model.png",
    date: "October 2022",
  },
  {
    id: 3,
    title: "Prototype v1",
    description: "First 3D printed prototype. Failed due to insufficient wall thickness and weak attachment points.",
    image: "/media/Prototype_v1.png",
    date: "November 2022",
  },
  {
    id: 4,
    title: "Linear Actuator Integration",
    description: "Switched to linear actuators for extension mechanism. Required significant redesign of the arm structure.",
    image: "/media/Linear_Actuator_Integration.png",
    date: "December 2022",
  },
  {
    id: 5,
    title: "Prototype v2",
    description: "Second prototype with reinforced joints and actuator mounting points. Material thickness increased.",
    image: "/media/Prototype_v2.png",
    date: "January 2023",
  },
  {
    id: 6,
    title: "Prototype v3",
    description: "Third prototype added guide rails to prevent arm wobble when extended. Much more stable.",
    image: "/media/Prototype_v3.JPG",
    date: "February 2023",
  },
  {
    id: 7,
    title: "Motor Mount Design",
    description: "Redesigned motor mount to integrate with telescopic arm. Improved weight distribution.",
    image: "/media/motormount.png",
    date: "February 2023",
  },
  {
    id: 8,
    title: "Final Arm Design",
    description: "Final arm design with optimized weight, proper actuator housing, and reinforced extension rails.",
    image: "/media/Final_Arm_Design.png",
    date: "March 2023",
  },
  {
    id: 9,
    title: "Integration Testing",
    description: "Testing the fully integrated arm with electronics. Some issues with wire routing were identified and fixed.",
    image: "/media/integ.jpeg",
    date: "April 2023",
  },
];

// Model type definition
type ModelData = {
  path: string;
  title: string;
  description: string;
};

type ModelsType = {
  "motor-mount": ModelData;
  "motor-head": ModelData;
};

export default function Design() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentModel, setCurrentModel] = useState<"motor-mount" | "motor-head">("motor-mount");
  const galleryRef = useRef(null);
  const modelRef = useRef(null);
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 });
  const isModelInView = useInView(modelRef, { once: true, amount: 0.1 });

  // Model data for the two STL files
  const models: ModelsType = {
    "motor-mount": {
      path: "/models/Motor_Mount_Design.stl",
      title: "Motor Mount Design",
      description: "This is the 3D model of our motor mount design. The mount was designed to integrate seamlessly with the telescopic arm system while providing stable support for the motors."
    },
    "motor-head": {
      path: "/models/MotorHead_Website.stl",
      title: "Motor Head Design",
      description: "This is the detailed 3D model of our motor head component. The motor head connects to the mount and houses the actual motor, with optimized airflow and weight distribution."
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Design Evolution</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            The journey from concept to final product: how we designed the telescopic arm mechanism.
          </p>
        </div>
      </div>

      {/* 3D Model Viewer Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={modelRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isModelInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Interactive 3D Models</h2>
            <p className="text-gray-300 mb-8">
              Explore our designs in 3D. Use your mouse to rotate, zoom, and pan around the models.
            </p>
            
            {/* Model selector tabs */}
            <div className="flex mb-6 bg-[#252525] rounded-t-xl overflow-hidden">
              <button 
                className={`py-3 px-6 text-lg font-medium transition-colors ${currentModel === 'motor-mount' ? 'bg-[#2563eb] text-white' : 'bg-[#252525] text-gray-300 hover:text-white'}`}
                onClick={() => setCurrentModel('motor-mount')}
              >
                Motor Mount
              </button>
              <button 
                className={`py-3 px-6 text-lg font-medium transition-colors ${currentModel === 'motor-head' ? 'bg-[#2563eb] text-white' : 'bg-[#252525] text-gray-300 hover:text-white'}`}
                onClick={() => setCurrentModel('motor-head')}
              >
                Motor Head
              </button>
            </div>
            
            <div className="bg-[#252525] rounded-b-2xl overflow-hidden shadow-lg">
              <div className="h-[500px]">
                {/* Use try/catch to handle potential errors */}
                <ErrorBoundary>
                  <ThreeScene modelPath={models[currentModel].path} />
                </ErrorBoundary>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{models[currentModel].title} - 3D Model</h3>
                <p className="text-gray-300">
                  {models[currentModel].description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Design Gallery Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Design Iteration Gallery</h2>
            
            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designIterations.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGalleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg cursor-pointer hover:scale-[1.02] transition-transform ${
                    index % 3 === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                  onClick={() => setSelectedImage(design.id)}
                >
                  <div className="relative h-48 sm:h-64">
                    <NextImage
                      src={design.image}
                      alt={design.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-[#2563eb] mb-1">{design.date}</p>
                    <h3 className="text-lg font-semibold mb-2">{design.title}</h3>
                    <p className="text-sm text-gray-300">{design.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-[#1a1a1a] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-[70vh]">
              {selectedImage && (
                <NextImage
                  src={designIterations.find(d => d.id === selectedImage)?.image || "/media/placeholder-image.svg"}
                  alt={designIterations.find(d => d.id === selectedImage)?.title || "Design image"}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {designIterations.find(d => d.id === selectedImage)?.title}
              </h3>
              <p className="text-gray-300">
                {designIterations.find(d => d.id === selectedImage)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Design Process Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Design Challenges</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-6">
              "Yes, we literally had to put our arms back on after they fell off."
            </p>
            <p className="text-gray-300 mb-8">
              The most challenging aspect of the design process was balancing weight, strength, and functionality.
              Early prototypes suffered from weak connection points that would break during flight testing.
              We solved this by reinforcing key stress points and using a higher infill percentage for 3D printing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-[#252525] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Weight Optimization</h3>
                <p className="text-gray-300 text-sm">
                  Each design iteration reduced weight while maintaining structural integrity.
                  Final version is 40% lighter than our first prototype.
                </p>
              </div>
              <div className="bg-[#252525] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Arm Stability</h3>
                <p className="text-gray-300 text-sm">
                  Added guide rails and bearing surfaces to eliminate wobble when arms are extended.
                  Critical for maintaining flight stability.
                </p>
              </div>
              <div className="bg-[#252525] p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Actuator Integration</h3>
                <p className="text-gray-300 text-sm">
                  Designed custom housing for linear actuators with proper heat dissipation and
                  protection from crash damage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn about the talented individuals who brought this project to life.
          </p>
          <a href="/team" className="btn-primary">
            Our Team
          </a>
        </div>
      </section>
    </div>
  );
}

// Simple error boundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-[#252525]">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-2">3D Model Unavailable</h3>
            <p className="text-gray-400">
              The 3D model could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
} 