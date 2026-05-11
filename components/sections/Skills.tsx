"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillsMap = [
  {
    category: "FRONTEND SYSTEMS",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "MOBILE STACK",
    items: ["React Native", "Expo", "Mobile UX"],
  },
  {
    category: "BACKEND & INFRA",
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    category: "DESIGN & IDENTITY",
    items: ["Figma", "Branding", "Generative AI", "AI Prompting", "Motion Design"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="bg-bg py-24 lg:py-32 border-t border-border"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6"
          >
            08 / TECHNICAL ARSENAL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-display-lg leading-[1.1] italic text-fg"
          >
            Building with a focus on speed, <br className="hidden md:block" /> scalability, and visual precision.
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {skillsMap.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + groupIndex * 0.1, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="flex flex-col gap-8"
            >
              <h3 className="font-mono text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
                {group.category}
              </h3>
              
              <ul className="flex flex-col gap-4">
                {group.items.map((skill, i) => (
                  <li 
                    key={skill}
                    className="group flex items-center gap-3 text-lg font-display italic text-fg-muted hover:text-fg transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
