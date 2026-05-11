import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects, getDesigns } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects();
  const designs = await getDesigns();

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-bg min-h-screen">
        <section className="pt-40 pb-24 lg:pt-48 lg:pb-32">
          <div className="container-editorial">
            {/* Header */}
            <div className="max-w-4xl mb-24 lg:mb-32">
              <p className="font-mono text-xs tracking-[0.2em] text-fg-subtle uppercase mb-8">Archive / Work</p>
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-display italic leading-[0.9] tracking-[-0.03em] -ml-[0.05em] text-fg mb-10">
                Selected Work
              </h1>
              <p className="text-display-lg leading-[1.2] text-fg-muted max-w-3xl italic">
                A comprehensive collection of engineering projects, identity systems, and visual experiments.
              </p>
            </div>

            {/* Engineering Projects */}
            <div className="mb-32 lg:mb-48">
              <div className="flex items-end justify-between mb-16 pb-6 border-b border-border">
                <h2 className="text-display-lg font-display italic text-fg">Engineering</h2>
                <span className="font-mono text-xs text-fg-subtle tracking-widest">{projects.length} SYSTEMS</span>
              </div>
              
              <div className="flex flex-col">
                {projects.map((project: any) => (
                  <Link
                    key={project.id}
                    href={project.live_url || "#"}
                    target="_blank"
                    className="group py-12 lg:py-16 border-b border-border flex flex-col md:grid md:grid-cols-[1fr_auto] items-start gap-8 hover:px-4 transition-all duration-500 ease-out"
                  >
                    <div className="flex flex-col gap-6 max-w-2xl">
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-fg group-hover:text-accent transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-text-lg leading-relaxed text-fg-muted">
                        {project.description || project.short_description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end items-center">
                      {(project.tech_stack || []).map((tag: string) => (
                        <span key={tag} className="font-mono text-[10px] text-fg-subtle tracking-[0.15em] uppercase">
                          {tag}
                        </span>
                      ))}
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-fg-subtle group-hover:text-accent group-hover:border-accent group-hover:translate-x-1 transition-all">
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Visual Designs */}
            <div>
              <div className="flex items-end justify-between mb-16 pb-6 border-b border-border">
                <h2 className="text-display-lg font-display italic text-fg">Visual Design</h2>
                <span className="font-mono text-xs text-fg-subtle tracking-widest">{designs.length} PIECES</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {designs.map((design: any) => (
                  <Link 
                    key={design.id} 
                    href={design.image_url} 
                    target="_blank"
                    className="group flex flex-col gap-8"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-sm border border-border bg-bg-muted relative">
                      <Image 
                        src={design.image_url} 
                        alt={design.title} 
                        fill
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                        {design.category}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-display italic text-fg group-hover:text-accent transition-colors">
                        {design.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
