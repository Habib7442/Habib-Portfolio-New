"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Designs({ designs }: { designs: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!designs || designs.length === 0) return null;

  // Limit to 6 items for the home page showcase
  const displayDesigns = designs.slice(0, 6);

  return (
    <section
      id="designs"
      ref={ref}
      className="bg-bg py-24 lg:py-32 border-t border-border"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-6"
            >
              03 / VISUAL & BRANDING
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg leading-[1.1] italic text-fg"
            >
              Exploring the intersection of brand identity and AI design.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/work" className="group flex items-center gap-3 text-sm font-medium text-fg-muted hover:text-fg transition-colors">
              VIEW BRAND ARCHIVE <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayDesigns.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-bg-muted border border-border rounded-sm mb-6">
                <img
                  src={design.image_url}
                  alt={design.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                {design.category && (
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase bg-bg/90 backdrop-blur-md text-fg px-2 py-1 rounded-sm border border-border">
                      {design.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-display italic text-2xl text-fg leading-tight">
                  {design.title}
                </h3>
                {design.description && (
                  <p className="text-sm text-fg-subtle line-clamp-2">
                    {design.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
