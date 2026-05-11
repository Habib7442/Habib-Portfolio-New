"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const metaData = [
    { label: "CURRENT FOCUS", value: "AI Orchestration & SaaS Architecture" },
    { label: "AVAILABILITY", value: "Open for Select Senior Roles" },
    { label: "CORE STACK", value: "TypeScript · Next.js · Supabase · React Native" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-bg py-24 lg:py-32 border-t border-border overflow-hidden"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-24"
        >
          <p className="eyebrow">04 / ABOUT THE MANIFESTO</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/5] bg-bg-muted overflow-hidden border border-border rounded-sm group"
          >
            <img 
              src="/habib.png" 
              alt="Habib Tanwir" 
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-[1.03]"
            />
            {/* Subtle grain overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 lg:gap-12"
          >
            <h2 className="text-display-lg font-display italic leading-[1.1] text-fg">
              Engineering digital products <br className="hidden md:block" /> with an editorial eye.
            </h2>

            <div className="flex flex-col gap-8 text-text-xl leading-relaxed text-fg-muted">
              <p>
                I specialize in architecting high-performance AI-powered SaaS and scalable brand systems. My work focuses on bridging the gap between sophisticated full-stack engineering and intentional, minimalist design. 
              </p>
              <p>
                As a Founder and Lead Engineer at Flerid Technologies, I build products like IntegratePDF — a Voice-AI orchestration platform designed for high-density information environments. To me, both engineering and design are exercises in restraint — the art of knowing exactly what to leave out.
              </p>
            </div>

            {/* Meta Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 pt-12 border-t border-border mt-4">
              {metaData.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-fg-subtle uppercase">{item.label}</p>
                  <p className="text-sm font-medium text-fg">{item.value}</p>
                </div>
              ))}
              
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-fg-subtle uppercase">ELSEWHERE</p>
                <div className="flex gap-4 text-sm font-medium text-fg">
                  <a href="https://github.com/Habib7442" className="hover:text-accent transition-colors">GITHUB</a>
                  <a href="https://linkedin.com/in/habib-tanwir" className="hover:text-accent transition-colors">LINKEDIN</a>
                  <a href="https://x.com/TanwirHabib" className="hover:text-accent transition-colors">X</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
