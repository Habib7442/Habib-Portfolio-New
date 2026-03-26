"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const skillsMap = [
  {
    category: "Frontend",
    color: "bg-[#FDE047]",
    items: [
      { name: "React", hoverColor: "hover:bg-[#61DAFB]" },
      { name: "Next.js", hoverColor: "hover:bg-[#E2E8F0]" },
      { name: "TypeScript", hoverColor: "hover:bg-[#67E8F9]" },
      { name: "Tailwind CSS", hoverColor: "hover:bg-[#BBF7D0]" },
      { name: "Framer Motion", hoverColor: "hover:bg-[#F472B6]" },
    ],
  },
  {
    category: "Mobile",
    color: "bg-[#67E8F9]",
    items: [
      { name: "React Native", hoverColor: "hover:bg-[#61DAFB]" },
      { name: "Expo", hoverColor: "hover:bg-[#E2E8F0]" },
    ],
  },
  {
    category: "Backend",
    color: "bg-[#F472B6]",
    items: [
      { name: "Node.js", hoverColor: "hover:bg-[#BBF7D0]" },
      { name: "PostgreSQL", hoverColor: "hover:bg-[#67E8F9]" },
      { name: "Supabase", hoverColor: "hover:bg-[#BBF7D0]" },
      { name: "Firebase", hoverColor: "hover:bg-[#FDE047]" },
    ],
  },
  {
    category: "Tools",
    color: "bg-[#C084FC]",
    items: [
      { name: "Git", hoverColor: "hover:bg-[#F472B6]" },
      { name: "Docker", hoverColor: "hover:bg-[#67E8F9]" },
      { name: "Figma", hoverColor: "hover:bg-[#FDE047]" },
      { name: "Vercel", hoverColor: "hover:bg-[#E2E8F0]" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section id="skills" className="py-32 bg-[#FDFBF7] relative z-20 border-t-2 border-black" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-20"
        >
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-7xl font-syne font-bold text-[#111] mb-2 drop-shadow-[4px_4px_0px_#C084FC] relative z-10">
              My Arsenal
            </h2>
          </div>
          <div className="w-32 h-[6px] bg-[#111] mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillsMap.map((categoryGroup, index) => (
            <motion.div
              key={categoryGroup.category}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`flex flex-col items-start p-6 bg-white border-3 border-black shadow-[8px_8px_0px_#111] rounded-2xl relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 ${categoryGroup.color} border-l-4 border-b-4 border-black rounded-bl-full`}></div>
              
              <motion.h3
                variants={itemVariants}
                className="font-syne text-2xl font-bold text-[#111] mb-8 relative z-10 uppercase tracking-tighter"
              >
                {categoryGroup.category}
              </motion.h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {categoryGroup.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className={`px-4 py-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-[#111] font-mono text-xs md:text-sm font-bold cursor-default transition-all duration-300 ${skill.hoverColor} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]`}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
