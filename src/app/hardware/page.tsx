"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

// Hardware components data
const hardwareComponents = [
  {
    id: "controller",
    name: "STM32F407 Microcontroller",
    description:
      "The brain of our control system, the STM32F407 manages the arm extension and interfaces with the Bluetooth module. We chose this controller for its processing power, peripheral support, and reliable performance in embedded systems.",
    specs: [
      "ARM Cortex-M4 core with FPU",
      "168 MHz max CPU frequency",
      "1 MB Flash memory, 192 KB SRAM",
      "Multiple communication interfaces (UART, SPI, I2C)",
    ],
    image: "/media/STM32F411_pic.jpeg",
  },
  {
    id: "bluetooth",
    name: "TI CC2564 Bluetooth Module",
    description:
      "This Bluetooth module connects the drone to our custom smartphone app, allowing for remote control of the arm extension mechanism. The module provides reliable connectivity with low power consumption.",
    specs: [
      "Bluetooth 4.1 compliant",
      "Up to 30m range",
      "HCI UART interface",
      "Low power consumption",
    ],
    image: "/media/CC256_pic.jpeg",
  },
  {
    id: "hbridge",
    name: "Dual H-Bridges",
    description:
      "We implemented dual H-bridge motor drivers to control the linear actuators. These H-bridges allow us to precisely control the direction and speed of the actuators, which is crucial for smooth arm extension and retraction.",
    specs: [
      "L298N H-bridge motor driver",
      "Supports 5-35V operation",
      "Up to 2A current per channel",
      "Thermal protection",
    ],
    image: "/media/hbridge.jpg",
  },
  {
    id: "actuators",
    name: "Linear Actuators",
    description:
      "Custom-fitted linear actuators provide the mechanical force to extend and retract the drone's arms. We carefully selected these for their power-to-weight ratio and reliability in repeated operations.",
    specs: [
      "12V DC operation",
      "65mm stroke length",
      "500g push/pull force",
      "Compact form factor",
    ],
    image: "/media/Actuator_pic.jpeg",
  },
  {
    id: "pixhawk",
    name: "Pixhawk Flight Controller",
    description:
      "After our original flight controller failed, we migrated to the Pixhawk, which proved to be more robust and offered better integration with our custom hardware. The Pixhawk handles all flight stabilization and navigation functions.",
    specs: [
      "32-bit STM32F427 Cortex-M4 processor",
      "168 MHz CPU frequency",
      "256 KB RAM",
      "Multiple sensor inputs including 3D accelerometer and gyroscope",
    ],
    image: "/media/PixHawk_pic.jpeg",
  },
  {
    id: "pdb",
    name: "Custom Power Distribution Board",
    description:
      "We designed a custom PDB to efficiently distribute power from the battery to all electronic components. The board includes power filtering and protection circuits to ensure stable operation.",
    specs: [
      "Supports 3S-4S LiPo batteries",
      "Current monitoring",
      "Integrated voltage regulators",
      "Short circuit protection",
    ],
    image: "/media/pdb.jpg",
  },
  {
    id: "battery",
    name: "Li-Po Battery",
    description:
      "A high-capacity lithium polymer battery powers the entire system. We selected a battery that balances weight with flight time to provide optimal performance.",
    specs: [
      "4S 5000mAh",
      "14.8V nominal voltage",
      "50C discharge rate",
      "240g weight",
    ],
    image: "/media/battery.jpg",
  },
];

export default function Hardware() {
  const [activeComponent, setActiveComponent] = useState(hardwareComponents[0].id);
  const componentsRef = useRef(null);
  const isComponentsInView = useInView(componentsRef, { once: true, amount: 0.1 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hardware Components</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            A detailed look at the components that make L.I.S.A.'s telescopic arm system possible.
          </p>
        </div>
      </div>

      {/* Bill of Materials Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={componentsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isComponentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Bill of Materials</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Component Navigation */}
              <div className="lg:col-span-1">
                <Card className="p-4 sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">Components</h3>
                  <ul className="space-y-2">
                    {hardwareComponents.map((component, index) => (
                      <motion.li
                        key={component.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isComponentsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <button
                          onClick={() => setActiveComponent(component.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            activeComponent === component.id
                              ? "bg-[#2563eb] text-white"
                              : "hover:bg-[#252525] text-gray-300"
                          }`}
                        >
                          {component.name}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Component Details */}
              <div className="lg:col-span-2">
                <Accordion type="single" collapsible className="w-full">
                  {hardwareComponents.map((component) => (
                    <AccordionItem
                      key={component.id}
                      value={component.id}
                      className={`mb-4 rounded-2xl overflow-hidden ${
                        activeComponent === component.id ? "border border-[#2563eb] shadow-lg" : "border border-gray-800"
                      }`}
                    >
                      <AccordionTrigger
                        className={`px-6 py-4 hover:no-underline ${
                          activeComponent === component.id ? "bg-[#2563eb]/10" : ""
                        }`}
                        onClick={() => setActiveComponent(component.id)}
                      >
                        <span className="text-xl font-medium">{component.name}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3 flex justify-center">
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/20">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
                              <Image
                                src={component.image}
                                alt={component.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain p-2"
                                priority
                              />
                            </div>
                          </div>
                          <div className="md:w-2/3">
                            <p className="text-gray-300 mb-4">{component.description}</p>
                            <h4 className="text-lg font-semibold mb-2">Specifications:</h4>
                            <ul className="list-disc pl-5 text-gray-300 space-y-1">
                              {component.specs.map((spec, index) => (
                                <li key={index}>{spec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">System Integration</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            All components work together to create a seamless system where arm extension can be
            controlled during flight without affecting stability.
          </p>
          <div className="flex justify-center">
            <Image
              src="/media/system-diagram.jpg"
              alt="System Integration Diagram"
              width={800}
              height={450}
              className="rounded-xl shadow-lg"
            />
          </div>
          <p className="mt-8 text-gray-400 italic">
            "The most challenging part was ensuring stable power delivery across different operational modes."
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Learn About the Software</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how we programmed the controller and implemented the control algorithms.
          </p>
          <a href="/software" className="btn-primary">
            Explore Software Architecture
          </a>
        </div>
      </section>
    </div>
  );
} 