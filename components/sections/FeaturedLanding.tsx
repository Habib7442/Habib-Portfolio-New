import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import VideoPreview from "@/components/ui/VideoPreview";
import { cardDescription } from "@/lib/plain-text";
import type { LandingPage } from "@/lib/sanity";

/** Full-width spotlight on the top featured landing page, right under the hero. */
export default function FeaturedLanding({ page }: { page?: LandingPage }) {
  if (!page || (!page.imageUrl && !page.video.poster)) return null;
  const description = cardDescription(page.plainDescription, page.description);

  return (
    <section aria-labelledby="featured-build" className="border-b border-border py-16 md:py-24">
      <div className="container-app">
        <Reveal className="mb-8 grid gap-6 md:mb-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 text-accent-hover">✦ Featured build</p>
            <h2 id="featured-build" className="font-serif text-display-lg leading-[1.02]">
              {page.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            {description && <p className="max-w-md text-fg-muted md:text-lg">{description}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              {page.liveUrl && (
                <a
                  href={page.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5"
                >
                  View live site <ArrowUpRight className="size-4" />
                </a>
              )}
              {page.slug && (
                <Link
                  href={`/work/landing/${page.slug}`}
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-fg transition-colors hover:border-forest"
                >
                  See how it was made <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>

        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-bg-muted shadow-lg shadow-black/5 md:aspect-video">
          <VideoPreview
            video={page.video}
            image={page.imageUrl}
            alt={page.imageAlt || page.title}
            sizes="(min-width: 1568px) 1440px, 92vw"
          />
        </div>
      </div>
    </section>
  );
}
