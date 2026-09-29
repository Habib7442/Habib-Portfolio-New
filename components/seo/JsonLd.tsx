/**
 * Server-rendered JSON-LD. AI crawlers don't run JavaScript, so structured data must be in the HTML.
 * `<` is escaped so content coming from Sanity can never close the script tag early.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
