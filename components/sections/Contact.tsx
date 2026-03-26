"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contact" className="py-32 bg-[#BBF7D0] relative z-20 border-t-2 border-black" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-4xl max-w-[90%] relative"
        >
          {/* Decorative SVG/Elements behind title */}
          <div className="absolute -top-10 -left-10 md:-left-20 w-24 h-24 bg-[#FDE047] border-3 border-black rounded-full shadow-[4px_4px_0px_#000] flex items-center justify-center text-4xl rotate-[-15deg] z-0">
            👋
          </div>
          <div className="absolute top-10 -right-10 md:-right-20 w-16 h-16 bg-[#F472B6] border-3 border-black shadow-[4px_4px_0px_#000] rotate-[15deg] z-0 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">*</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-syne font-bold text-[#111] mb-6 leading-tight tracking-tighter relative z-10 drop-shadow-[4px_4px_0px_#fff]">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#06B6D4] stroke-black drop-shadow-[2px_2px_0px_#111]">Something</span> Incredible.
          </h2>
          <p className="font-mono text-sm md:text-base text-[#111] bg-white border-2 border-black shadow-[2px_2px_0px_#000] inline-block px-4 py-2 uppercase tracking-widest mb-16 font-bold rotate-[1deg]">
            I'm open to freelance, full-time, and collaboration opportunities.
          </p>

          <a 
            href="mailto:habibtanwir1906@gmail.com" 
            className="block mb-16 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-syne font-bold text-[#111] hover:text-[#9333EA] transition-colors break-all w-full px-4 drop-shadow-[2px_2px_0px_#fff]"
          >
            habibtanwir1906@gmail.com
          </a>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="flex items-center gap-8 mt-24"
        >
          {[
            { icon: <Github size={28} />, href: "https://github.com/Habib7442", label: "GitHub", color: "bg-[#FDE047]" },
            { icon: <Linkedin size={28} />, href: "https://linkedin.com/in/habib-tanwir", label: "LinkedIn", color: "bg-[#67E8F9]" },
            { icon: <Twitter size={28} />, href: "https://x.com/TanwirHabib", label: "Twitter", color: "bg-[#F472B6]" },
          ].map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-16 h-16 rounded-full border-3 border-black shadow-[4px_4px_0px_#111] flex items-center justify-center text-[#111] bg-white hover:${social.color} hover:-translate-y-2 hover:shadow-[6px_6px_0px_#111] transition-all duration-300 z-10`}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
