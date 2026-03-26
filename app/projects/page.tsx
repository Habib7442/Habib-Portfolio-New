import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  const colors = ["bg-[#FDE047]", "bg-[#67E8F9]", "bg-[#F472B6]", "bg-[#C084FC]", "bg-[#BBF7D0]"];

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen text-[#111] bg-[#FDFBF7] pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
          
          <div className="w-full md:max-w-[80%] mb-20 px-6 md:px-0 flex flex-col items-start relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl md:text-7xl font-syne font-bold text-[#111] uppercase tracking-tighter">
                All Projects
              </h1>
              <div className="h-16 w-16 bg-[#FDE047] rounded-full border-3 border-black shadow-[4px_4px_0px_#000] rotate-12 flex items-center justify-center">
                <span className="text-3xl">💻</span>
              </div>
            </div>
            <p className="font-mono text-lg text-[#555] uppercase tracking-widest max-w-xl font-bold">
              A complete archive of things I've built, shipped, and experimented with.
            </p>
          </div>

          <div className="w-full md:max-w-[80%] flex flex-col gap-16 px-6 md:px-0">
            {projects && projects.length > 0 ? projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const themeColor = colors[index % colors.length];

              return (
                <div
                  key={project.id}
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
                        <span className="px-3 py-1 bg-white border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase tracking-wider text-[#111] rotate-[-2deg]">
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
                      {project.full_description ? project.full_description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : project.short_description}
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
                </div>
              );
            }) : (
              <div className="w-full p-12 text-center border-3 border-black bg-white shadow-[8px_8px_0px_#111] rounded-2xl">
                <p className="font-syne text-2xl font-bold">More projects coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
