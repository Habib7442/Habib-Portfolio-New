import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SlideStrip from "@/components/ui/SlideStrip";
import { templateCategoryLabel } from "@/lib/template-categories";
import { templatePath, templateTypeInfo } from "@/lib/template-types";
import type { CarouselTemplate } from "@/lib/sanity";
import { cn } from "@/lib/utils";

export function PriceTag({ template, className }: { template: CarouselTemplate; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow rounded-full px-3 py-1.5 text-[0.6rem]",
        template.isFree ? "bg-sun text-fg" : "bg-bg-elevated text-fg ring-1 ring-border",
        className
      )}
    >
      {template.isFree ? "Free" : template.price || "Premium"}
    </span>
  );
}

/** Template card: swipe through the real slides/frames, click the text to open the template page. */
export default function TemplateCard({ template, priority = false }: { template: CarouselTemplate; priority?: boolean }) {
  const type = templateTypeInfo(template.templateType);
  const meta = [type.singular, templateCategoryLabel(template.category), `${template.slides.length} ${type.unit}`].join("  ·  ");

  return (
    <article className="group flex h-full flex-col">
      <SlideStrip
        slides={template.slides}
        title={template.title}
        sizes="(min-width: 1568px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
      />
      <Link href={templatePath(template)} className="mt-5 flex flex-1 items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2 text-fg-subtle">{meta}</p>
          <h3 className="font-display text-xl font-semibold leading-snug transition-colors group-hover:text-accent-hover md:text-2xl">
            {template.title}
          </h3>
        </div>
        <span className="flex shrink-0 flex-col items-end gap-3">
          <PriceTag template={template} />
          <ArrowUpRight className="size-5 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
}
