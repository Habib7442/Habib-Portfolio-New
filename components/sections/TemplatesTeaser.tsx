import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TemplateCard from "@/components/ui/TemplateCard";
import type { CarouselTemplate } from "@/lib/sanity";

/** Up to three templates ticked "Show on home page" in the admin. Hidden when none are. */
export default function TemplatesTeaser({ templates }: { templates: CarouselTemplate[] }) {
  const picks = templates.filter((t) => t.featured).slice(0, 3);
  if (picks.length === 0) return null;

  return (
    <section id="templates" className="border-t border-border py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Templates</p>
            <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">Instagram templates you can post today</h2>
            <p className="mt-4 max-w-md text-fg-muted">Carousels, reels, stories and posts I designed in Canva. Swap in your photos and words.</p>
          </div>
          <Link
            href="/templates"
            className="eyebrow inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-6 py-3.5 transition-colors hover:border-fg md:self-auto"
          >
            All templates <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((t, i) => (
            <Reveal key={t._id} delay={i * 0.05} className="h-full">
              <TemplateCard template={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
