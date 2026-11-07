"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slideRatio } from "@/lib/template-categories";
import type { ImageDims } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type Slide = { url: string; dims?: ImageDims };

/**
 * A carousel's slides, swiped like on Instagram: native scroll-snap (touch, trackpad, keyboard),
 * plus prev/next buttons and a counter. `variant="card"` shows one slide at a time inside a card;
 * `variant="full"` shows a row of slides that peeks the next one.
 */
export default function SlideStrip({
  slides,
  title,
  variant = "card",
  sizes,
  priority = false,
}: {
  slides: Slide[];
  title: string;
  variant?: "card" | "full";
  sizes: string;
  priority?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const ratio = slideRatio(slides[0]?.dims);
  // Website sections are landscape: show fewer, wider tiles so the layout is readable.
  const landscape = (slides[0]?.dims?.width ?? 0) > (slides[0]?.dims?.height ?? 0);

  // The visible slide is whichever one's left edge is closest to the track's scroll position.
  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const children = [...el.children] as HTMLElement[];
    let best = 0;
    children.forEach((child, i) => {
      if (Math.abs(child.offsetLeft - el.scrollLeft) < Math.abs(children[best].offsetLeft - el.scrollLeft)) best = i;
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const go = (to: number) => {
    const el = track.current;
    const target = el?.children[Math.max(0, Math.min(slides.length - 1, to))] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const atStart = index === 0;
  const atEnd = index >= slides.length - 1;
  const button =
    "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg-elevated/90 text-fg shadow-lg backdrop-blur transition-opacity hover:bg-bg-elevated focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="group/strip relative" role="region" aria-roledescription="carousel" aria-label={`${title} slides`}>
      <div
        ref={track}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          variant === "card" ? "rounded-2xl bg-bg-muted" : "gap-4 md:gap-6"
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.url}
            className={cn(
              "relative shrink-0 snap-start overflow-hidden bg-bg-muted",
              variant === "card"
                ? "w-full"
                : landscape
                  ? "w-[88%] rounded-2xl sm:w-[72%] lg:w-[58%]"
                  : "w-[78%] rounded-2xl sm:w-[46%] lg:w-[31%]"
            )}
            style={{ aspectRatio: ratio }}
            aria-label={`Slide ${i + 1} of ${slides.length}`}
            role="group"
            aria-roledescription="slide"
          >
            <Image
              src={slide.url}
              alt={`${title} — slide ${i + 1} of ${slides.length}`}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              loading={priority && i < 3 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={atStart}
            aria-label="Previous slide"
            className={cn(button, "left-3", variant === "card" && "md:opacity-0 md:group-hover/strip:opacity-100")}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={atEnd}
            aria-label="Next slide"
            className={cn(button, "right-3", variant === "card" && "md:opacity-0 md:group-hover/strip:opacity-100")}
          >
            <ChevronRight className="size-5" />
          </button>
          {/* Top corner: carousel slides usually print their own counter at the bottom. The full strip shows
              several slides at once, so a single counter would be misleading there; it stays for screen readers. */}
          <p
            className={cn(
              "eyebrow pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.6rem] text-white",
              variant === "full" && "sr-only"
            )}
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </>
      )}
    </div>
  );
}
