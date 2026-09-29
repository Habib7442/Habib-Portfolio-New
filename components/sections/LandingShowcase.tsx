import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import StarRating from "@/components/ui/StarRating";
import { imgUrl, type LandingPage } from "@/lib/sanity";

export default function LandingShowcase({ pages }: { pages: LandingPage[] }) {
  const shown = pages.filter((p) => p.imageUrl).slice(0, 6);
  if (shown.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Landing pages</p>
            <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">Showcasing my best pages</h2>
            <p className="mt-4 max-w-md text-fg-muted">Designed and built to convert. Rate the ones you like.</p>
          </div>
          <Link href="/work?type=landing" className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-fg hover:text-accent-hover">
            See all <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className={`grid gap-6 sm:grid-cols-2 ${shown.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {shown.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-border bg-bg-elevated p-3 transition-shadow hover:shadow-xl hover:shadow-black/5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
                  <Image
                    src={imgUrl(p.imageUrl!, 900)}
                    alt={p.imageAlt || p.title}
                    fill
                    sizes="(min-width: 1024px) 580px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="eyebrow absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-bg-elevated/95 px-3 py-1.5 text-[0.6rem] text-fg shadow-sm backdrop-blur transition-colors hover:bg-sun"
                    >
                      Live <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                  <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
                  {p.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>}
                  <div className="mt-auto pt-5">
                    <div className="border-t border-border pt-4">
                      <StarRating id={p._id} ratingCount={p.ratingCount ?? 0} ratingTotal={p.ratingTotal ?? 0} />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
