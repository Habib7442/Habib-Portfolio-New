import { cn } from "@/lib/utils";

export default function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-[0.68rem] text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
