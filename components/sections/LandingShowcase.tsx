import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { LandingPageCard } from "@/components/sections/WorkGrid";
import type { LandingPage } from "@/lib/sanity";

export default function LandingShowcase({ pages }: { pages: LandingPage[] }) {
  const shown = pages.filter((p) => p.imageUrl || p.video.poster).slice(0, 6);
  if (shown.length === 0) return null;

  return (
    <section id="landing-pages" className="py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Landing pages</p>
            <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">Websites that move</h2>
            <p className="mt-4 max-w-md text-fg-muted">
              Pages that make people stop scrolling, and give them a clear reason to get in touch.
            </p>
          </div>
          <Link href="/work?type=landing" className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-fg hover:text-accent-hover">
            See all <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className={`grid gap-6 sm:grid-cols-2 ${shown.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {shown.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.05} className="h-full">
              <LandingPageCard l={p} sizes="(min-width: 1568px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
