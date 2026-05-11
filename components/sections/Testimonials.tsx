"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  client_name: string;
  role?: string;
  company?: string;
  review: string;
  rating: number;
  avatar_url?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section 
      id="testimonials"
      ref={sectionRef}
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
              06 / TRUST & TESTIMONY
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg leading-[1.1] italic text-fg"
            >
              Kind words from founders and <br className="hidden md:block" /> product leaders.
            </motion.h2>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-10 p-8 lg:p-12 bg-bg-subtle/30 border border-border rounded-sm relative"
            >
              {/* Quote Mark (Subtle) */}
              <span className="absolute top-8 left-8 text-6xl font-display italic text-accent/10 pointer-events-none">
                &ldquo;
              </span>

              {/* Review Text */}
              <blockquote className="relative z-10">
                <p className="text-text-xl leading-relaxed italic font-display text-fg-muted">
                  {testimonial.review}
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-5 mt-auto pt-8 border-t border-border/50">
                {testimonial.avatar_url ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src={testimonial.avatar_url} 
                      alt={testimonial.client_name} 
                      width={48}
                      height={48}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-bg-muted border border-border flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold text-fg-subtle">
                      {testimonial.client_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <cite className="not-italic font-display italic text-lg text-fg tracking-tight">
                    {testimonial.client_name}
                  </cite>
                  {(testimonial.role || testimonial.company) && (
                    <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-fg-subtle uppercase">
                      {testimonial.role}{testimonial.company ? ` / ${testimonial.company}` : ''}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
