"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Test data
const flightTests = [
  {
    id: 1,
    title: "First Hover Test",
    description: "Initial hover test with arms in retracted position to verify basic flight stability.",
    videoUrl: "https://www.youtube.com/embed/abc123",
    date: "April 5, 2023",
    result: "Successful",
  },
  {
    id: 2,
    title: "Arm Extension Test (Ground)",
    description: "Testing arm extension mechanism while drone is secured on ground.",
    videoUrl: "https://www.youtube.com/embed/def456",
    date: "April 10, 2023",
    result: "Successful",
  },
  {
    id: 3,
    title: "Arm Extension During Hover",
    description: "First test of arm extension while in hover mode. Observe stability changes.",
    videoUrl: "https://www.youtube.com/embed/ghi789",
    date: "April 15, 2023",
    result: "Partially Successful",
  },
  {
    id: 4,
    title: "Stability Recovery Test",
    description: "Testing drone's ability to recover stability after sudden arm extension.",
    videoUrl: "https://www.youtube.com/embed/jkl012",
    date: "April 20, 2023",
    result: "Successful",
  },
  {
    id: 5,
    title: "Wind Resistance Comparison",
    description: "Comparing drone stability in wind with extended vs. retracted arms.",
    videoUrl: "https://www.youtube.com/embed/mno345",
    date: "April 25, 2023",
    result: "Successful",
  },
];

// Performance metrics
const performanceMetrics = [
  {
    metric: "Flight Time",
    normal: "18 min",
    extended: "15 min",
    difference: "-16.7%",
    notes: "Extension mechanism and increased drag reduce flight time.",
  },
  {
    metric: "Top Speed",
    normal: "35 km/h",
    extended: "30 km/h",
    difference: "-14.3%",
    notes: "Extended arms create more drag, reducing top speed.",
  },
  {
    metric: "Stability (Wind)",
    normal: "Medium",
    extended: "High",
    difference: "+40%",
    notes: "Extended arms significantly improve stability in windy conditions.",
  },
  {
    metric: "Maneuverability",
    normal: "High",
    extended: "Medium",
    difference: "-25%",
    notes: "Extended arms reduce agility but improve precision hovering.",
  },
  {
    metric: "Power Consumption",
    normal: "110W",
    extended: "130W",
    difference: "+18.2%",
    notes: "Extension increases power draw due to higher air resistance.",
  },
];

export default function Testing() {
  const videosRef = useRef(null);
  const metricsRef = useRef(null);
  const isVideosInView = useInView(videosRef, { once: true, amount: 0.1 });
  const isMetricsInView = useInView(metricsRef, { once: true, amount: 0.1 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Testing and Performance</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            A comprehensive look at our flight testing process and performance metrics.
          </p>
        </div>
      </div>

      {/* Flight Test Videos Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={videosRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isVideosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Flight Test Videos</h2>
            
            <div className="space-y-12">
              {flightTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVideosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#252525] rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src={test.videoUrl}
                      className="w-full h-full"
                      title={test.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold">{test.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        test.result === "Successful" 
                          ? "bg-green-900/20 text-green-400"
                          : test.result === "Partially Successful"
                          ? "bg-yellow-900/20 text-yellow-400"
                          : "bg-red-900/20 text-red-400"
                      }`}>
                        {test.result}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{test.description}</p>
                    <p className="text-sm text-[#2563eb]">{test.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Arm Extension GIF */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Arm Extension in Action</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Watch our telescopic arms extend and retract in this demonstration.
          </p>
          <div className="max-w-2xl mx-auto bg-[#1a1a1a] p-2 rounded-xl shadow-lg">
            <Image
              src="/media/arm-extension.gif"
              alt="Arm Extension GIF"
              width={800}
              height={450}
              className="rounded-lg"
            />
            <p className="mt-4 text-gray-400 text-sm">
              Full extension takes approximately 2.5 seconds and can be performed during flight.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={metricsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isMetricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Performance Comparison</h2>
            <p className="text-gray-300 mb-8">
              Below is a comparison of key performance metrics between normal configuration (arms retracted)
              and extended configuration.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2563eb]/10 border-b border-[#2563eb]/30">
                    <th className="px-6 py-4 text-left font-semibold">Metric</th>
                    <th className="px-6 py-4 text-left font-semibold">Normal</th>
                    <th className="px-6 py-4 text-left font-semibold">Extended</th>
                    <th className="px-6 py-4 text-left font-semibold">Difference</th>
                    <th className="px-6 py-4 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceMetrics.map((metric, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isMetricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-800"
                    >
                      <td className="px-6 py-4 font-medium">{metric.metric}</td>
                      <td className="px-6 py-4 text-gray-300">{metric.normal}</td>
                      <td className="px-6 py-4 text-gray-300">{metric.extended}</td>
                      <td className={`px-6 py-4 font-medium ${
                        metric.difference.startsWith("+") 
                          ? "text-green-400" 
                          : metric.difference.startsWith("-") 
                          ? "text-red-400" 
                          : "text-gray-300"
                      }`}>
                        {metric.difference}
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{metric.notes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PID Tuning Results */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">PID Tuning Results</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Extensive PID tuning was necessary to ensure stable flight in both arm configurations.
          </p>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/media/pid-tuning-graph.jpg"
              alt="PID Tuning Graph"
              width={1000}
              height={600}
              className="rounded-xl shadow-lg"
            />
            <p className="mt-6 text-gray-300">
              The graph above shows the response curves during our PID tuning process. 
              Notice how the extended configuration (red line) required different gain values
              to achieve a similar settling time.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn about the talented engineers who brought L.I.S.A. to life.
          </p>
          <a href="/team" className="btn-primary">
            View Team Members
          </a>
        </div>
      </section>
    </div>
  );
} 