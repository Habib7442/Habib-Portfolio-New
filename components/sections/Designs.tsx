"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { FreeMode, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function Designs({ designs }: { designs: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasInteracted, setHasInteracted] = useState(false);

  if (!designs || designs.length === 0) return null;

  return (
    <section
      id="designs"
      ref={ref}
      className="relative z-20 overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "64px",
        paddingBottom: "64px",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div className="container-editorial mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-4">03 / Visual &amp; AI Design</p>
          <p
            className="text-base max-w-md"
            style={{ color: "var(--fg-muted)" }}
          >
            Posters, brand systems, and AI compositing work. Some commissioned,
            some experiments.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/work" className="arrow-link">
            View archive <span>→</span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pl-6 md:pl-8 cursor-grab active:cursor-grabbing"
        onMouseDown={() => setHasInteracted(true)}
        onTouchStart={() => setHasInteracted(true)}
      >
        <Swiper
          modules={[FreeMode, Mousewheel, Keyboard]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={true}
          keyboard={{ enabled: true }}
          mousewheel={{
            forceToAxis: true,
          }}
          className="!overflow-visible"
        >
          {designs.slice(0, 10).map((design) => (
            <SwiperSlide
              key={design.id}
              className="!w-[260px] md:!w-[360px]"
            >
              <div className="group flex flex-col gap-3">
                {/* Image container */}
                <div
                  className="w-full aspect-[4/5] overflow-hidden relative"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={design.image_url}
                    alt={design.description || design.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Category tag */}
                  {design.category && (
                    <span
                      className="absolute top-3 left-3 eyebrow px-2 py-1"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderRadius: "4px",
                        fontSize: "10px",
                      }}
                    >
                      {design.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="font-display text-lg leading-tight"
                  style={{ color: "var(--fg)", letterSpacing: "-0.01em" }}
                >
                  {design.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Drag affordance */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: hasInteracted ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="container-editorial mt-6"
      >
        <p className="eyebrow" style={{ fontSize: "10px" }}>
          drag →
        </p>
      </motion.div>
    </section>
  );
}
