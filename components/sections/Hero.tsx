"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import XIcon from "@/components/ui/XIcon";
import { SparkStar } from "@/components/ui/Marquee";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import { imgUrl, type SiteSettings } from "@/lib/sanity";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ settings }: { settings: SiteSettings }) {
  const fullName = settings.name || "Habib Tanwir";
  const [first, ...rest] = fullName.split(" ");
  const tagline = settings.tagline || "I help business owners get more customers — with websites that actually sell.";
  const portrait = settings.profileUrl ? imgUrl(settings.profileUrl, 900) : "/habib.webp";

  const socials = [
    { href: settings.githubUrl, label: "GitHub", icon: Github },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    { href: settings.twitterUrl, label: "X", icon: XIcon },
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative overflow-hidden bg-forest text-on-forest">
      {/* ── Phones & tablets: one simple centered column ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="container-app flex flex-col items-center pt-28 pb-16 text-center lg:hidden"
      >
        <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-t-full bg-forest-deep">
          <Image src={portrait} alt={fullName} fill priority sizes="176px" className="object-cover object-top" />
        </div>

        <p className="eyebrow mt-8 text-sun">Hello, I&apos;m</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">{fullName}</h1>
        <p className="eyebrow mt-4 text-on-forest-muted">Web developer &amp; designer</p>

        <p className="mt-6 max-w-xs text-lg leading-relaxed text-on-forest/85">{tagline}</p>

        <div className="mt-9 flex w-full max-w-xs flex-col gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center justify-center gap-2 rounded-full bg-sun px-6 py-4 text-fg">
            <WhatsAppIcon className="size-4" />
            Contact me
          </a>
          <Link href="/work" className="eyebrow rounded-full border border-on-forest/30 px-6 py-4 text-on-forest">
            See my work
          </Link>
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full border border-on-forest/25 transition-colors hover:bg-on-forest hover:text-forest"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Desktop: name / portrait / pitch, vertically centred on the portrait, then a meta strip.
           justify-between hands leftover width out equally, so the gaps either side of the portrait always match. ── */}
      <div className="container-app hidden pt-32 pb-16 lg:block">
        <div className="flex items-center justify-between gap-10">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="shrink-0"
          >
            <p className="eyebrow mb-5 text-sun">Hello, I&apos;m</p>
            <h1 className="font-serif text-display-xl leading-[0.92] xl:text-[clamp(6rem,7vw,8rem)]">
              {first}
              {rest.length > 0 && (
                <>
                  <br />
                  {rest.join(" ")}
                </>
              )}
            </h1>
            <div className="mt-8 flex items-start gap-3">
              <span className="mt-2 h-0.5 w-8 shrink-0 bg-accent" />
              <p className="eyebrow leading-relaxed text-on-forest-muted">
                Web developer
                <br />
                &amp; designer
              </p>
            </div>
          </motion.div>

          {/* Arch portrait */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            // Width follows viewport height (4:5 arch) so the whole hero, meta strip included, fits above the fold.
            className="relative z-10 w-[max(18rem,min(26rem,32vw,calc((100svh_-_21rem)*0.8)))] shrink-0"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-forest-deep">
              <Image src={portrait} alt={fullName} fill priority sizes="(min-width: 1280px) 416px, 33vw" className="object-cover object-top" />
            </div>
            {/* Spark rides with the portrait and lands on the meta-strip rule 4rem below (mt-16), centred under it */}
            <span className="absolute top-[calc(100%+2.625rem)] left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-bg shadow-md">
              <SparkStar className="size-4 text-fg" />
            </span>
          </motion.div>

          {/* Pitch + actions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="min-w-0 basis-[30rem]"
          >
            <p className="font-serif text-[2rem] leading-snug">
              <span className="text-accent">&ldquo;</span>
              {tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-6 py-4 text-fg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <WhatsAppIcon className="size-4" />
                Contact me
              </a>
              <Link
                href="/work"
                className="group eyebrow inline-flex items-center gap-2 rounded-full border border-on-forest/30 px-6 py-4 text-on-forest transition-colors hover:border-on-forest"
              >
                See my work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="mt-16 flex items-center justify-between border-t border-on-forest/15 pt-8"
        >
          <p className="eyebrow flex items-center gap-3 text-on-forest-muted">
            <span className="size-2 rounded-full bg-sun" />
            Taking on new client projects — Assam &amp; worldwide
          </p>

          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-on-forest/25 transition-colors hover:bg-on-forest hover:text-forest"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
