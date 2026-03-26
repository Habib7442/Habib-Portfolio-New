"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / value));
      const timer = setInterval(() => {
        start += 1;
        setCurrent(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{current}</span>;
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const statColors = ["bg-[#F472B6]", "bg-[#67E8F9]", "bg-[#FDE047]", "bg-[#BBF7D0]"];

  return (
    <section id="about" className="py-32 bg-[#FDFBF7] relative z-10 border-t-2 border-black" ref={sectionRef}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-block">
               <span className="px-4 py-2 bg-[#FDE047] border-2 border-black shadow-[4px_4px_0px_#000] font-mono text-sm font-bold uppercase tracking-widest text-[#111] rotate-[-2deg] inline-block">
                 About Me
               </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-syne font-bold mb-8 text-[#111] leading-tight">
              Building things <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#06B6D4] filter drop-shadow-[2px_2px_0px_#111]">
                that matter.
              </span>
            </h2>
            <p className="text-[#444] text-lg md:text-xl font-inter leading-relaxed mb-12 max-w-lg font-medium">
              I'm a full stack developer who obsesses over the gap between good
              enough and exceptional. From scalable web platforms to polished
              mobile apps, I build products that work beautifully and feel even
              better. Every pixel and line of code is an opportunity to craft a
              category-defining digital experience.
            </p>

            {/* Neo Brutalism Decorative Box */}
            <div className="relative w-full aspect-video border-4 border-black rounded-2xl bg-[#C084FC] overflow-hidden group shadow-[8px_8px_0px_#111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_#111] transition-all flex items-center justify-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#67E8F9] border-l-4 border-b-4 border-black rounded-bl-full opacity-80 rotate-[-15deg] translate-x-10 -translate-y-10 group-hover:rotate-0 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FDE047] border-r-4 border-t-4 border-black rounded-tr-full opacity-80 translate-y-10 -translate-x-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-100"></div>
               <div className="z-10 font-syne font-bold text-3xl md:text-5xl text-white drop-shadow-[4px_4px_0px_#111] tracking-tighter mix-blend-overlay">
                 DESIGN X CODE
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {[
              { label: "Projects", value: 20, suffix: "+" },
              { label: "GitHub Repos", value: 62, suffix: "" },
              { label: "Years Experience", value: 3, suffix: "+" },
              { label: "Technologies", value: 15, suffix: "+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className={`relative flex flex-col items-start justify-center p-8 border-3 border-black rounded-2xl ${statColors[i]} shadow-[6px_6px_0px_#111] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_#111] transition-all duration-200 z-10`}
              >
                <h3 className="text-5xl md:text-6xl font-syne font-bold text-[#111] mb-2 tracking-tighter w-full drop-shadow-[2px_2px_0px_#fff]">
                  <AnimatedCounter value={stat.value} duration={2} />
                  <span className="text-[#111] ml-1">{stat.suffix}</span>
                </h3>
                <p className="font-mono text-sm md:text-base text-[#111] uppercase tracking-wider font-bold bg-white px-2 py-1 border-2 border-black rotate-[-1deg] inline-block mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
