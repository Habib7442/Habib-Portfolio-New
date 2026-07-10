"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-bg py-24 lg:py-40 border-t border-border"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-24"
        >
          <p className="eyebrow">07 / CONTACT & COLLABORATION</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-display-lg leading-[1.1] italic text-fg mb-8">
              Let&apos;s build the next <br className="hidden md:block" /> iteration of the web.
            </h2>
            <p className="text-text-xl text-fg-muted max-w-xl leading-relaxed">
              Available for select senior roles, founding engineer opportunities, and high-impact design partnerships. 
              Currently based in India, operating globally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-fg-subtle uppercase">DIRECT INQUIRIES</p>
              <a 
                href="mailto:hello@habibfolio.tech" 
                className="text-3xl md:text-5xl font-display italic text-fg hover:text-accent transition-colors break-all"
              >
                hello@habibfolio.tech
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-fg-subtle uppercase">SOCIAL SYSTEMS</p>
              <div className="flex flex-wrap gap-8 md:gap-12">
                {[
                  { name: "LINKEDIN", href: "https://linkedin.com/in/habib-tanwir" },
                  { name: "GITHUB", href: "https://github.com/Habib7442" },
                  { name: "X (TWITTER)", href: "https://x.com/TanwirHabib" },
                  { name: "WHATSAPP", href: "https://wa.me/919707370886" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-fg-muted hover:text-fg transition-colors border-b border-border/50 hover:border-accent"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
