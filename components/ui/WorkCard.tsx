import Link from "next/link";
import VideoPreview from "@/components/ui/VideoPreview";
import type { PreviewVideo } from "@/lib/sanity";

/** Small pill laid over a card's shot ("Live ↗", status…). */
export const cardPill =
  "eyebrow inline-flex items-center gap-1 rounded-full bg-bg-elevated/95 px-3 py-1.5 text-[0.58rem] text-fg shadow-sm backdrop-blur transition-colors hover:bg-sun";

/**
 * Shared frame for project, landing-page and product cards: white card, fixed 16:10 frame
 * with the whole shot (video preview or screenshot, never cropped) floating on a blurred glow
 * of itself, title, one plain-language line, optional footer.
 */
export default function WorkCard({
  href,
  external,
  image,
  video,
  alt,
  sizes,
  badges,
  title,
  description,
  footer,
}: {
  href?: string;
  external?: boolean;
  image?: string;
  video?: PreviewVideo;
  alt: string;
  sizes: string;
  badges?: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  const hasMedia = Boolean(image || video?.mp4 || video?.webm || video?.poster);
  const shot = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
      {hasMedia ? (
        <VideoPreview
          video={video}
          image={image}
          alt={alt}
          sizes={sizes}
          fit="contain"
          className="transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
        />
      ) : (
        // No screenshot yet: the name on a forest panel, so the grid still lines up.
        <div className="flex size-full items-center justify-center bg-forest p-6 text-center font-serif text-3xl text-on-forest" aria-hidden="true">
          {title}
        </div>
      )}
    </div>
  );
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <article className="group h-full rounded-3xl border border-border bg-bg-elevated p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <div className="relative">
        {href ? (
          // The title below is the labelled link; this one is a bigger mouse target only.
          <Link href={href} {...linkProps} tabIndex={-1} aria-hidden="true">
            {shot}
          </Link>
        ) : (
          shot
        )}
        {badges && (
          <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2 [&>*]:pointer-events-auto">
            {badges}
          </div>
        )}
      </div>
      <div className="px-2.5 pt-4 pb-2">
        <h3 className="line-clamp-1 font-display text-base font-semibold tracking-tight text-fg md:text-[1.05rem]">
          {href ? (
            <Link href={href} {...linkProps} className="transition-colors hover:text-accent-hover">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {description && <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">{description}</p>}
        {footer && <div className="mt-4 border-t border-border pt-3.5">{footer}</div>}
      </div>
    </article>
  );
}
