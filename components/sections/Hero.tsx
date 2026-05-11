"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero({ featuredProject }: { featuredProject?: any }) {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden border-b border-border bg-bg pt-[120px] pb-[80px] lg:pt-[180px] lg:pb-[120px]"
    >
      <div className="container-editorial">
        {/* 1. The Massive Headline (Spans Left/Top) */}
        <div className="mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="eyebrow flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              01 / BUILDING AI SAAS AT FLERID
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-display italic text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em] -ml-[0.05em] text-fg"
          >
            Habib Tanwir
          </motion.h1>
        </div>

        {/* 2. Sub-content Layout: Split for Bio & Featured Work */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Bio Column (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-text-xl leading-relaxed text-fg-muted max-w-2xl"
            >
              Full-stack engineering with a designer&apos;s eye. I architect AI-powered products 
              and the visual identities that define them. Focused on high-performance 
              SaaS and thoughtful digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className="flex flex-wrap items-center gap-8 md:gap-12"
            >
              <Link
                href="/#contact"
                className="px-10 py-5 bg-accent text-white font-medium transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] rounded-sm"
              >
                Collaborate
              </Link>
              
              <Link href="/#work" className="arrow-link group text-lg font-medium">
                See selected work <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
