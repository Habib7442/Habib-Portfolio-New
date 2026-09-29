"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { imgUrl, type Design, type LandingPage, type Project } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import DesignLightbox from "@/components/ui/DesignLightbox";
import { designCategoryLabel } from "@/lib/design-categories";

type Filter = "all" | "project" | "design" | "landing";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "design", label: "Designs" },
  { value: "landing", label: "Landing pages" },
];

function ratio(dims?: { width: number; height: number }) {
  return dims && dims.width && dims.height ? dims.width / dims.height : 4 / 3;
}

// Project + landing cards are a fixed 16:10 shot plus a text block; in card widths that is roughly:
const CARD_HEIGHT = 10 / 16 + 0.48;

// Shared frame for project + landing-page cards: white card, fixed 16:10 shot, tidy footer.
function CardShell({
  href,
  external,
  image,
  alt,
  badges,
  title,
  description,
  footer,
  sizes,
}: {
  sizes: string;
  href?: string;
  external?: boolean;
  image?: string;
  alt: string;
  badges?: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  const shot = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
      {image && (
        <Image
          src={imgUrl(image, 900)}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );

  return (
    <article className="group rounded-3xl border border-border bg-bg-elevated p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <div className="relative">
        {href ? (
          external ? (
            <a href={href} target="_blank" rel="noreferrer" aria-label={`${title} — open live site`}>
              {shot}
            </a>
          ) : (
            <Link href={href} aria-label={title}>
              {shot}
            </Link>
          )
        ) : (
          shot
        )}
        {badges && <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2 [&>*]:pointer-events-auto">{badges}</div>}
      </div>
      <div className="px-2.5 pt-4 pb-2">
        {href && !external ? (
          <Link href={href} className="line-clamp-1 font-display text-base font-semibold tracking-tight text-fg transition-colors hover:text-accent-hover md:text-[1.05rem]">
            {title}
          </Link>
        ) : (
          <h3 className="line-clamp-1 font-display text-base font-semibold tracking-tight text-fg md:text-[1.05rem]">{title}</h3>
        )}
        {description && <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">{description}</p>}
        {footer && <div className="mt-4 border-t border-border pt-3.5">{footer}</div>}
      </div>
    </article>
  );
}

const pill =
  "eyebrow inline-flex items-center gap-1 rounded-full bg-bg-elevated/95 px-3 py-1.5 text-[0.58rem] text-fg shadow-sm backdrop-blur transition-colors hover:bg-sun";

function ProjectCard({ p, sizes }: { p: Project; sizes: string }) {
  return (
    <CardShell
      sizes={sizes}
      href={`/work/${p.slug}`}
      image={p.thumbnailUrl}
      alt={p.title}
      title={p.title}
      description={p.shortDescription}
      badges={
        <>
          {p.featured ? <span className="eyebrow rounded-full bg-sun px-3 py-1.5 text-[0.58rem] text-fg">Featured</span> : <span />}
          <span className="flex gap-1.5">
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label="Source on GitHub" className={pill}>
                <Github className="size-3" />
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" className={pill}>
                Live <ArrowUpRight className="size-3" />
              </a>
            )}
          </span>
        </>
      }
      footer={
        p.techStack.length > 0 ? (
          <p className="line-clamp-1 text-xs text-fg-subtle">{p.techStack.slice(0, 4).join("  ·  ")}</p>
        ) : undefined
      }
    />
  );
}

function DesignCard({ d, sizes }: { d: Design; sizes: string }) {
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
            sizes={sizes}
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

function LandingPageCard({ l, sizes }: { l: LandingPage; sizes: string }) {
  if (!l.imageUrl) return null;
  return (
    <CardShell
      sizes={sizes}
      href={l.liveUrl}
      external
      image={l.imageUrl}
      alt={l.imageAlt || l.title}
      title={l.title}
      description={l.description}
      badges={
        <>
          <span />
          {l.liveUrl && (
            <a href={l.liveUrl} target="_blank" rel="noreferrer" className={pill}>
              Live <ArrowUpRight className="size-3" />
            </a>
          )}
        </>
      }
      footer={<StarRating id={l._id} ratingCount={l.ratingCount ?? 0} ratingTotal={l.ratingTotal ?? 0} />}
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
    // `height` is each card's height relative to its width — used to balance the columns.
    const merged: { kind: Filter; node: (sizes: string) => React.ReactNode; key: string; height: number }[] = [
      ...projects.map((p) => ({ kind: "project" as Filter, key: `p-${p._id}`, height: CARD_HEIGHT, node: (sizes: string) => <ProjectCard p={p} sizes={sizes} /> })),
      ...designs.map((d) => ({ kind: "design" as Filter, key: `d-${d._id}`, height: 1 / ratio(d.imageDims), node: (sizes: string) => <DesignCard d={d} sizes={sizes} /> })),
      ...landingPages.map((l) => ({ kind: "landing" as Filter, key: `l-${l._id}`, height: CARD_HEIGHT, node: (sizes: string) => <LandingPageCard l={l} sizes={sizes} /> })),
    ];
    return filter === "all" ? merged : merged.filter((m) => m.kind === filter);
  }, [projects, designs, landingPages, filter]);

  // Masonry: each card goes into whichever column is currently shortest. Layouts for 1, 2 and 3
  // columns are all rendered and CSS shows the right one per breakpoint, so the very first paint
  // is correct on every screen (no JS media queries, no layout jump after hydration).
  // Hidden layouts don't fetch their images: lazy images inside display:none aren't loaded.
  // With fewer items than columns, fewer (wider) columns are used instead of leaving one empty.
  const layouts = useMemo(() => {
    const build = (n: number) => {
      const cols = Array.from({ length: Math.max(1, Math.min(n, items.length)) }, () => ({ height: 0, items: [] as typeof items }));
      for (const item of items) {
        const shortest = cols.reduce((a, b) => (b.height < a.height ? b : a));
        shortest.items.push(item);
        shortest.height += item.height;
      }
      // Real card width for this layout, so the browser downloads a sharp-enough image.
      const c = cols.length;
      return { cols, sizes: `(min-width: 1240px) ${Math.round(1160 / c)}px, ${Math.round(100 / c)}vw` };
    };
    return [
      { ...build(1), className: "flex sm:hidden" },
      { ...build(2), className: "hidden sm:flex lg:hidden" },
      { ...build(3), className: "hidden lg:flex" },
    ];
  }, [items]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                filter === f.value ? "border-forest bg-forest text-on-forest" : "border-border bg-bg-elevated text-fg-muted hover:border-border-strong hover:text-fg"
              )}
            >
              {f.label} <sup className="text-[0.65rem] opacity-70">{counts[f.value]}</sup>
            </button>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-fg-muted">Nothing here yet — check back soon.</p>
      ) : (
        layouts.map((layout, l) => (
          <div key={l} className={cn("items-start gap-5", layout.className)}>
            {layout.cols.map((col, i) => (
              <div key={i} className="flex min-w-0 flex-1 flex-col gap-5">
                {col.items.map((item) => (
                  <div key={item.key}>{item.node(layout.sizes)}</div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
