import Image from "next/image";
import Link from "next/link";
import { imgUrl } from "@/lib/sanity";

export interface RelatedLink {
  href: string;
  title: string;
  description?: string;
  /** Raw Sanity image URL, shown as a portrait thumbnail above the title. */
  image?: string;
}

/**
 * The `count` items after the current one, wrapping around the list. Unlike "the first three",
 * this gives every page in the list links from its neighbours, so none depends on the index page alone.
 */
export function nextInList<T extends { _id: string }>(items: T[], currentId: string, count = 3): T[] {
  const start = items.findIndex((item) => item._id === currentId);
  const others = [...items.slice(start + 1), ...items.slice(0, Math.max(start, 0))];
  return others.slice(0, count);
}

export default function RelatedLinks({ heading, links }: { heading: string; links: RelatedLink[] }) {
  if (links.length === 0) return null;

  return (
    <section className="border-t border-border py-20" aria-labelledby="related-links">
      <div className="container-app">
        <h2 id="related-links" className="mb-10 font-display text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl bg-bg-alt p-6 transition-transform hover:-translate-y-0.5 md:p-8"
            >
              {link.image && (
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl bg-bg-muted">
                  <Image
                    src={imgUrl(link.image, 600)}
                    alt=""
                    fill
                    sizes="(min-width: 1568px) 420px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <h3 className="font-serif text-2xl leading-tight group-hover:text-accent-hover">{link.title}</h3>
              {link.description && <p className="mt-3 line-clamp-3 text-fg-muted">{link.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
