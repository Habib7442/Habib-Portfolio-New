import { cn } from "@/lib/utils";

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4 shrink-0 text-accent", className)}>
      <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export { Star as SparkStar };

/** Infinite horizontal strip. Items alternate upright / italic serif, like the reference. */
export default function Marquee({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  const row = (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6">
          <span className={cn("font-serif whitespace-nowrap text-2xl md:text-3xl", i % 2 === 1 && "italic")}>{item}</span>
          <Star />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden border-y border-border py-4 md:py-5", className)}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
