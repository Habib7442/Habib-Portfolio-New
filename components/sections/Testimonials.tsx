"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
      className="py-24 md:py-32 border-t border-[var(--border-color)]"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="eyebrow mb-6">06 / Kind Words</p>
          <h2 className="text-display-lg font-display italic leading-tight" style={{ color: "var(--fg)" }}>
            Trust & Collaborative Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[10px]" style={{ color: "var(--accent)" }}>★</span>
                ))}
              </div>

              {/* Review */}
              <blockquote className="relative">
                <span className="absolute -top-6 -left-4 text-6xl font-serif opacity-10 pointer-events-none" style={{ color: "var(--fg)" }}>"</span>
                <p className="text-xl leading-relaxed italic font-display" style={{ color: "var(--fg-muted)" }}>
                  {testimonial.review}
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                {testimonial.avatar_url ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)]">
                    <img src={testimonial.avatar_url} alt={testimonial.client_name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center">
                    <span className="eyebrow" style={{ fontSize: "10px" }}>{testimonial.client_name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <cite className="not-italic font-medium text-sm" style={{ color: "var(--fg)" }}>{testimonial.client_name}</cite>
                  {(testimonial.role || testimonial.company) && (
                    <span className="text-xs uppercase tracking-wider" style={{ color: "var(--fg-subtle)", fontSize: "9px" }}>
                      {testimonial.role}{testimonial.company ? ` @ ${testimonial.company}` : ''}
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
