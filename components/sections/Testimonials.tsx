import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { type Testimonial } from "@/lib/sanity";
import { cn } from "@/lib/utils";

/** "What clients say": up to three quote cards. Hidden entirely until a testimonial is published. */
export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const shown = testimonials.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 md:mb-14">
          <p className="eyebrow mb-4 text-accent-hover">✦ Testimonials</p>
          <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">What clients say</h2>
        </Reveal>

        <div className={cn("grid gap-6", shown.length === 1 && "max-w-3xl", shown.length >= 2 && "md:grid-cols-2", shown.length >= 3 && "lg:grid-cols-3")}>
          {shown.map((t, i) => {
            const who = [t.role, t.business].filter(Boolean).join(", ");
            return (
              <Reveal key={t._id} delay={i * 0.06} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-bg-elevated p-6 md:p-8">
                  <span className="font-serif text-5xl leading-none text-accent" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-fg">{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    {t.imageUrl ? (
                      <Image src={t.imageUrl} alt="" width={44} height={44} sizes="44px" className="size-11 rounded-full object-cover" />
                    ) : (
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-lg text-on-forest" aria-hidden="true">
                        {t.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium">{t.name}</p>
                      {who && <p className="text-sm text-fg-muted">{who}</p>}
                      {t.linked && (
                        <Link href={t.linked.href} className="text-sm text-accent-hover underline-offset-4 hover:underline">
                          {t.linked.title}
                        </Link>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
