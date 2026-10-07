import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { SANITY_TAG } from "@/lib/sanity";

// Pages built from Sanity content. Literal paths, plus every detail page via its route pattern.
const PAGES = ["/", "/work", "/blogs", "/hire", "/sitemap.xml", "/llms.txt", "/llms-full.txt"];
const DETAIL_ROUTES = ["/work/[slug]", "/work/landing/[slug]", "/blogs/[slug]"];

function authorized(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!secret || given.length !== secret.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(secret));
}

/**
 * On-demand revalidation, called by the admin app (a separate deployment, so its own
 * revalidatePath can't reach this site's cache) after every content change.
 * POST with `Authorization: Bearer <REVALIDATE_SECRET>` and an optional JSON body
 * `{ "paths": ["/work/some-slug"] }` for the item's own page.
 */
export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { paths?: unknown };
  const extra = Array.isArray(body.paths)
    ? body.paths.filter((p): p is string => typeof p === "string" && /^\/[\w\-./]*$/.test(p) && !p.includes("..") && p.length <= 200)
    : [];

  // expire: 0 — the next visit waits for fresh data instead of being served the old page once more.
  revalidateTag(SANITY_TAG, { expire: 0 });
  const paths = [...new Set([...PAGES, ...extra])];
  paths.forEach((p) => revalidatePath(p));
  DETAIL_ROUTES.forEach((route) => revalidatePath(route, "page"));

  return Response.json({ revalidated: [...paths, ...DETAIL_ROUTES], at: new Date().toISOString() });
}
