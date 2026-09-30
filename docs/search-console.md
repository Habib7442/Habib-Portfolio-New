# Google Search Console & Bing — setup for habibtanwir.com

Everything search engines need is already built into the site:

| URL | What it is |
|---|---|
| `https://www.habibtanwir.com/sitemap.xml` | Every page, project and blog post, with last-updated dates and images. Updates itself hourly from Sanity. |
| `https://www.habibtanwir.com/robots.txt` | Lets Google, Bing and AI search crawlers in, and points them to the sitemap. |
| `https://www.habibtanwir.com/manifest.webmanifest` | Site name, colours and icon. |
| `https://www.habibtanwir.com/llms.txt` | Summary for AI search engines (ChatGPT, Claude, Perplexity). |

Also in place: a canonical URL on every page, structured data (Person, FAQ, projects, blog posts),
a proper 404 page, and `/review` kept out of search.

## Do this after buying the domain and deploying

### 1. Connect the domain in Vercel
Vercel → portfolio project → **Settings → Domains** → add `habibtanwir.com` **and** `www.habibtanwir.com`.
Follow Vercel's DNS instructions at your domain registrar. Make `www.habibtanwir.com` the primary
domain and set `habibtanwir.com` (no www) to **redirect to** it. The site's canonical URLs all use
`www.habibtanwir.com` (`SITE_URL` in `lib/site.ts`), so the primary domain must match — if you ever flip
the primary domain in Vercel, change `SITE_URL` and the `Sitemap:` line in `app/robots.txt` too.
(Don't also add a redirect in `next.config.ts` — that causes a loop.)

### 2. Add the site to Google Search Console
1. Go to <https://search.google.com/search-console> → **Add property**.
2. Choose **Domain** and enter `habibtanwir.com` (this covers www, non-www, http and https in one go).
3. Google shows a **TXT record** like `google-site-verification=abc123…`.
   Add it in your domain registrar's DNS settings (type **TXT**, name/host **@**), then click **Verify**.
   DNS can take a few minutes to a few hours.

   *No DNS access?* Choose **URL prefix** instead, pick **HTML tag**, and copy only the code from
   `content="…"`. Put it in Vercel as `GOOGLE_SITE_VERIFICATION=<code>`, redeploy, then click **Verify**.

### 3. Submit the sitemap
Search Console → **Sitemaps** → enter `sitemap.xml` → **Submit**. Status should turn to **Success**.

### 4. Ask Google to index the main pages (optional, speeds things up)
Search Console → **URL inspection** → paste each URL → **Request indexing**:
- `https://www.habibtanwir.com/`
- `https://www.habibtanwir.com/work`
- `https://www.habibtanwir.com/blogs`

### 5. Bing Webmaster Tools (also feeds ChatGPT search and DuckDuckGo)
Go to <https://www.bing.com/webmasters> → **Import from Google Search Console** (fastest), or add the
site manually and verify with the meta tag: put the code in Vercel as `BING_SITE_VERIFICATION=<code>`
and redeploy. Then submit `https://www.habibtanwir.com/sitemap.xml` there too.

## Checking it works
- `https://www.habibtanwir.com/robots.txt` and `/sitemap.xml` open in the browser.
- Search Console → **Pages** starts listing indexed pages within a few days.
- Test a page's structured data: <https://search.google.com/test/rich-results>.
- Test the share preview: <https://www.opengraph.xyz> (paste your URL).

It's normal for a new domain to take 1–4 weeks to appear in search results.
