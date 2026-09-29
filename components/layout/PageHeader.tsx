import { SparkStar } from "@/components/ui/Marquee";

/** Forest-green band that opens every inner page, so the transparent navbar always sits on green. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-14 text-on-forest md:pt-40 md:pb-20">
      <div className="container-app">
        <p className="eyebrow mb-5 flex items-center gap-2 text-sun">
          <SparkStar className="size-3" /> {eyebrow}
        </p>
        <h1 className="max-w-4xl font-serif text-display-lg leading-[1.02]">{title}</h1>
        {intro && <p className="post-lede mt-6 max-w-xl text-lg text-on-forest-muted">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
