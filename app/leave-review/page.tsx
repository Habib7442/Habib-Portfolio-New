"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase";
import { Send, CheckCircle2 } from "lucide-react";

export default function LeaveReviewPage() {
  const [formData, setFormData] = useState({
    client_name: "",
    role: "",
    company: "",
    review: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
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
          },
        ]);

      if (insertError) throw insertError;

      setIsSuccess(true);
      setFormData({ client_name: "", role: "", company: "", review: "", rating: 5 });
    } catch (err: any) {
      console.error("Error submitting review:", err.message);
      setError("Something went wrong. Please try again.");
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
      <main className="w-full min-h-screen text-[#111] bg-[#FDFBF7] pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 flex justify-center">
          <div className="w-full max-w-3xl flex flex-col items-center">
            
            <div className="w-full text-center mb-16 relative">
              <h1 className="text-4xl md:text-6xl font-syne font-bold text-[#111] uppercase tracking-tighter mb-4">
                Leave a <span className="text-[#C084FC]">Review</span>
              </h1>
              <p className="font-mono text-lg text-[#555] font-bold">
                I'd love to hear about your experience working with me.
              </p>
            </div>

            <div className="w-full bg-white border-3 border-black shadow-[8px_8px_0px_#111] rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {isSuccess ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-20 h-20 bg-[#BBF7D0] border-3 border-black shadow-[4px_4px_0px_#000] rounded-full flex items-center justify-center mb-6 rotate-[10deg]">
                    <CheckCircle2 size={40} className="text-[#111]" />
                  </div>
                  <h2 className="text-3xl font-syne font-bold mb-4">You're Awesome!</h2>
                  <p className="font-inter text-lg text-[#444] font-medium">
                    Thank you so much for your feedback. It means the world to me.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 bg-[#67E8F9] px-6 py-3 border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all font-bold"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  {error && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 rounded-lg font-bold shadow-[4px_4px_0px_#ff000030]">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-syne font-bold text-lg">Your Name *</label>
                      <input 
                        type="text" 
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleChange}
                        required
                        className="bg-[#FDFBF7] border-2 border-black p-4 outline-none focus:shadow-[4px_4px_0px_#C084FC] transition-shadow font-inter placeholder:text-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-syne font-bold text-lg">Your Role / Title</label>
                      <input 
                        type="text" 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="bg-[#FDFBF7] border-2 border-black p-4 outline-none focus:shadow-[4px_4px_0px_#C084FC] transition-shadow font-inter placeholder:text-gray-400"
                        placeholder="CEO or Founder"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-syne font-bold text-lg">Company Name</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-[#FDFBF7] border-2 border-black p-4 outline-none focus:shadow-[4px_4px_0px_#C084FC] transition-shadow font-inter placeholder:text-gray-400"
                        placeholder="Acme Corp"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-syne font-bold text-lg">Rating</label>
                      <select 
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="bg-[#FDFBF7] border-2 border-black p-4 outline-none focus:shadow-[4px_4px_0px_#C084FC] transition-shadow font-inter cursor-pointer appearance-none"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ (4/5)</option>
                        <option value="3">⭐⭐⭐ (3/5)</option>
                        <option value="2">⭐⭐ (2/5)</option>
                        <option value="1">⭐ (1/5)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label className="font-syne font-bold text-lg">Your Review *</label>
                    <textarea 
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-[#FDFBF7] border-2 border-black p-4 outline-none focus:shadow-[4px_4px_0px_#C084FC] transition-shadow font-inter resize-none placeholder:text-gray-400"
                      placeholder="Working with Habib was..."
                    />
                  </div>

                  <div className="mt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-[#FDE047] disabled:opacity-50 border-2 border-black px-8 py-4 text-[#111] font-bold text-lg flex items-center justify-center gap-3 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 transition-all"
                    >
                      {isSubmitting ? "Submitting..." : "Send Review"}
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
