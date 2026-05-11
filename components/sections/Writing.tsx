"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  created_at: string;
}

interface WritingProps {
  blogs: Blog[];
}

export default function Writing({ blogs }: WritingProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section 
      id="writing"
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
              05 / WRITING & JOURNAL
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg leading-[1.1] italic text-fg"
            >
              Notes on engineering, design, <br className="hidden md:block" /> and the business of software.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/blogs" className="group flex items-center gap-3 text-sm font-medium text-fg-muted hover:text-fg transition-colors">
              READ ALL ESSAYS <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* The Feed */}
        <div className="flex flex-col border-t border-border">
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 4).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group relative block py-10 lg:py-12 border-b border-border transition-all"
                >
                  <div className="flex flex-col md:grid md:grid-cols-[200px_1fr_100px] items-start md:items-center gap-6 md:gap-12 relative z-10">
                    {/* Metadata */}
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-fg-subtle uppercase">
                        {blog.category || "ENGINEERING"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display italic text-2xl lg:text-3xl text-fg group-hover:text-accent transition-colors leading-tight">
                      {blog.title}
                    </h3>

                    {/* Date */}
                    <div className="md:text-right">
                      <span className="font-mono text-[11px] font-medium text-fg-subtle uppercase tracking-widest">
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Subtle hover background */}
                  <div className="absolute inset-x-[-24px] inset-y-0 bg-bg-subtle/0 group-hover:bg-bg-subtle/50 -z-0 transition-colors duration-300 rounded-lg lg:block hidden" />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="py-24 border-b border-border">
              <p className="text-text-xl italic text-fg-muted">
                The journal is currently empty. Re-indexing thoughts...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
