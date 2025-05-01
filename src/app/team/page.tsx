"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Ishaan Singh",
    role: "Electrical & Software Designer",
    bio: "Ishaan spearheaded the electrical and software design of the telescopic arm system. He spent countless hours in the lab iterating on the design and testing different configurations.",
    funFact: "Once fixed a drone mid-flight by throwing a screwdriver to a teammate.",
    image: "/media/team-alex.jpg",
  },
  {
    id: 2,
    name: "Leonardo Torres",
    role: "Electronics & Power Systems",
    bio: "Leonardo integrated the electronic components. He implemented the PID controllers. His expertise in circuit design was crucial for creating a reliable control system.",
    funFact: "Can solder components upside down while listening to death metal.",
    image: "/media/team-jamie.jpg",
  },
  {
    id: 3,
    name: "Andres Gene",
    role: "Software & Control Systems",
    bio: "Andres developed design for the arms that allow for stable flight with telescopic arms.",
    funFact: "Debugged the presentation at 3 AM before the final presentation.",
    image: "/media/team-marcus.jpg",
  },
  {
    id: 4,
    name: "Sean Ein",
    role: "Structural Analysis & Testing",
    bio: "Sean conducted structural analysis and led the testing phase. His methodical approach to testing ensured that the final design met all performance requirements.",
    funFact: "Has a collection of drone parts from every project he's ever crashed.",
    image: "/media/team-sophia.jpg",
  },
  {
    id: 5,
    name: "Dr. Ziqian (Cecilia) Dong",
    role: "Faculty Advisor",
    bio: "Dr. Dong provided guidance and expertise throughout the project. Her background in aerospace engineering and control systems helped the team overcome numerous challenges.",
    funFact: "Once worked on Motorized walker to improve gaits for patients with Parkinson's Disease.",
    image: "/media/team-elizabeth.jpg",
  },
];

export default function Team() {
  const teamRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.1 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            The talented engineers behind L.I.S.A.'s innovative telescopic arm drone system.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10 text-center">The L.I.S.A. Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden rounded-2xl h-full flex flex-col">
                    <div className="relative h-64">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-[#2563eb] mb-4">{member.role}</p>
                      <p className="text-gray-300 mb-4">{member.bio}</p>
                      <div className="mt-auto pt-4 border-t border-gray-800">
                        <p className="text-sm italic text-gray-400">
                          <span className="font-semibold text-white">Fun Fact:</span> {member.funFact}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Philosophy Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 mb-8">
              We believe in pushing the boundaries of what's possible with drone technology.
              Our team combines diverse expertise to tackle complex engineering challenges.
            </p>
            <div className="flex flex-col md:flex-row gap-6 text-left">
              <div className="flex-1 bg-[#252525] p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Interdisciplinary Approach</h3>
                <p className="text-gray-300">
                  By combining mechanical, electrical, and software engineering expertise,
                  we were able to create a truly innovative solution that addresses multiple
                  aspects of drone performance.
                </p>
              </div>
              <div className="flex-1 bg-[#252525] p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Iterative Design</h3>
                <p className="text-gray-300">
                  We embraced an iterative design process, with each team member contributing
                  to multiple design cycles. This approach allowed us to rapidly improve our
                  prototype and overcome challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgments Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Acknowledgments</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-300 mb-8">
              We would like to thank the following individuals and organizations for their support:
            </p>
            <ul className="space-y-4 text-left">
              <li className="bg-[#252525] p-4 rounded-lg">
                <span className="font-semibold">Department of Mechanical Engineering</span> - 
                For providing lab space and equipment for testing.
              </li>
              <li className="bg-[#252525] p-4 rounded-lg">
                <span className="font-semibold">Advanced Materials Lab</span> - 
                For assistance with 3D printing specialized components.
              </li>
              <li className="bg-[#252525] p-4 rounded-lg">
                <span className="font-semibold">Dr. Robert Chen</span> - 
                For technical guidance on control systems.
              </li>
              <li className="bg-[#252525] p-4 rounded-lg">
                <span className="font-semibold">Industry Partner: AeroDynamics Inc.</span> - 
                For providing components and technical advice.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Download Project Resources</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access our design files, firmware, and project documentation.
          </p>
          <a href="/resources" className="btn-primary">
            View Resources
          </a>
        </div>
      </section>
    </div>
  );
} 