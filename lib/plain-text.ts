// Seeded drafts start with "[Placeholder] …" so an unedited one never reaches a card.
const PLACEHOLDER = /^\s*\[placeholder\]/i;

// A full stop after these isn't the end of a sentence ("Dr. Abhishek Ray", "Ridgeline Roofing Co.").
const ABBREVIATIONS = new Set(["dr", "mr", "mrs", "ms", "st", "co", "inc", "ltd", "vs", "e.g", "i.e", "etc", "no"]);

/** First sentence of `text`, whitespace collapsed. Returns the whole text if it has no sentence break. */
export function firstSentence(text?: string) {
  const t = (text ?? "").replace(/\s+/g, " ").trim();
  const breaks = /[.!?](?=\s+["'“A-Z0-9])/g;
  for (let m = breaks.exec(t); m; m = breaks.exec(t)) {
    const word = t.slice(0, m.index).split(" ").pop()!.toLowerCase();
    if (!ABBREVIATIONS.has(word)) return t.slice(0, m.index + 1);
  }
  return t;
}

/**
 * What a card says: the business-owner `plainDescription` when it's been written,
 * otherwise the first sentence of the longer description.
 */
export function cardDescription(plain?: string, fallback?: string) {
  if (plain?.trim() && !PLACEHOLDER.test(plain)) return plain.trim();
  return firstSentence(fallback) || undefined;
}
