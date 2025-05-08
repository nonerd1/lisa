"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectStory from "@/components/sections/project-story";
import Image from "next/image";

export default function Home() {
  const projectStoryRef = useRef<HTMLDivElement>(null);

  const scrollToStory = () => {
    projectStoryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video/Image Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            {/* Add a blurred background version of the video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.8] blur-md"
              >
                <source src="/media/homepage1_converted.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Main centered video */}
            <div className="absolute inset-0 z-1 flex items-center justify-center">
              <div className="h-full aspect-[9/16] max-h-screen">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/media/homepage1_converted.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            A drone that literally{" "}
            <span className="text-[#2563eb]">reaches</span> farther.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-300"
          >
            L.I.S.A. is a quadcopter whose 3-D-printed arms telescope in flight
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={scrollToStory}
              className="btn-primary rounded-full px-8 py-4 text-lg"
            >
              Get Started
            </button>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <button
            onClick={scrollToStory}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Project Story Section */}
      <div ref={projectStoryRef}>
        <ProjectStory />
      </div>
    </div>
  );
}
