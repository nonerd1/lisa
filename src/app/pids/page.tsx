"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function PIDs() {
  const introRef = useRef(null);
  const videoRef = useRef(null);
  const tuningRef = useRef(null);
  
  const isIntroInView = useInView(introRef, { once: true, amount: 0.2 });
  const isVideoInView = useInView(videoRef, { once: true, amount: 0.2 });
  const isTuningInView = useInView(tuningRef, { once: true, amount: 0.2 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Understanding PIDs</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            The backbone of our drone's stability and control system: Proportional-Integral-Derivative controllers.
          </p>
        </div>
      </div>

      {/* Introduction to PIDs Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={introRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What Are PID Controllers?</h2>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                PID (Proportional-Integral-Derivative) controllers are feedback control loops used in various systems requiring continuous modulated control. In simpler terms, they're the mathematical brains that help maintain stability and precision in dynamic systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
                <Card className="bg-[#252525] p-6 border-t-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">Proportional (P)</h3>
                  <p className="text-gray-300">
                    Responds proportionally to the current error. The larger the error, the stronger the correction. Acts as the "present" component.
                  </p>
                </Card>
                
                <Card className="bg-[#252525] p-6 border-t-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">Integral (I)</h3>
                  <p className="text-gray-300">
                    Accounts for past accumulated errors. Helps eliminate persistent offsets that P alone cannot correct. Acts as the "past" component.
                  </p>
                </Card>
                
                <Card className="bg-[#252525] p-6 border-t-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-3">Derivative (D)</h3>
                  <p className="text-gray-300">
                    Predicts future error trends based on the rate of change. Provides damping to reduce overshoot. Acts as the "future" component.
                  </p>
                </Card>
              </div>
              
              <p>
                Together, these three components work in harmony to achieve precise control by continuously calculating an error value as the difference between a desired setpoint and a measured process variable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isVideoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">PID Control in Action</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
              Watch how PID controllers enable precise control and stability in our telescopic arm drone system:
            </p>
            
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[#1a1a1a] shadow-xl mx-auto">
              {/* Add a blurred background version of the video */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.8] blur-md"
                >
                  <source src="/media/pid1.mp4" type="video/mp4" />
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
                    controls
                    className="h-full w-full object-contain"
                  >
                    <source src="/media/pid1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PIDs in Vehicle Control Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">PIDs in Vehicle Control</h2>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                In drone and other vehicle applications, PIDs are crucial for maintaining stability and enabling precise maneuvering. Each axis of motion (roll, pitch, and yaw) typically requires its own PID controller.
              </p>
              
              <div className="my-8 p-6 bg-[#252525] rounded-xl border-l-4 border-[#2563eb]">
                <h3 className="text-xl font-semibold mb-3">How PIDs Enable Drone Flight</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>They process gyroscope and accelerometer data to understand the drone's current orientation</li>
                  <li>Compare this orientation to the pilot's desired orientation</li>
                  <li>Calculate motor speed adjustments needed to achieve the desired position</li>
                  <li>Make thousands of tiny corrections per second to maintain stability</li>
                </ul>
              </div>
              
              <div className="my-10 relative">
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/media/pidgraph.jpg"
                    alt="PID Controller Response Graph"
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-3 text-sm text-center text-gray-400 italic">
                  PID controller response: The graph shows how different configurations affect system stability and response time.
                </p>
              </div>
              
              <p>
                For our L.I.S.A. drone with telescopic arms, PIDs are even more critical. When the arms extend or retract, the drone's center of gravity and moment of inertia change dramatically. Our PIDs must dynamically adapt to these changes to maintain stable flight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PID Tuning Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={tuningRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTuningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">The Art of PID Tuning</h2>
            
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                Tuning PIDs is both a science and an art. For L.I.S.A., we employed a methodical approach to find the perfect balance:
              </p>
              
              <div className="relative overflow-hidden mt-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#2a2a2a] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Ziegler-Nichols Method</h3>
                    <ol className="space-y-2 list-decimal pl-5">
                      <li>Set I and D values to zero</li>
                      <li>Increase P until the system oscillates</li>
                      <li>Record the critical gain and oscillation period</li>
                      <li>Calculate starting PID values using these measurements</li>
                      <li>Fine-tune from there based on system response</li>
                    </ol>
                  </div>
                  
                  <div className="bg-[#2a2a2a] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">L.I.S.A.-Specific Challenges</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Needed different PID values for extended vs. retracted positions</li>
                      <li>Had to implement dynamic PID adjustment during arm movement</li>
                      <li>Wind resistance considerations required additional tuning</li>
                      <li>Oscillation dampening needed special attention during transitions</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p>
                After hundreds of flight tests and iterations, we developed a responsive control system that maintains stability throughout the full range of arm extension. The final values represent a careful balance between responsiveness and stability.
              </p>
              
              <div className="mt-8 p-6 bg-[#1a1a1a] rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4">Final PID Values (Extended Position)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="text-blue-400 font-bold text-lg">P: 1.35</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-bold text-lg">I: 0.04</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-bold text-lg">D: 2.20</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our software architecture and control systems in more detail.
          </p>
          <a href="/software" className="btn-primary">
            See Software Details
          </a>
        </div>
      </section>
    </div>
  );
} 