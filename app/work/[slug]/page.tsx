import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Tag from "@/components/ui/Tag";
import JsonLd from "@/components/seo/JsonLd";
import { projectSchema } from "@/lib/schema";
import { getSiteSettings, getProjectBySlug, imgUrl } from "@/lib/sanity";
import { OG_IMAGE } from "@/lib/site";

const STATUS_LABEL: Record<string, string> = { completed: "Shipped", in_progress: "In progress", planning: "Planning" };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: project.title,
      description: project.shortDescription,
      images: [project.thumbnailUrl ? imgUrl(project.thumbnailUrl, 1200) : OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [project.thumbnailUrl ? imgUrl(project.thumbnailUrl, 1200) : OG_IMAGE] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSiteSettings(), getProjectBySlug(slug)]);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader eyebrow={`${project.category} · ${STATUS_LABEL[project.status] ?? project.status}`} title={project.title} intro={project.shortDescription}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center gap-2 bg-sun px-5 py-3 text-fg transition-transform hover:-translate-y-0.5"
              >
                View live <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center gap-2 border border-on-forest/30 px-5 py-3 text-on-forest transition-colors hover:bg-on-forest hover:text-forest"
              >
                <Github className="size-4" /> Source
              </a>
            )}
          </div>
        </PageHeader>

        {project.thumbnailUrl && (
          <div className="bg-forest">
            <div className="container-app">
              <div className="relative aspect-video translate-y-10 overflow-hidden rounded-3xl shadow-2xl shadow-black/20 md:translate-y-16">
                <Image src={imgUrl(project.thumbnailUrl, 1600)} alt={project.title} fill sizes="(min-width: 1568px) 1440px, 100vw" priority className="object-cover" />
              </div>
            </div>
          </div>
        )}

        <section className="container-app grid gap-12 pt-24 pb-16 md:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Link href="/work" className="eyebrow mb-8 inline-flex items-center gap-1.5 text-fg-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All work
            </Link>
            {project.fullDescription ? (
              <p className="prose-blog whitespace-pre-line">{project.fullDescription}</p>
            ) : (
              <p className="prose-blog">{project.shortDescription}</p>
            )}
          </div>
          {project.techStack.length > 0 && (
            <aside className="lg:col-span-4">
              <div className="rounded-3xl bg-bg-alt p-6 md:p-8">
                <p className="eyebrow mb-4 text-accent-hover">✦ Built with</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </section>

        {project.images.length > 0 && (
          <section className="container-app pb-24">
            <div className="grid gap-5 sm:grid-cols-2">
              {project.images.map((img, i) => (
                <div key={img.url} className="relative aspect-video overflow-hidden rounded-2xl bg-bg-muted">
                  <Image src={imgUrl(img.url, 1000)} alt={`${project.title} — screenshot ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
