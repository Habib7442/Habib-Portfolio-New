import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import TemplateCard from "@/components/ui/TemplateCard";
import { TEMPLATE_CATEGORIES } from "@/lib/template-categories";
import type { CarouselTemplate } from "@/lib/sanity";
import { cn } from "@/lib/utils";

/**
 * Template cards with category filter chips (?category=…). The chips only list categories that have
 * templates, and filtered views keep the page's canonical URL, so they never compete with it in search.
 */
export default function TemplateGrid({
  templates,
  basePath,
  category,
  priorityCount = 3,
}: {
  templates: CarouselTemplate[];
  basePath: string;
  category?: string;
  priorityCount?: number;
}) {
  const used = TEMPLATE_CATEGORIES.filter((c) => templates.some((t) => t.category === c.value));
  const active = used.some((c) => c.value === category) ? category : undefined;
  const shown = active ? templates.filter((t) => t.category === active) : templates;

  const chip = (selected: boolean) =>
    cn(
      "eyebrow rounded-full border px-4 py-2 text-[0.62rem] transition-colors",
      selected ? "border-fg bg-fg text-bg" : "border-border text-fg-muted hover:border-fg hover:text-fg"
    );

  return (
    <>
      {used.length > 1 && (
        <nav aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2 md:mb-14">
          <Link href={basePath} scroll={false} className={chip(!active)} aria-current={!active ? "page" : undefined}>
            All
          </Link>
          {used.map((c) => (
            <Link
              key={c.value}
              href={`${basePath}?category=${c.value}`}
              scroll={false}
              rel="nofollow"
              className={chip(active === c.value)}
              aria-current={active === c.value ? "page" : undefined}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, i) => (
          <Reveal key={t._id} delay={(i % 3) * 0.05} className="h-full">
            <TemplateCard template={t} priority={i < priorityCount} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
