"use client";

import { useRef, useState, type FormEvent } from "react";
import { Camera, Check, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;
const MAX_SIDE = 800;

/** Resize to at most 800px and re-encode as JPEG, so uploads are small and fast. */
async function shrinkPhoto(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
  if (!blob) throw new Error("encode failed");
  return blob;
}

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [length, setLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPhoto(file?: File) {
    setError("");
    if (!file) return;
    try {
      const small = await shrinkPhoto(file);
      setPhoto(small);
      setPreview(URL.createObjectURL(small));
    } catch {
      setError("Couldn't read that photo. Please try a JPG or PNG.");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removePhoto() {
    setPhoto(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!rating) return setError("Please choose a star rating.");
    if (!ADMIN_URL) return setError("Reviews aren't configured yet.");

    const src = new FormData(formEl);
    const body = new FormData();
    for (const key of ["name", "role", "review", "website"]) body.set(key, String(src.get(key) ?? ""));
    body.set("rating", String(rating));
    body.set("consent", src.get("consent") ? "yes" : "no");
    if (photo) body.set("photo", photo, "photo.jpg");

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${ADMIN_URL}/api/review`, { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-sun">
          <Check className="size-7" />
        </span>
        <h2 className="mt-6 font-serif text-3xl">Thank you!</h2>
        <p className="mt-3 max-w-sm text-fg-muted">
          Your review has been sent. It will appear on the site once I&apos;ve had a look at it.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-forest";
  const shown = hover || rating;

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate={false}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Rating */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          Your rating <span className="text-accent-hover">*</span>
        </legend>
        <div className="flex items-center gap-3">
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="peer sr-only"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                />
                <Star
                  className={cn(
                    "size-9 rounded transition-transform hover:scale-110 peer-focus-visible:outline-2 peer-focus-visible:outline-accent",
                    n <= shown ? "fill-gold text-gold" : "text-border-strong"
                  )}
                />
              </label>
            ))}
          </div>
          <span className="text-sm font-medium text-fg-muted">{RATING_LABELS[shown]}</span>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Your name <span className="text-accent-hover">*</span>
          </span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="e.g. Priya Sharma" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            Role or company <span className="text-fg-subtle">(optional)</span>
          </span>
          <input name="role" maxLength={100} autoComplete="organization-title" className={field} placeholder="e.g. Founder, Acme Studio" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>
            Your review <span className="text-accent-hover">*</span>
          </span>
          <span className="text-xs font-normal text-fg-subtle">{length}/1000</span>
        </span>
        <textarea
          name="review"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          onChange={(e) => setLength(e.target.value.length)}
          className={cn(field, "resize-none")}
          placeholder="What was it like working together? What did you like about the result?"
        />
      </label>

      {/* Optional photo */}
      <div>
        <span className="mb-2 block text-sm font-medium">
          Your photo <span className="text-fg-subtle">(optional)</span>
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border-strong bg-bg-alt text-fg-subtle transition-colors hover:border-forest hover:text-forest"
            aria-label={preview ? "Change photo" : "Add a photo"}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Your photo" className="size-full object-cover" />
            ) : (
              <Camera className="size-6" />
            )}
          </button>
          <div className="text-sm">
            <button type="button" onClick={() => fileRef.current?.click()} className="font-medium text-fg hover:text-accent-hover">
              {preview ? "Change photo" : "Add a photo"}
            </button>
            {preview && (
              <button type="button" onClick={removePhoto} className="ml-4 inline-flex items-center gap-1 text-fg-muted hover:text-fg">
                <X className="size-3.5" /> Remove
              </button>
            )}
            <p className="mt-1 text-fg-subtle">JPG, PNG or WebP. Shown next to your review.</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="hidden"
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-fg-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 accent-[var(--color-forest)]" />
        <span>I agree that my review, name and photo (if added) can be shown on habibtanwir.com.</span>
      </label>

      {error && <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-hover">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-forest px-7 py-4 font-medium text-on-forest transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
