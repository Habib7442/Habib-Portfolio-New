'use client'

/**
 * next/image loader. Sanity images are resized by Sanity's own CDN at exactly the width the
 * browser asks for (one compression pass, sharp on retina). Anything else is a pre-optimised
 * local file in /public and is served as-is.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('https://cdn.sanity.io/')) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality ?? 85))
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'max')
    return url.toString()
  }
  // Local files: width is ignored, but must appear in the URL so each srcset entry is distinct.
  return `${src}?w=${width}`
}
