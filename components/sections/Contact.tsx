import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import type { SiteSettings } from "@/lib/sanity";

export default function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="bg-forest py-20 text-on-forest md:py-28">
      <div className="container-app grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <span className="font-serif text-7xl leading-none text-accent">&ldquo;</span>
          <h2 className="-mt-4 font-serif text-display-md leading-[1.05]">
            Let&apos;s build something people <span className="italic text-sun">remember</span>
          </h2>
          <p className="mt-6 max-w-sm text-on-forest-muted">
            Full-stack builds, landing pages, posters and brand visuals. Message me on WhatsApp — I usually reply the same day.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 border-b border-sun pb-1 font-serif text-2xl text-on-forest transition-colors hover:text-sun md:text-3xl"
          >
            <WhatsAppIcon className="size-6 text-[#25D366]" />
            Chat on WhatsApp
          </a>
          {settings.email && (
            <p className="mt-5 text-sm text-on-forest-muted">
              Prefer email?{" "}
              <a href={`mailto:${settings.email}`} className="text-on-forest underline underline-offset-4 hover:text-sun">
                {settings.email}
              </a>
            </p>
          )}
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="rounded-[28px] bg-bg-elevated p-6 text-fg md:p-10">
            <p className="eyebrow mb-6 text-sun">✦ Send a message on WhatsApp</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
