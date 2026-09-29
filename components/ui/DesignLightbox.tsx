"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imgUrl } from "@/lib/sanity";

export default function DesignLightbox({
  images,
  title,
  children,
}: {
  images: string[];
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="block w-full text-left"
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            >
              <X className="size-7" />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full max-w-4xl flex-col items-center gap-4"
            >
              <div className="relative max-h-[75vh] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl(images[index], 1600)}
                  alt={`${title} — image ${index + 1} of ${images.length}`}
                  className="max-h-[75vh] w-full rounded-md object-contain"
                />
              </div>
              <p className="eyebrow text-white/60">{title}</p>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 -translate-x-14 -translate-y-1/2 text-white/60 hover:text-white transition-colors max-lg:hidden"
                  >
                    <ChevronLeft className="size-8" />
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 translate-x-14 -translate-y-1/2 text-white/60 hover:text-white transition-colors max-lg:hidden"
                  >
                    <ChevronRight className="size-8" />
                  </button>
                  <div className="flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className={`size-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/30"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Re-export for pages that only need the static thumbnail treatment.
export function DesignThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={imgUrl(src, 700)}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}
