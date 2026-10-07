import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import WorkCard from "@/components/ui/WorkCard";
import { cardDescription } from "@/lib/plain-text";
import type { Product } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const STATUS: Record<Product["status"], { label: string; className: string }> = {
  live: { label: "Live", className: "bg-sun text-fg" },
  beta: { label: "Beta", className: "bg-bg-elevated/95 text-fg" },
  hackathon: { label: "Hackathon", className: "bg-forest text-on-forest" },
};

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Products Habib built and runs himself. Hidden until at least one is published in Sanity. */
export default function Products({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section id="products" className="border-t border-border py-20 md:py-28">
      <div className="container-app">
        <Reveal className="mb-10 md:mb-14">
          <p className="eyebrow mb-4 text-accent-hover">✦ Products</p>
          <h2 className="font-display text-display-md font-bold leading-[1.05] tracking-tight">Things I&apos;ve built for myself</h2>
          <p className="mt-4 max-w-md text-fg-muted">Products I designed, built and run myself.</p>
        </Reveal>

        <div className={cn("grid gap-6 sm:grid-cols-2", products.length >= 3 && "lg:grid-cols-3")}>
          {products.map((p, i) => {
            const status = STATUS[p.status] ?? STATUS.live;
            return (
              <Reveal key={p._id} delay={i * 0.05} className="h-full">
                <WorkCard
                  href={p.link}
                  external
                  image={p.imageUrl}
                  video={p.video}
                  alt={p.imageAlt || p.name}
                  sizes="(min-width: 1568px) 480px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  title={p.name}
                  description={cardDescription(p.plainDescription, p.oneLiner)}
                  badges={<span className={cn("eyebrow rounded-full px-3 py-1.5 text-[0.58rem] shadow-sm", status.className)}>{status.label}</span>}
                  footer={
                    <p className="eyebrow inline-flex items-center gap-1 text-[0.62rem] text-fg-subtle">
                      {hostname(p.link)} <ArrowUpRight className="size-3" />
                    </p>
                  }
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
