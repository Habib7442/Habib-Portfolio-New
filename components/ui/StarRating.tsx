"use client";

import { useState, useSyncExternalStore } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
const STORAGE_KEY = "habibfolio-ratings";

function readStored(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const emptySubscribe = () => () => {};

/**
 * Interactive 5-star vote. Posts to the admin app's /api/rate (a different origin),
 * so "already voted" is a client-side nicety via localStorage, not an enforced guarantee —
 * the server can't reliably see a cross-site cookie here.
 */
export default function StarRating({ id, ratingCount, ratingTotal }: { id: string; ratingCount: number; ratingTotal: number }) {
  const [stats, setStats] = useState({ count: ratingCount, total: ratingTotal });
  // Read the stored vote via useSyncExternalStore, not useState+useEffect, so the server
  // snapshot (undefined — SSR has no localStorage) and the client's first paint agree.
  const storedMine = useSyncExternalStore(emptySubscribe, () => readStored()[id], () => undefined);
  const [justVoted, setJustVoted] = useState<number | undefined>();
  const mine = justVoted ?? storedMine;
  const [hover, setHover] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const avg = stats.count ? stats.total / stats.count : 0;
  const shown = hover || mine || Math.round(avg);

  async function vote(stars: number) {
    if (mine || busy || !ADMIN_URL) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${ADMIN_URL}/api/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stars }),
      });
      const data = await res.json();
      if (res.ok) {
        setStats({ count: data.ratingCount, total: data.ratingTotal });
        setJustVoted(stars);
        const all = readStored();
        all[id] = stars;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } else {
        setError(data.error ?? "Could not save your rating");
      }
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2" onMouseLeave={() => setHover(0)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={!!mine || busy}
            aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => !mine && setHover(n)}
            onClick={() => vote(n)}
            className={cn("p-0.5", !mine && "cursor-pointer hover:scale-110 transition-transform", mine && "cursor-default")}
          >
            <Star className={cn("size-4", n <= shown ? "fill-gold text-gold" : "text-fg-subtle")} />
          </button>
        ))}
      </div>
      <span className="text-xs font-medium text-fg-muted">
        {stats.count ? `${avg.toFixed(1)} (${stats.count})` : "Be the first to rate"}
      </span>
      {error && <span className="text-xs font-medium text-accent-hover">{error}</span>}
    </div>
  );
}
