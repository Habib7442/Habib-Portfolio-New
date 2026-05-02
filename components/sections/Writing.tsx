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
      className="py-16 md:py-24 border-t border-[var(--border-color)]"
    >
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="eyebrow mb-4">05 / Writing</p>
            <h2 className="text-3xl md:text-4xl font-display italic leading-tight" style={{ color: "var(--fg)" }}>
              Latest Essays
            </h2>
          </div>
          
          <Link href="/blogs" className="arrow-link">
            View all <span>→</span>
          </Link>
        </motion.div>

        <div className="flex flex-col">
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 3).map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group border-b border-[var(--border-color)] py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <p className="eyebrow" style={{ fontSize: "10px", color: "var(--fg-subtle)" }}>
                      {blog.category || "ENGINEERING"} — {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display italic transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
                      {blog.title}
                    </h3>
                  </div>
                  <span className="arrow-link text-sm md:opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <span>→</span>
                  </span>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-lg italic font-display" style={{ color: "var(--fg-muted)" }}>
              No essays published yet. Coming soon.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
