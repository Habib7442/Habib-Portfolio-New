"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero({ featuredProject }: { featuredProject?: any }) {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden border-b border-[var(--border-color)]"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "140px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-24 items-end">
          {/* Left Column: Primary Content */}
          <div className="flex-1">
            {/* Eyebrow — mono, subtle */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-8"
            >
              <p className="eyebrow">01 / Currently building IntegratePDF</p>
            </motion.div>

            {/* Headline — Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-display italic leading-none mb-10"
              style={{
                fontSize: "clamp(4.5rem, 10vw, 7.5rem)",
                letterSpacing: "-0.03em",
                marginLeft: "-0.05em",
                color: "var(--fg)",
              }}
            >
              Habib Tanwir
            </motion.h1>

            {/* Positioning Paragraph — Increased width for cinematic feel */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="max-w-4xl mb-12"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                lineHeight: "1.5",
                color: "var(--fg-muted)",
              }}
            >
              Engineer &amp; designer. I build AI-powered SaaS
              products and the brand identity they ship with.
              Currently focused on architecture and high-performance interfaces.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 md:gap-10 pt-4"
            >
              <a
                href="https://wa.me/919707370886?text=Hi%20Habib,%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[var(--accent)] text-white font-medium transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderRadius: "2px", boxShadow: "var(--shadow-md)" }}
              >
                Book Now
              </a>
              
              <div className="flex items-center gap-8">
                <Link href="/work" className="arrow-link">
                  <span style={{ color: "var(--accent)" }}>→</span> See work
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Project Preview (Large devices only) */}
          {featuredProject && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="hidden lg:flex flex-col gap-6"
            >
              <div className="space-y-1">
                <p className="eyebrow" style={{ fontSize: "10px" }}>Latest Release</p>
                <h3 className="font-display italic text-2xl" style={{ color: "var(--fg)" }}>
                  {featuredProject.title}
                </h3>
              </div>
              
              <div 
                className="relative aspect-[4/3] bg-[var(--bg-muted)] overflow-hidden group"
                style={{ border: "1px solid var(--border-color)", borderRadius: "4px" }}
              >
                {(featuredProject.thumbnail_url || featuredProject.image_url) ? (
                  <img 
                    src={featuredProject.thumbnail_url || featuredProject.image_url} 
                    alt={featuredProject.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center italic text-xs text-[var(--fg-muted)]">
                    Project Preview
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-40" />
              </div>

              <div className="pt-2">
                <Link 
                  href={featuredProject.live_url || "#work"} 
                  target={featuredProject.live_url ? "_blank" : "_self"}
                  className="text-[10px] uppercase tracking-[0.2em] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
                >
                  View Case Study <span className="text-xs">→</span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
