import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { imgUrl, type SiteSettings } from "@/lib/sanity";
import { LOCALLIFY, PERSON_NAME } from "@/lib/site";

/** Short "About me" between the hero and the work: photo, the admin bio, and the Locallify founder link. */
export default function About({ settings }: { settings: SiteSettings }) {
  const name = settings.name || PERSON_NAME;
  const bio =
    settings.bio?.trim() ||
    `Hi, I'm ${name.split(" ")[0]}. I build websites and apps, and I design the landing pages, posters and social media posts that go with them.`;
  const photo = settings.profileUrl ? imgUrl(settings.profileUrl, 320) : "/habib.webp";

  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border py-14 md:py-20">
      {/* Phones: photo + label in a row, text below. md+: photo on the left spanning label and text. */}
      <Reveal className="container-app grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-5 md:gap-x-12 md:gap-y-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-bg-muted md:row-span-2 md:size-32 md:self-center">
          <Image src={photo} alt={name} fill sizes="(min-width: 768px) 128px, 80px" className="object-cover object-top" />
        </div>
        <h2 id="about-heading" className="eyebrow text-accent-hover md:self-end">
          ✦ About me
        </h2>

        <div className="col-span-2 max-w-3xl md:col-span-1 md:col-start-2">
          <p className="whitespace-pre-line text-lg leading-relaxed text-fg md:text-xl">{bio}</p>
          <a
            href={LOCALLIFY.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent-hover"
          >
            Founder of <span className="font-medium text-fg underline decoration-accent underline-offset-4 group-hover:text-accent-hover">{LOCALLIFY.name}</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
