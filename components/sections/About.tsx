"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-[#FAFAF7] dark:bg-[#0E0E0C] relative z-10 border-t border-[#E1DED5] dark:border-[#2D2C28]"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="eyebrow">04 / About</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/5] bg-[#F2F1EC] dark:bg-[#1E1D1A] overflow-hidden group"
            style={{ borderRadius: "4px", border: "1px solid var(--border-color)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/habib.png" 
              alt="Habib Tanwir" 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.02]"
            />
            <div className="grain-overlay opacity-[0.08] pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-display italic leading-tight" style={{ color: "var(--fg)" }}>
              Engineering products with <br /> an editorial eye.
            </h2>

            <div className="flex flex-col gap-6 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                For the past two years, I’ve specialized in building high-performance AI-powered SaaS and scalable systems. My work focuses on bridging the gap between sophisticated engineering and intentional, minimalist design. 
              </p>
              <p>
                I operate at the intersection of TypeScript, Next.js, and Supabase, building products like IntegratePDF — a Voice-AI orchestration platform designed for high-density information environments. To me, both engineering and design are exercises in restraint — the art of knowing exactly what to leave out.
              </p>
            </div>

            {/* Meta Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 pt-8 border-t border-[var(--border-color)]">
              <div className="flex flex-col gap-1">
                <p className="eyebrow" style={{ fontSize: "10px" }}>Current Focus</p>
                <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>AI Orchestration & SaaS Architecture</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="eyebrow" style={{ fontSize: "10px" }}>Availability</p>
                <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>Open for Select Senior Roles</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="eyebrow" style={{ fontSize: "10px" }}>Core Stack</p>
                <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>TypeScript · Next.js · Supabase · React Native</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="eyebrow" style={{ fontSize: "10px" }}>Elsewhere</p>
                <div className="flex gap-3 text-sm font-medium" style={{ color: "var(--fg)" }}>
                  <a href="https://github.com/Habib7442" className="hover:text-[var(--accent)] transition-colors">GH</a>
                  <a href="https://linkedin.com/in/habib-tanwir" className="hover:text-[var(--accent)] transition-colors">LI</a>
                  <a href="https://x.com/TanwirHabib" className="hover:text-[var(--accent)] transition-colors">X</a>
                  <a href="mailto:habibtanwir1906@gmail.com" className="hover:text-[var(--accent)] transition-colors">Email</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
