"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const fullText = "Initializing Portfolio...";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] text-white"
        >
          {/* Grain on top of preloader */}
          <div className="grain-overlay opacity-[0.03] mix-blend-overlay" />

          {/* Clean Logo Reveal */}
          <div className="relative mb-12 overflow-hidden h-[120px] md:h-[180px] flex items-center justify-center">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
              }}
              className="text-8xl md:text-[160px] font-syne font-bold tracking-tighter text-white"
            >
              HT
            </motion.h1>
            {/* Subtle light sweep */}
            <motion.div 
               initial={{ left: "-100%" }}
               animate={{ left: "100%" }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent skew-x-[-20deg]"
            />
          </div>

          {/* Typing Text */}
          <div className="flex items-center gap-1">
            <p className="font-mono text-xs md:text-sm tracking-widest text-[#A1A1AA] uppercase">
              {text}
            </p>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[6px] h-[14px] bg-[#7C3AED]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
