"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { FileDown, Github, Code, File, FileText, FileImage } from "lucide-react";

// Resource data
const resources = [
  {
    id: "cad-files",
    title: "CAD Files",
    description: "Download the 3D models of our telescopic arm design in various formats.",
    icon: FileImage,
    items: [
      { name: "Telescopic Arm Assembly.STEP", size: "12.4 MB", path: "/files/arm_assembly.step" },
      { name: "Motor Mount.STEP", size: "2.8 MB", path: "/files/motor_mount.step" },
      { name: "Actuator Housing.STEP", size: "3.6 MB", path: "/files/actuator_housing.step" },
      { name: "Complete Drone Assembly.STEP", size: "28.2 MB", path: "/files/drone_assembly.step" },
    ],
  },
  {
    id: "stl-files",
    title: "3D Printing Files",
    description: "Ready-to-print STL files for all 3D-printed components.",
    icon: FileDown,
    items: [
      { name: "Arm Outer Shell.STL", size: "5.3 MB", path: "/files/arm_outer.stl" },
      { name: "Arm Inner Rail.STL", size: "3.7 MB", path: "/files/arm_inner.stl" },
      { name: "Motor Mount.STL", size: "2.2 MB", path: "/files/motor_mount.stl" },
      { name: "Actuator Bracket.STL", size: "1.8 MB", path: "/files/actuator_bracket.stl" },
      { name: "Electronics Housing.STL", size: "4.5 MB", path: "/files/electronics_housing.stl" },
    ],
  },
  {
    id: "firmware",
    title: "Firmware Code",
    description: "Source code for the STM32 microcontroller and Bluetooth communication.",
    icon: Code,
    items: [
      { name: "STM32 Firmware (v1.2.3)", size: "856 KB", path: "/files/stm32_firmware_v1.2.3.zip" },
      { name: "Bluetooth Module Code", size: "342 KB", path: "/files/bluetooth_code.zip" },
      { name: "Arm Control Library", size: "210 KB", path: "/files/arm_control_lib.zip" },
      { name: "PID Configuration Files", size: "124 KB", path: "/files/pid_config.zip" },
    ],
  },
  {
    id: "schematics",
    title: "Electrical Schematics",
    description: "Circuit diagrams and PCB designs for the control system.",
    icon: File,
    items: [
      { name: "Control Board Schematic", size: "2.1 MB", path: "/files/control_board_schematic.pdf" },
      { name: "Power Distribution Board", size: "1.8 MB", path: "/files/pdb_schematic.pdf" },
      { name: "Actuator Driver Circuit", size: "1.2 MB", path: "/files/actuator_driver.pdf" },
      { name: "Component Interconnect Diagram", size: "3.4 MB", path: "/files/interconnect.pdf" },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Project reports, presentations, and technical documentation.",
    icon: FileText,
    items: [
      { name: "Final Project Report", size: "4.8 MB", path: "/files/final_report.pdf" },
      { name: "Presentation Slides", size: "6.2 MB", path: "/files/presentation.pdf" },
      { name: "Testing Protocol Document", size: "2.1 MB", path: "/files/testing_protocol.pdf" },
      { name: "Bill of Materials", size: "1.3 MB", path: "/files/bom.pdf" },
      { name: "Assembly Instructions", size: "5.7 MB", path: "/files/assembly_guide.pdf" },
    ],
  },
];

export default function Resources() {
  const resourcesRef = useRef(null);
  const isResourcesInView = useInView(resourcesRef, { once: true, amount: 0.1 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Download files and documentation from the L.I.S.A. telescopic arm drone project.
          </p>
        </div>
      </div>

      {/* Resources Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={resourcesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isResourcesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Available Downloads</h2>
            
            <div className="space-y-12">
              {resources.map((resource, resourceIndex) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isResourcesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: resourceIndex * 0.1 }}
                >
                  <Card className="p-6 bg-[#252525] rounded-2xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <resource.icon className="w-6 h-6 text-[#2563eb] mr-3" />
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{resource.description}</p>
                    
                    <div className="space-y-3">
                      {resource.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isResourcesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: (resourceIndex * 0.1) + (itemIndex * 0.05) }}
                          className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded-lg hover:bg-[#1e1e1e]/80 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileDown className="w-5 h-5 text-gray-400 mr-3" />
                            <span>{item.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 text-sm mr-4">{item.size}</span>
                            <a
                              href={item.path}
                              download
                              className="text-[#2563eb] hover:text-[#1d4ed8] flex items-center"
                            >
                              <span className="text-sm mr-1">Download</span>
                              <FileDown className="w-4 h-4" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GitHub Repository Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">GitHub Repository</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Access our complete codebase, including firmware, app code, and documentation.
          </p>
          <a
            href="https://github.com/lisa-drone-project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-8 py-4 rounded-lg hover:bg-[#1d4ed8] transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
          <p className="mt-6 text-gray-400 text-sm">
            Please refer to the README in each repository for specific usage instructions.
          </p>
        </div>
      </section>

      {/* License Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Usage License</h2>
          <Card className="p-6 bg-[#252525] rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">NYIT License</h3>
            <p className="text-gray-300 mb-4">
              Copyright (c) 2023 L.I.S.A. Project Team
            </p>
            <p className="text-gray-300 mb-4">
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p className="text-gray-300 mb-4">
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </p>
            <p className="text-gray-300">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            If you have questions about using these resources or would like to collaborate with our team.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
} 