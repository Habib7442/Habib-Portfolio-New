"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { imgUrl, type Design, type LandingPage, type Project } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { cardDescription } from "@/lib/plain-text";
import DesignLightbox from "@/components/ui/DesignLightbox";
import WorkCard, { cardPill } from "@/components/ui/WorkCard";
import { designCategoryLabel } from "@/lib/design-categories";

type Filter = "all" | "project" | "design" | "landing";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "design", label: "Designs" },
  { value: "landing", label: "Landing pages" },
];

// Cards sit in CSS columns: 1 / 2 / 3 across, at most 1440px wide in total.
const SIZES = "(min-width: 1568px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function ratio(dims?: { width: number; height: number }) {
  return dims && dims.width && dims.height ? dims.width / dims.height : 4 / 3;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <WorkCard
      sizes={SIZES}
      href={`/work/${p.slug}`}
      image={p.thumbnailUrl}
      alt={p.title}
      title={p.title}
      description={cardDescription(p.plainDescription, p.shortDescription)}
      badges={
        <>
          {p.featured ? <span className="eyebrow rounded-full bg-sun px-3 py-1.5 text-[0.58rem] text-fg">Featured</span> : <span />}
          <span className="flex gap-1.5">
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} source on GitHub`} className={cardPill}>
                <Github className="size-3" />
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className={cardPill}>
                Live <ArrowUpRight className="size-3" />
              </a>
            )}
          </span>
        </>
      }
    />
  );
}

function DesignCard({ d }: { d: Design }) {
  const allImages = [d.imageUrl, ...d.images.map((i) => i.url)].filter((u): u is string => !!u);
  if (!d.imageUrl) return null;
  return (
    <div className="group">
      <DesignLightbox images={allImages} title={d.title}>
        <div className="relative overflow-hidden rounded-2xl bg-bg-muted" style={{ aspectRatio: ratio(d.imageDims) }}>
          <Image
            src={imgUrl(d.imageUrl, 900)}
            alt={d.title}
            fill
            sizes={SIZES}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-sm font-medium text-white line-clamp-1">{d.title}</p>
            <p className="eyebrow text-[0.6rem] text-white/75">{designCategoryLabel(d.category)}</p>
          </div>
        </div>
      </DesignLightbox>
    </div>
  );
}

export function LandingPageCard({ l, sizes = SIZES }: { l: LandingPage; sizes?: string }) {
  if (!l.imageUrl && !l.video.poster) return null;
  // With a slug the card opens its "how it was made" page; without one, the live site.
  const href = l.slug ? `/work/landing/${l.slug}` : l.liveUrl;
  return (
    <WorkCard
      sizes={sizes}
      href={href}
      external={!l.slug}
      image={l.imageUrl}
      video={l.video}
      alt={l.imageAlt || l.title}
      title={l.title}
      description={cardDescription(l.plainDescription, l.description)}
      badges={
        <>
          <span />
          {l.liveUrl && (
            <a href={l.liveUrl} target="_blank" rel="noreferrer" aria-label={`${l.title} live site`} className={cardPill}>
              Live <ArrowUpRight className="size-3" />
            </a>
          )}
        </>
      }
    />
  );
}

export default function WorkGrid({
  projects,
  designs,
  landingPages,
  initialFilter = "all",
  showFilters = true,
}: {
  projects: Project[];
  designs: Design[];
  landingPages: LandingPage[];
  initialFilter?: Filter;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const counts: Record<Filter, number> = {
    all: projects.length + designs.length + landingPages.length,
    project: projects.length,
    design: designs.length,
    landing: landingPages.length,
  };

  const items = useMemo(() => {
    const merged: { kind: Filter; key: string; node: React.ReactNode }[] = [
      ...landingPages.map((l) => ({ kind: "landing" as Filter, key: `l-${l._id}`, node: <LandingPageCard l={l} /> })),
      ...projects.map((p) => ({ kind: "project" as Filter, key: `p-${p._id}`, node: <ProjectCard p={p} /> })),
      ...designs.map((d) => ({ kind: "design" as Filter, key: `d-${d._id}`, node: <DesignCard d={d} /> })),
    ];
    return filter === "all" ? merged : merged.filter((m) => m.kind === filter);
  }, [projects, designs, landingPages, filter]);

  // Masonry via CSS columns: one copy of every card in the HTML (crawlers and screen readers
  // see each once), correct on first paint at every width, no JS layout.
  const columns = Math.min(3, items.length);

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter work">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                filter === f.value ? "border-forest bg-forest text-on-forest" : "border-border bg-bg-elevated text-fg-muted hover:border-border-strong hover:text-fg"
              )}
            >
              {f.label}
              <sup className="ml-1 text-[0.65rem] opacity-70">
                <span className="sr-only">(</span>
                {counts[f.value]}
                <span className="sr-only">)</span>
              </sup>
            </button>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-fg-muted">Nothing here yet — check back soon.</p>
      ) : (
        <div className={cn("gap-5", columns >= 2 && "sm:columns-2", columns >= 3 && "lg:columns-3")}>
          {items.map((item) => (
            <div key={item.key} className="mb-5 break-inside-avoid">
              {item.node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
