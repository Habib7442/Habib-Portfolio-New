import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { imgUrl, type Review } from "@/lib/sanity";
import { cn } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn("size-4", n <= rating ? "fill-gold text-gold" : "text-border-strong")} />
      ))}
    </div>
  );
}

function ReviewCard({ r, hidden }: { r: Review; hidden?: boolean }) {
  return (
    <figure aria-hidden={hidden || undefined} className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-border bg-bg-elevated p-6 sm:w-[360px] md:p-7">
      <Stars rating={r.rating} />
      <blockquote className="mt-4 line-clamp-6 flex-1 leading-relaxed text-fg">&ldquo;{r.review}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {r.photoUrl ? (
          <Image
            src={imgUrl(r.photoUrl, 96)}
            alt={r.name}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-forest font-serif text-lg text-on-forest">
            {r.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-medium">{r.name}</p>
          {r.role && <p className="truncate text-sm text-fg-muted">{r.role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * "What clients say" — approved reviews scrolling sideways in a loop (pauses on hover,
 * stops for visitors who prefer reduced motion). Hidden until at least one review is approved.
 */
export default function Testimonials({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  // Repeat short lists so one loop is always wider than the screen (no empty gap before it wraps).
  const loop = Array.from({ length: Math.max(1, Math.ceil(8 / reviews.length)) }, () => reviews).flat();
  // Keep the speed steady (~6s per card) however many reviews there are.
  const duration = `${loop.length * 6}s`;

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 gap-5 pr-5">
      {loop.map((r, i) => (
        // Screen readers hear each review once; the repeats exist only to fill the loop.
        <ReviewCard key={`${r._id}-${i}`} r={r} hidden={hidden || i >= reviews.length} />
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-t border-border bg-bg-alt py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Reviews</p>
            <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">What clients say</h2>
            <div className="mt-4 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <p className="text-sm text-fg-muted">
                <span className="font-semibold text-fg">{average.toFixed(1)}</span> from {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
          <Link
            href="/review"
            className="eyebrow inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border bg-bg-elevated px-5 py-3 text-fg transition-colors hover:border-forest md:self-auto"
          >
            Leave a review <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      {/* Edge fades so cards slide in and out softly */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: duration }}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
