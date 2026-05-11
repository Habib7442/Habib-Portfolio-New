"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Projects({ projects }: { projects: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) return null;

  // Show top 5 projects for more editorial focus
  const topProjects = projects.slice(0, 5);

  return (
    <section
      id="work"
      ref={ref}
      className="bg-bg py-24 lg:py-32 border-t border-border"
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow mb-6"
            >
              02 / SELECTED WORK
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-display-lg leading-[1.1] italic text-fg"
            >
              Engineering products that bridge utility and aesthetics.
            </motion.h2>
          </div>
        </div>

        {/* Project list — Project Card 4.0 */}
        <div className="flex flex-col w-full border-t border-border">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex justify-center md:justify-start"
        >
          <Link href="/work" className="group flex items-center gap-3 text-sm font-medium text-fg-muted hover:text-fg transition-colors">
            VIEW FULL ARCHIVE <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const year = project.created_at
    ? new Date(project.created_at).getFullYear()
    : project.year || "2024";

  const techStack = project.tech_stack || [];
  const imageUrl = project.thumbnail_url || project.image_url;

  return (
    <div className="group relative block py-12 lg:py-16 transition-all border-b border-border">
      <div className="flex flex-col lg:grid lg:grid-cols-[80px_1fr_400px_40px] items-start gap-8 lg:gap-12">
        
        {/* 1. Year */}
        <div className="pt-2">
          <span className="font-mono text-[11px] font-medium text-fg-subtle tracking-widest">
            {year}
          </span>
        </div>

        {/* 2. Brand & Title */}
        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex items-center gap-4 flex-wrap">
            {project.live_url ? (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-4xl lg:text-5xl text-fg hover:text-accent transition-colors leading-[1.1] tracking-tight"
              >
                {project.title}
              </Link>
            ) : (
              <h3 className="font-display text-4xl lg:text-5xl text-fg leading-[1.1] tracking-tight">
                {project.title}
              </h3>
            )}
          </div>
          
          {/* Tech Stack Pills (refined) */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {techStack.map((tech: string) => (
              <span key={tech} className="font-mono text-[10px] text-fg-subtle tracking-[0.1em] uppercase">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Description */}
        <div className="lg:pt-2">
          <p className="text-text-md leading-relaxed text-fg-muted max-w-md">
            {project.short_description || project.description}
          </p>
        </div>

        {/* 4. Arrow Link (right-aligned) */}
        <div className="hidden lg:flex items-start justify-end pt-2">
          <div className="text-fg-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 text-2xl">
            →
          </div>
        </div>

      </div>

      {/* Hover Background Accent */}
      <div className="absolute inset-x-[-24px] inset-y-0 bg-bg-subtle/0 group-hover:bg-bg-subtle/50 -z-10 transition-colors duration-300 rounded-lg lg:block hidden" />
    </div>
  );
}
