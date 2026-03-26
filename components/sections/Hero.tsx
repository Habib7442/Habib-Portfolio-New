"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-[#FDFBF7] bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:32px_32px]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent z-0 pointer-events-none" />


      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-5 py-2 rounded-full border-2 border-black bg-white shadow-[4px_4px_0px_#000] w-fit sm:mx-auto"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e] border border-black"></span>
            </span>
            <span className="text-xs md:text-sm font-inter text-[#111] font-bold uppercase tracking-wider">
              Available for new projects
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[80px] lg:text-[110px] leading-[1] font-syne font-bold tracking-tight text-[#111] mb-2 break-normal px-2">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block drop-shadow-md text-center"
                >
                  I Build Digital
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#9333EA] italic px-2 drop-shadow-md text-center"
                >
                  Experiences.
                </motion.span>
              </div>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="font-mono text-sm md:text-base lg:text-lg text-[#444] font-bold uppercase tracking-widest max-w-2xl mt-4 flex justify-center items-center gap-2 flex-wrap"
          >
            <span className="inline-block px-3 py-1.5 bg-[#FDE047] border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">Full Stack Developer</span>
            <span className="hidden sm:inline mx-1 text-black">•</span>
            <span className="inline-block px-3 py-1.5 bg-[#67E8F9] border-2 border-black shadow-[2px_2px_0px_#000] rotate-[2deg]">Mobile App Developer</span>
            <span className="hidden sm:inline mx-1 text-black">•</span>
            <span className="inline-block px-3 py-1.5 bg-[#F472B6] border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">AI Designer</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full sm:w-auto"
          >
            <Link
              href="#projects"
              className="neo-btn text-lg w-full sm:w-auto group relative overflow-hidden text-center justify-center flex"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 w-full">View My Work <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></span>
            </Link>
            
            <Link
              href="#contact"
              className="group flex flex-row items-center justify-center gap-3 text-[#111] font-inter font-bold w-full sm:w-auto bg-[#67E8F9] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all px-8 py-3 text-lg"
            >
              Let's Talk
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
