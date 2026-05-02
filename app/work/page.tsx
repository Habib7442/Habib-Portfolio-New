import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects, getDesigns } from "@/lib/data";
import Link from "next/link";

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects();
  const designs = await getDesigns();

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "var(--bg)" }}>
        <section className="pt-40 pb-24">
          <div className="container-editorial">
            {/* Header */}
            <div className="max-w-3xl mb-24">
              <p className="eyebrow mb-6">Archive / Work</p>
              <h1 className="text-display-2xl font-display italic leading-none mb-8" style={{ color: "var(--fg)" }}>
                Selected Work
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                A comprehensive collection of engineering projects, identity systems, and visual experiments.
              </p>
            </div>

            {/* Engineering Projects */}
            <div className="mb-32">
              <div className="flex items-center justify-between mb-12 pb-4 border-b border-[var(--border-color)]">
                <h2 className="text-display-md font-display italic" style={{ color: "var(--fg)" }}>Engineering</h2>
                <span className="eyebrow">{projects.length} Items</span>
              </div>
              
              <div className="flex flex-col">
                {projects.map((project: any) => (
                  <Link
                    key={project.id}
                    href={project.link || "#"}
                    target="_blank"
                    className="group py-10 border-b border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="text-2xl md:text-3xl font-display italic transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
                        {project.title}
                      </h3>
                      <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 md:justify-end max-w-xs">
                      {(project.tech_stack || project.tags || []).map((tag: string) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Visual Designs */}
            <div>
              <div className="flex items-center justify-between mb-12 pb-4 border-b border-[var(--border-color)]">
                <h2 className="text-display-md font-display italic" style={{ color: "var(--fg)" }}>Visual Design</h2>
                <span className="eyebrow">{designs.length} Items</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {designs.map((design: any) => (
                  <div key={design.id} className="group">
                    <div className="aspect-[4/5] mb-6 overflow-hidden rounded-sm border border-[var(--border-color)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={design.image_url} 
                        alt={design.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="eyebrow" style={{ fontSize: "10px" }}>{design.category.toUpperCase()}</p>
                      <h3 className="text-xl font-display italic" style={{ color: "var(--fg)" }}>{design.title}</h3>
                    </div>
                  </div>
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
