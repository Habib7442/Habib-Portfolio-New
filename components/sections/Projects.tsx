"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Projects({ projects }: { projects: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) return null;

  const topProjects = projects.slice(0, 6);

  return (
    <section
      id="work"
      ref={ref}
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "64px",
        paddingBottom: "64px",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="container-editorial">
        {/* Section eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-12"
        >
          02 / Selected Work
        </motion.p>

        {/* Project list — one card per row */}
        <div className="flex flex-col w-full">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.08,
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <Link href="/work" className="arrow-link">
            View full work archive <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const year = project.created_at
    ? new Date(project.created_at).getFullYear()
    : project.year || "2026";

  const techStack = project.tech_stack || [];
  const imageUrl = project.thumbnail_url || project.image_url;

  return (
    <div
      className="group block py-10 transition-colors"
      style={{
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        {/* Left: Year + Thumbnail (Desktop) */}
        <div className="flex items-start gap-8 shrink-0">
          <span
            className="font-mono text-sm pt-1"
            style={{ color: "var(--fg-subtle)", width: "40px" }}
          >
            {year}
          </span>
          
          {imageUrl && (
            <div 
              className="hidden md:block w-32 aspect-video bg-[var(--bg-muted)] overflow-hidden"
              style={{ border: "1px solid var(--border-color)", borderRadius: "2px" }}
            >
              <img 
                src={imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0 flex-1">
              {project.live_url ? (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl md:text-4xl transition-colors"
                  style={{
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.1",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg)";
                  }}
                >
                  {project.title}
                </Link>
              ) : (
                <h3
                  className="font-display text-2xl md:text-4xl"
                  style={{
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.1",
                  }}
                >
                  {project.title}
                </h3>
              )}
            </div>

            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 mt-2 transition-colors text-xl"
                style={{ color: "var(--fg-subtle)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--fg-subtle)")
                }
                aria-label={`Visit ${project.title}`}
              >
                →
              </Link>
            )}
          </div>

          {/* Tech tags */}
          {techStack.length > 0 && (
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              {techStack.map((tech: string, i: number) => (
                <span key={tech}>
                  <span className="tech-tag">{tech}</span>
                  {i < techStack.length - 1 && (
                    <span
                      className="tech-tag mx-1"
                      style={{ color: "var(--border-strong)" }}
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {(project.short_description || project.description) && (
            <p
              className="text-base md:text-lg leading-relaxed text-[var(--fg-muted)]"
            >
              {project.short_description || project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
