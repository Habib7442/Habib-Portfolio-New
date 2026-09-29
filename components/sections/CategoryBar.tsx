import Link from "next/link";

/** Horizontal row of tabs with counts — stays side by side on every screen size. */
export default function CategoryBar({ items }: { items: { label: string; shortLabel?: string; count: number; href: string }[] }) {
  const visible = items.filter((i) => i.count > 0);
  if (visible.length === 0) return null;

  return (
    <div className="border-b border-border bg-bg-elevated">
      <div
        className="container-app grid divide-x divide-border px-0 md:px-10"
        style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}
      >
        {visible.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex min-w-0 items-center justify-center gap-0.5 px-1.5 py-4 text-center transition-colors hover:bg-bg-muted md:gap-1 md:px-2 md:py-5"
          >
            <span className="eyebrow whitespace-nowrap text-[0.62rem] tracking-[0.08em] text-fg group-hover:text-accent-hover md:text-[0.72rem] md:tracking-[0.14em]">
              {item.shortLabel ? (
                <>
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </>
              ) : (
                item.label
              )}
            </span>
            <sup className="text-[0.6rem] font-semibold text-accent-hover md:text-[0.7rem]">{item.count}</sup>
          </Link>
        ))}
      </div>
    </div>
  );
}
