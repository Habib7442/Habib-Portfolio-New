import { cn } from "@/lib/utils";

/**
 * The "ht" monogram. `logo-mark.png` is the glyph on a transparent background, used as a
 * CSS mask so it takes the current text colour (cream on green, ink on white).
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block aspect-[744/730] bg-current", className)}
      style={{
        maskImage: "url(/logo-mark.png)",
        WebkitMaskImage: "url(/logo-mark.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
