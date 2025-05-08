"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function ProjectStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white">
            Project Story
          </h2>

          <div className="space-y-8 text-lg text-gray-300">
            <p>
              Our journey with L.I.S.A. began when we purchased an off-the-shelf
              quadcopter kit. However, we quickly realized the stock arms
              wouldn&apos;t serve our vision of creating a drone that could
              dynamically change its flight characteristics. We needed something
              more versatile, something that could extend its reach mid-flight.
            </p>

            <div className="relative pl-8 border-l-2 border-[#2563eb]">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                Why We Are Doing This
              </h3>
              <p className="mb-4">
                We saw an issue with rescuers being unable to reach people or places in narrow caves or collapsed buildings after a natural disaster. 
                We realized that while there is already a big market for drones, there are none designed specifically for changing sizes. 
                A drone that could contract to navigate tight spaces and then expand to improve stability would fill a critical gap in search and rescue operations.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-[#2563eb]">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                The Design Process
              </h3>
              <p className="mb-4">
                We designed telescopic replacements in Fusion360, then brought
                them to life through 3D printing. This wasn&apos;t a
                straightforward process - multiple iterations were needed as we
                refined our design to optimize for weight, strength, and
                functionality.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-[#2563eb]">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                Technical Challenges
              </h3>
              <p className="mb-4">
                During testing, we faced a major setback when we accidentally
                burned the original flight controller. Rather than giving up, we
                migrated to a Pixhawk controller, rewrote our code, and
                meticulously re-tuned the PID parameters to accommodate our
                unique design.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-[#2563eb]">
              <h3 className="text-2xl font-semibold mb-2 text-white">
                Control System
              </h3>
              <p>
                The final control path we developed flows from a smartphone app,
                through Bluetooth to a CC256 receiver, then to an STM32
                microcontroller which drives H-bridges connected to linear
                actuators that extend and retract the drone&apos;s arms.
              </p>
            </div>

            <p className="italic text-[#2563eb] font-medium">
              "Yes, we literally had to put our arms back on after they fell
              off."
            </p>

            <p>
              What started as a challenging senior design project evolved into
              L.I.S.A. - a drone that demonstrates how adjustable geometry can
              open new possibilities in UAV technology. By extending its arms
              during flight, L.I.S.A. can increase its stability in windy
              conditions or improve its agility for precise maneuvers, all while
              in the air.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="/overview"
              className="btn-primary rounded-full px-8 py-4 text-lg inline-flex items-center gap-2"
            >
              <span>See Full Overview</span>
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
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 