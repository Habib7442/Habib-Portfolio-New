import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { designCategoryLabel } from "@/lib/design-categories";
import { imgUrl, type Design } from "@/lib/sanity";

export default function GalleryBand({ designs }: { designs: Design[] }) {
  const withImage = designs.filter((d) => d.imageUrl);
  // Whole rows only: 4 across on desktop, so show 4 or 8.
  const pics = withImage.slice(0, withImage.length >= 8 ? 8 : 4);
  if (pics.length === 0) return null;

  return (
    <section className="bg-forest py-20 text-on-forest md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-sun">✦ Visual design</p>
            <h2 className="font-serif text-display-md leading-[1.05]">Posters, socials &amp; brand work</h2>
            <p className="mt-4 max-w-md text-on-forest-muted">
              Campaign visuals, social posts and posters — made to stop the scroll.
            </p>
          </div>
          <Link
            href="/work?type=design"
            className="eyebrow inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-sun px-6 py-3.5 text-fg transition-transform hover:-translate-y-0.5 md:self-auto"
          >
            Explore gallery <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {pics.map((d, i) => (
            <Reveal key={d._id} delay={i * 0.05}>
              <Link href="/work?type=design" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-forest-deep transition-transform duration-500 group-hover:-translate-y-1.5">
                  <Image
                    src={imgUrl(d.imageUrl!, 600)}
                    alt={d.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-1 text-sm font-medium text-white">{d.title}</p>
                    <p className="eyebrow mt-0.5 text-[0.58rem] text-white/70">{designCategoryLabel(d.category)}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
