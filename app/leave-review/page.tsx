"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase";
import { Upload } from "lucide-react";

export default function LeaveReviewPage() {
  const [formData, setFormData] = useState({
    client_name: "",
    role: "",
    company: "",
    review: "",
    rating: 5,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let avatar_url = "";

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (uploadError) throw new Error("Failed to upload avatar image.");

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        avatar_url = publicUrl;
      }

      const { error: insertError } = await supabase
        .from("testimonials")
        .insert([
          {
            client_name: formData.client_name,
            role: formData.role,
            company: formData.company,
            review: formData.review,
            rating: formData.rating,
            featured: false,
            avatar_url: avatar_url || null,
          },
        ]);

      if (insertError) throw insertError;

      setIsSuccess(true);
      setFormData({ client_name: "", role: "", company: "", review: "", rating: 5 });
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "var(--bg)" }}>
        <section className="pt-40 pb-24">
          <div className="container-editorial">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="mb-16">
                <p className="eyebrow mb-6">Review / Feedback</p>
                <h1 className="text-display-xl font-display italic leading-none mb-8" style={{ color: "var(--fg)" }}>
                  Leave a Review
                </h1>
                <p className="text-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  Your feedback helps me refine my process and deliver better results. I'd love to hear about our collaboration.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-20 border-t border-[var(--border-color)]">
                  <h2 className="text-3xl font-display italic mb-6" style={{ color: "var(--fg)" }}>Thank you for your feedback.</h2>
                  <p className="text-lg mb-10" style={{ color: "var(--fg-muted)" }}>It means a lot to have your perspective on our work together.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="arrow-link"
                  >
                    Submit another <span>→</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12 pt-12 border-t border-[var(--border-color)]">
                  {error && (
                    <div className="p-4 text-sm bg-red-50 text-red-600 border border-red-100 rounded-sm italic">
                      {error}
                    </div>
                  )}

                  {/* Avatar Upload */}
                  <div className="flex flex-col gap-6">
                    <p className="eyebrow" style={{ fontSize: "10px" }}>Profile Photo (Optional)</p>
                    <div className="relative group w-24 h-24">
                      <div className="w-full h-full rounded-full border border-[var(--border-color)] overflow-hidden bg-[var(--bg-card)] flex items-center justify-center transition-colors group-hover:border-[var(--accent)]">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload size={24} style={{ color: "var(--fg-subtle)" }} />
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    <div className="flex flex-col gap-3">
                      <label className="eyebrow" style={{ fontSize: "10px" }}>Full Name *</label>
                      <input 
                        type="text" 
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-transparent border-b border-[var(--border-color)] py-2 outline-none focus:border-[var(--accent)] transition-colors text-lg"
                        style={{ color: "var(--fg)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="eyebrow" style={{ fontSize: "10px" }}>Role / Title</label>
                      <input 
                        type="text" 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Founder @ Acme"
                        className="bg-transparent border-b border-[var(--border-color)] py-2 outline-none focus:border-[var(--accent)] transition-colors text-lg"
                        style={{ color: "var(--fg)" }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="eyebrow" style={{ fontSize: "10px" }}>Rating</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className={`text-2xl transition-all ${formData.rating >= star ? 'opacity-100 scale-110' : 'opacity-20 grayscale'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="eyebrow" style={{ fontSize: "10px" }}>Your Review *</label>
                    <textarea 
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Working with Habib was..."
                      className="bg-transparent border border-[var(--border-color)] p-4 outline-none focus:border-[var(--accent)] transition-colors text-lg leading-relaxed rounded-sm"
                      style={{ color: "var(--fg)" }}
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-12 py-5 bg-[var(--accent)] text-white font-medium transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] active:scale-[0.98]"
                      style={{ borderRadius: "2px" }}
                    >
                      {isSubmitting ? "Submitting..." : "Send Review"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
