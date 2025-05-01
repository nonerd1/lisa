"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

// Define the specs data
const specs = [
  { label: "Weight", value: "632g" },
  { label: "Flight Time", value: "13 minutes" },
  { label: "Normal Span", value: "1.75ft" },
  { label: "Extended Span", value: "2.5ft" },
  { label: "Actuator Stroke", value: "7in to 11in" },
  { label: "Bluetooth Range", value: "30m" },
];

// Define the timeline data
const timeline = [
  {
    date: "Sept 2024",
    title: "Initial Concept",
    description:
      "First sketches of drone withtelescopic arm mechanism. Team formation and project proposal.",
  },
  {
    date: "Nov 2024",
    title: "Prototype v1",
    description:
      "First 3D printed arm prototype. Failed due to insufficient wall thickness and weak joints.",
  },
  {
    date: "Jan 2025",
    title: "Prototype v2",
    description:
      "Redesigned with reinforced joints and better material layering. Successfully tested with weight.",
  },
  {
    date: "Feb 2025",
    title: "Electronics Design",
    description:
      "Designed control circuit with STM32 and H-bridges. Implemented Bluetooth control module.",
  },
  {
    date: "March 2025",
    title: "Flight Controller Failure",
    description:
      "Original flight controller failed during testing. Quick pivot to Pixhawk system.",
  },
  {
    date: "April 2025",
    title: "Complete Integration",
    description:
      "All systems integrated. Test flight with arm extension.",
  },
  {
    date: "May 2025",
    title: "Final Project",
    description:
      "Performance optimizations and documentation complete. L.I.S.A. ready for presentation.",
  },
];

export default function Overview() {
  const specsRef = useRef(null);
  const timelineRef = useRef(null);
  const isSpecsInView = useInView(specsRef, { once: true, amount: 0.2 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Overview</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            L.I.S.A. is a quadcopter drone with telescopic arms that can extend and retract during flight,
            allowing for dynamic adjustment of flight characteristics.
          </p>
        </div>
      </div>

      {/* Specs Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={specsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isSpecsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Technical Specifications</h2>
            
            <Card className="overflow-hidden rounded-2xl shadow-lg bg-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isSpecsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-between items-center border-b border-gray-700 pb-3"
                  >
                    <span className="text-gray-100">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Development Timeline</h2>
            
            <div className="relative border-l-2 border-[#2563eb] pl-8 ml-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-12 h-6 w-6 bg-[#2563eb] rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-white rounded-full"></div>
                  </div>
                  <span className="inline-block mb-2 py-1 px-3 bg-[#2563eb]/20 text-[#2563eb] text-sm font-semibold rounded-full">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to learn more?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore the hardware components, software architecture, and design process of L.I.S.A.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/hardware" className="btn-primary">
              Hardware Details
            </a>
            <a href="/software" className="bg-[#252525] text-white px-6 py-3 rounded-lg hover:bg-[#333333] transition-colors">
              Software Architecture
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 