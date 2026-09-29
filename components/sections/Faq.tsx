import { Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Faq as FaqItem } from "@/lib/faq";

/**
 * Visible FAQ (answer-engine friendly). Native <details> keeps every answer in the server HTML,
 * so crawlers that don't run JavaScript still read them; mirrored in FAQPage JSON-LD.
 */
export default function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section id="faq" className="border-t border-border py-20 md:py-28">
      <div className="container-app grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-4 text-accent-hover">✦ FAQ</p>
          <h2 className="font-serif text-display-md leading-[1.05]">Questions, answered</h2>
          <p className="mt-4 max-w-xs text-fg-muted">The things people usually ask before we start working together.</p>
        </Reveal>

        <div className="border-t border-border lg:col-span-8">
          {faqs.map((f, i) => (
            <details key={f.question} className="group border-b border-border" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="flex-1 font-display text-lg font-semibold tracking-tight md:text-xl">{f.question}</h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-all group-open:rotate-45 group-open:border-sun group-open:bg-sun">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-fg-muted md:text-lg">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
