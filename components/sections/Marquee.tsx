"use client";

import { motion } from "framer-motion";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Expo",
];

export default function Marquee() {
  return (
    <div className="relative w-full py-6 overflow-hidden bg-[#FDE047] border-y-4 border-black z-20 shadow-[0_8px_0px_rgba(0,0,0,1)]">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FDE047] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FDE047] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex items-center w-[200%] gap-8 pl-8"
      >
        {[...technologies, ...technologies, ...technologies].map((tech, i) => (
          <div key={`${tech}-${i}`} className="flex items-center gap-8 group">
            <span className="text-2xl sm:text-4xl font-syne font-bold text-[#111] uppercase tracking-tighter drop-shadow-[2px_2px_0px_#fff]">
              {tech}
            </span>
            <span className="text-3xl font-bold text-[#111] animate-spin-slow">*</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
