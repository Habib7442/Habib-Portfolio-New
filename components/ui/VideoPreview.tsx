"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PreviewVideo } from "@/lib/sanity";
import { cn } from "@/lib/utils";

// Play once at least this much of the video is on screen.
const VISIBLE_RATIO = 0.4;

/**
 * Fills its (positioned, aspect-ratio'd) parent with a muted looping preview, or the plain image
 * when there's no video. The poster image is a normal next/image underneath, so it lazy-loads and
 * paints like any screenshot and the box never changes size. The video downloads nothing
 * (preload="none") until it first scrolls into view, then fades in over the poster once it's
 * actually playing. Reduced-motion and Save-Data visitors only ever see the poster.
 */
export default function VideoPreview({
  video,
  image,
  alt,
  sizes,
  priority,
  className,
  fit = "cover",
}: {
  video?: PreviewVideo;
  /** Screenshot used as the poster when the video has none, and alone when there's no video. */
  image?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Applied to both the poster and the video (e.g. object-position, hover zoom). */
  className?: string;
  /** "cover" fills and crops; "contain" shows the whole shot on a blurred backdrop of itself. */
  fit?: "cover" | "contain";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(video?.mp4 || video?.webm);
  const poster = video?.poster || image;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true; // React doesn't always set the `muted` attribute; browsers only autoplay muted video.

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = false;

    const sync = () => {
      if (visible && !reducedMotion.matches && !saveData && !document.hidden) el.play().catch(() => {});
      else el.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Small tolerance: browsers can report 0.3999… when crossing the 0.4 threshold.
        visible = entry.intersectionRatio >= VISIBLE_RATIO - 0.01;
        sync();
      },
      { threshold: [0, VISIBLE_RATIO] }
    );
    observer.observe(el);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [hasVideo]);

  const contain = fit === "contain";
  const media = (
    <>
      {poster && (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className={contain ? "object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]" : cn("object-cover object-top", className)}
        />
      )}
      {hasVideo && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn(
            "absolute inset-0 size-full transition-opacity duration-500",
            contain ? "object-contain" : "object-cover",
            playing ? "opacity-100" : "opacity-0",
            !contain && className
          )}
        >
          {/* WebM (VP9) is smaller; browsers that can't play it fall through to the MP4. */}
          {video?.webm && <source src={video.webm} type="video/webm" />}
          {video?.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      )}
    </>
  );

  if (!contain || !poster) return media;

  // Contain: the whole shot, never cropped, floating on a blurred glow of itself, so any
  // aspect ratio sits in the fixed frame without empty bars.
  return (
    <>
      <Image src={poster} alt="" aria-hidden="true" fill sizes="96px" className="scale-125 object-cover opacity-80 blur-2xl saturate-150" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25" aria-hidden="true" />
      <div className={cn("absolute inset-[6%]", className)}>{media}</div>
    </>
  );
}
