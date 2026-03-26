"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Designs({ designs }: { designs: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!designs || designs.length === 0) return null;

  return (
    <section id="designs" className="py-24 bg-[#FDFBF7] relative z-20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 mb-12 flex items-center justify-between">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-6xl font-syne font-bold text-[#111] uppercase tracking-tighter">
              Visual Design
            </h2>
            <div className="h-10 w-10 md:h-14 md:w-14 bg-[#F472B6] rounded-full border-2 border-black shadow-[2px_2px_0px_#000] rotate-12 flex items-center justify-center">
              <span className="text-xl md:text-2xl">✨</span>
            </div>
          </div>
          <p className="font-mono text-sm md:text-base text-[#555] uppercase tracking-widest max-w-xl">
            Selected branding, UI/UX, and AI compositing works. Drag to explore.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="ml-6 md:ml-12 cursor-grab active:cursor-grabbing"
      >
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={true}
          mousewheel={{
            forceToAxis: true,
          }}
          className="!overflow-visible"
        >
          {designs.slice(0, 20).map((design, idx) => (
            <SwiperSlide key={design.id} className="!w-[280px] md:!w-[400px]">
              <div className="group flex flex-col gap-4">
                <div className="w-full aspect-[4/5] bg-white neo-brutalism overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={design.image_url} 
                    alt={design.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {design.category && (
                      <span className="px-3 py-1 bg-[#FDE047] text-[#111] font-mono text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000]">
                        {design.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 pr-4">
                  <h3 className="font-syne font-bold text-xl md:text-2xl text-[#111] leading-tight">
                    {design.title}
                  </h3>
                  <p className="font-inter text-sm text-[#555] line-clamp-2">
                    {design.description || "Experimental visual design and art direction."}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
