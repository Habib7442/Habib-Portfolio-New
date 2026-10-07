"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { imgUrl } from "@/lib/sanity";
import { cn } from "@/lib/utils";

export type Service = { title: string; description: string; points: string[]; imageUrl?: string };

export default function Services({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="border-t border-border py-20 md:py-28">
      <div className="container-app">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4 text-accent-hover">✦ Services</p>
            <h2 className="font-display text-display-md font-bold leading-[1.02] tracking-tight">My services</h2>
          </div>
          <p className="max-w-md text-fg-muted md:justify-self-end">
            One person from idea to launch — the product, the page that sells it, and the visuals around it.
          </p>
        </div>

        <div className="border-t border-border">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.title} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-6 text-left md:py-7"
                >
                  <span className="eyebrow w-8 shrink-0 text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("flex-1 font-display text-2xl font-semibold tracking-tight transition-colors md:text-3xl", isOpen && "text-accent-hover")}>
                    {s.title}
                  </span>
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all",
                      isOpen ? "rotate-45 border-sun bg-sun" : "border-border"
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-8 pl-0 md:grid-cols-2 md:pl-13">
                        <div>
                          <p className="text-fg-muted md:text-lg">{s.description}</p>
                          <ul className="mt-5 space-y-2">
                            {s.points.map((pt) => (
                              <li key={pt} className="flex items-center gap-3 text-sm">
                                <span className="size-1.5 rounded-full bg-accent" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {s.imageUrl && (
                          // object-contain: show the whole piece — tall posters and wide screenshots both fit uncropped
                          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-alt">
                            <Image src={imgUrl(s.imageUrl, 800)} alt={s.title} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-contain p-3" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
