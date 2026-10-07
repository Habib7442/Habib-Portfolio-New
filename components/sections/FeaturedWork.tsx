import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WorkCard, { cardPill } from "@/components/ui/WorkCard";
import { cardDescription } from "@/lib/plain-text";
import type { Project } from "@/lib/sanity";

/** Client work: the first three featured projects as a compact card row. */
export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const shown = projects.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section id="work" className="border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Client work</p>
            <h2 className="font-serif text-display-md leading-[1.05]">Websites for real businesses</h2>
            <p className="mt-4 max-w-md text-fg-muted">
              Sites for clinics, hotels and local businesses, built to bring in enquiries and bookings.
            </p>
          </div>
          <Link href="/work?type=project" className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-fg hover:text-accent-hover">
            All projects <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.05} className="h-full">
              <WorkCard
                href={`/work/${p.slug}`}
                image={p.thumbnailUrl}
                alt={p.title}
                sizes="(min-width: 1568px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                title={p.title}
                description={cardDescription(p.plainDescription, p.shortDescription)}
                badges={
                  <>
                    <span />
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className={cardPill}>
                        Live <ArrowUpRight className="size-3" />
                      </a>
                    )}
                  </>
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
