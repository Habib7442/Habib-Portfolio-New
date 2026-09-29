import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SkillIcons from "@/components/ui/SkillIcons";
import type { SiteSettings } from "@/lib/sanity";

export default function About({ settings }: { settings: SiteSettings }) {
  const name = (settings.name || "Habib Tanwir").split(" ")[0];
  const intro =
    settings.bio ||
    `Hi, I'm ${name}. I build websites and apps, and I design the things that go with them — landing pages, posters and social media posts.`;

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-app grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-4 text-accent-hover">✦ About me</p>
          <h2 className="font-serif text-display-md leading-[1.05]">A little about me</h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-10 lg:col-span-8">
          <div className="flex flex-col gap-5">
            <p className="whitespace-pre-line text-lg leading-relaxed text-fg md:text-xl">{intro}</p>
            <p className="text-lg leading-relaxed text-fg-muted">
            I like keeping things simple: clean code, clear design, and work that actually helps a business grow.
            </p>
          </div>

          <a
            href="https://www.locallifyagency.com/"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-6 rounded-3xl bg-forest p-7 text-on-forest transition-transform hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between md:p-10"
          >
            <div>
              <p className="eyebrow mb-2 text-sun">Founder</p>
              <p className="font-serif text-3xl">Locallify Agency</p>
              <p className="mt-2 max-w-md text-on-forest-muted">
                A software studio in Silchar, Assam. We build web apps, mobile apps and AI tools for clients around the world.
              </p>
            </div>
            <span className="eyebrow inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-sun px-4 py-2.5 text-fg sm:self-center">
              Visit website <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          <div>
            <p className="eyebrow mb-5 text-fg-subtle">What I work with</p>
            <SkillIcons />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
