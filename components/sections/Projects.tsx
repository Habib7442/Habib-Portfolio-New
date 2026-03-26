"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }: { projects: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) return null;

  const topProjects = projects.slice(0, 5);

  const colors = ["bg-[#FDE047]", "bg-[#67E8F9]", "bg-[#F472B6]", "bg-[#C084FC]", "bg-[#BBF7D0]"];

  return (
    <section id="projects" className="py-32 bg-[#FDFBF7] relative z-20 border-t-2 border-black" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full md:max-w-[80%] mb-20 px-6 md:px-0 flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-4xl md:text-6xl font-syne font-bold text-[#111] uppercase tracking-tighter">
              Featured Work
            </h2>
            <div className="h-12 w-12 md:h-16 md:w-16 bg-[#67E8F9] rounded-full border-2 border-black shadow-[2px_2px_0px_#000] rotate-6 flex items-center justify-center">
              <span className="text-2xl md:text-3xl">🚀</span>
            </div>
          </div>
          <div className="w-48 h-[4px] bg-[#111] shadow-[2px_2px_0px_#000] rounded-sm" />
        </motion.div>

        <div className="w-full md:max-w-[80%] flex flex-col gap-16 px-6 md:px-0">
          {topProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const themeColor = colors[index % colors.length];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className={`relative group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 bg-[#fff] border-3 border-black rounded-3xl p-6 lg:p-8 shadow-[8px_8px_0px_#111] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#111] transition-all duration-300 z-10`}
              >
                {/* Project Image Panel */}
                <div className={`w-full lg:w-[45%] rounded-2xl overflow-hidden relative border-2 border-black shadow-[4px_4px_0px_#111] flex items-center justify-center ${themeColor} group-hover:scale-[1.02] transition-transform duration-300 p-4 aspect-[4/3] lg:aspect-auto`}>
                  
                  {project.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]" />
                  ) : (
                    <div className="font-syne font-bold text-4xl text-[#111] select-none tracking-tighter drop-shadow-md bg-white px-6 py-4 border-2 border-black rounded-xl rotate-[-2deg]">
                      {project.title.substring(0, 3).toUpperCase()}
                    </div>
                  )}

                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/40 backdrop-blur-sm pointer-events-none">
                    <span className="neo-btn pointer-events-auto shadow-[4px_4px_0px_#000]">
                      <Link href={project.live_url || "#"} target="_blank" className="flex items-center gap-2">
                        View Live <ExternalLink size={16} />
                      </Link>
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="w-full lg:w-[55%] flex flex-col items-start justify-center pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    {project.category && (
                      <span className="px-3 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-xs font-bold font-bold uppercase tracking-wider text-[#111] rotate-[-2deg]">
                        {project.category}
                      </span>
                    )}
                    {project.status === 'in_progress' && (
                      <span className="px-3 py-1 bg-[#FDE047] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase tracking-wider text-[#111] rotate-[1deg]">
                        In Progress
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold text-[#111] mb-4 break-words">
                    {project.title}
                  </h3>
                  
                  <p className="font-inter text-[#444] text-lg leading-relaxed mb-6 font-medium">
                    {project.short_description || project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech_stack && project.tech_stack.length > 0 ? (
                      project.tech_stack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 rounded-sm border-2 border-black bg-[#E2E8F0] shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase text-[#111]">
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 rounded-sm border-2 border-black bg-[#E2E8F0] shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase text-[#111]">Next.js</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    {project.live_url && (
                      <Link href={project.live_url} target="_blank" className="neo-btn py-3 px-6 text-sm">
                        Live site <ArrowRight size={16} />
                      </Link>
                    )}
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank" className="w-12 h-12 bg-white flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] rounded-lg hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all text-[#111]">
                        <Github size={20} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mt-24"
        >
          <Link href="/projects" className="neo-btn text-lg py-5 px-10 shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-1 hover:-translate-y-1">
            Explore All Projects <ArrowRight size={24} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
