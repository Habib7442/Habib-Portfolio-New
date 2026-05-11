"use client";

import { motion } from "framer-motion";

const technologies = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "REACT NATIVE",
  "NODE.JS",
  "SUPABASE",
  "POSTGRESQL",
  "TAILWIND CSS",
  "EXPO",
  "GSAP",
  "FRAMER MOTION"
];

export default function Marquee() {
  return (
    <div className="relative w-full py-8 overflow-hidden bg-bg border-y border-border z-20">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex items-center w-[200%] gap-12 whitespace-nowrap"
      >
        {[...technologies, ...technologies].map((tech, i) => (
          <div key={`${tech}-${i}`} className="flex items-center gap-12 group">
            <span className="text-sm font-mono font-bold tracking-[0.3em] text-fg-subtle hover:text-accent transition-colors duration-500">
              {tech}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
