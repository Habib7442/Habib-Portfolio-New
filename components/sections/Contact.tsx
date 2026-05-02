"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      className="bg-[#FAFAF7] dark:bg-[#0E0E0C] relative z-20 border-t border-[#E1DED5] dark:border-[#2D2C28]"
      ref={ref}
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "64px",
        paddingBottom: "40px",
      }}
    >
      <div className="container-editorial flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="eyebrow">06 / Contact</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-display italic mb-6" style={{ color: "var(--fg)" }}>
            Let's talk.
          </h2>
          
          <a 
            href="mailto:habibtanwir1906@gmail.com" 
            className="block text-2xl sm:text-4xl md:text-5xl font-display italic transition-colors hover:text-[var(--accent)] break-all"
            style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
          >
            habibtanwir1906@gmail.com
          </a>

          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href="https://wa.me/919707370886?text=Hi%20Habib,%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[var(--accent)] text-white font-medium transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
              style={{ borderRadius: "2px", boxShadow: "var(--shadow-lg)" }}
            >
              <span>Book on WhatsApp</span>
              <span className="text-xl">→</span>
            </a>
            
            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Open to senior IC roles, founding-engineer opportunities, and selected freelance projects.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
