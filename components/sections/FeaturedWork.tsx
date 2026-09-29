import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { imgUrl, type Project } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const STATUS: Record<string, string> = { completed: "Shipped", in_progress: "In progress", planning: "Planning" };

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="border-t border-border">
      {projects.slice(0, 3).map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={p._id} className={cn("border-b border-border", flip ? "bg-bg-alt" : "bg-bg")}>
            <div className="container-app grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
              <Reveal className={cn(flip && "md:order-2")}>
                <p className="eyebrow mb-4 text-accent-hover">✦ Featured project</p>
                <h2 className="font-serif text-display-md leading-[1.05]">{p.title}</h2>
                <p className="mt-5 max-w-md text-fg-muted md:text-lg">{p.shortDescription}</p>

                {p.techStack.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.techStack.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}

                <div className="mt-9 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/work/${p.slug}`}
                      className="eyebrow inline-flex items-center gap-2 bg-sun px-5 py-3 text-fg transition-transform hover:-translate-y-0.5"
                    >
                      View project <ArrowRight className="size-4" />
                    </Link>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label="Source on GitHub" className="text-fg-muted hover:text-fg">
                        <Github className="size-5" />
                      </a>
                    )}
                  </div>
                  <p className="eyebrow text-fg-subtle">
                    {STATUS[p.status] ?? p.status} &nbsp;|&nbsp; {p.category}
                  </p>
                </div>
              </Reveal>

              {/* Phones: image first, so the "View project" button sits below it */}
              <Reveal delay={0.1} className={cn("relative order-first mx-auto w-full max-w-xl", flip ? "md:order-1" : "md:order-none")}>
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-border bg-bg-muted shadow-lg shadow-black/5 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-black/10">
                    {p.thumbnailUrl && (
                      <Image
                        src={imgUrl(p.thumbnailUrl, 1100)}
                        alt={p.title}
                        fill
                        sizes="(min-width: 768px) 560px, 90vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
