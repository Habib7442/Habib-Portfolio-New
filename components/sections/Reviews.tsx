"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Reviews({ testimonials: dbTestimonials }: { testimonials?: any[] }) {
  const fallbackTestimonials = [
    {
      client_name: "Marcus Aurelius",
      role: "CEO at StoicLabs",
      review: "Habib delivered a product that didn't just meet our specs—it redefined them. His attention to detail and aesthetic sensibility is top-tier. A true 10x developer.",
      rating: 5,
    },
    {
      client_name: "Elena Rodriguez",
      role: "Founder, Flerid",
      review: "Working with Habib has been transformative. He brings a rare combination of robust backend engineering and pixel-perfect frontend execution to the table.",
      rating: 5,
    },
    {
      client_name: "David Chen",
      role: "CTO, NextGen Agency",
      review: "Finding full-stack developers who actually care about user experience is rare. Habib perfectly balances performance, architecture, and beautiful, fluid design.",
      rating: 5,
    },
    {
      client_name: "Sophia Sterling",
      role: "Head of Product, Vercast",
      review: "His code is clean, his UI is gorgeous, and he communicates like a true professional. Worth every penny and more. Highly recommended for complex builds.",
      rating: 5,
    },
    {
      client_name: "James Thorne",
      role: "Director, Axonic",
      review: "Absolutely blew us away with the mobile app delivery. Smooth, fast, and gorgeous interface. Habib is an exceptionally gifted engineer.",
      rating: 5,
    },
  ];

  const displayTestimonials = (dbTestimonials && dbTestimonials.length > 0) ? dbTestimonials : fallbackTestimonials;
  const colors = ["bg-[#F472B6]", "bg-[#67E8F9]", "bg-[#FDE047]", "bg-[#BBF7D0]", "bg-[#C084FC]"];

  return (
    <section id="reviews" className="py-32 bg-[#FDFBF7] relative z-20 overflow-hidden border-t-2 border-black">
      <div className="container mx-auto px-6 md:px-12 mb-16 relative">
        <h2 className="text-4xl md:text-6xl font-syne font-bold text-[#111] mb-4 uppercase tracking-tighter z-10 relative">What Clients Say</h2>
        <div className="w-32 h-[4px] bg-[#9333EA] shadow-[2px_2px_0px_#000] rotate-[-2deg]" />
        
        {/* Decorative elements */}
        <div className="absolute right-10 top-0 text-5xl md:text-7xl opacity-80 rotate-[15deg] pointer-events-none drop-shadow-[4px_4px_0px_#111]">
          💬
        </div>
      </div>

      <div className="relative flex overflow-hidden w-full py-8 group">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
        
        <motion.div
           animate={displayTestimonials.length >= 4 ? { x: ["0%", "-50%"] } : { x: "0%" }}
           transition={{
             duration: 40,
             repeat: Infinity,
             ease: "linear",
             repeatType: "loop",
           }}
           className={`flex gap-8 px-4 ${displayTestimonials.length >= 4 ? 'w-max group-hover:[animation-play-state:paused]' : 'w-full justify-center flex-wrap'}`}
        >
          {(displayTestimonials.length >= 4 ? [...displayTestimonials, ...displayTestimonials] : displayTestimonials).map((testimonial, idx) => {
            const themeColor = colors[idx % colors.length];
            return (
              <div
                key={idx}
                className={`flex-shrink-0 w-[280px] sm:w-[400px] md:w-[500px] bg-white border-3 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#111] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#111] transition-all duration-300 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${themeColor} border-l-3 border-b-3 border-black rounded-bl-full opacity-30 pointer-events-none`}></div>
                
                <div className="flex text-[#FDE047] mb-6 drop-shadow-[2px_2px_0px_#111]">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} size={24} fill="currentColor" strokeWidth={1} className="stroke-black" />
                  ))}
                </div>
                <p className="font-inter text-[#222] text-lg leading-relaxed mb-8 italic relative z-10 font-bold whitespace-pre-wrap">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-14 h-14 rounded-full ${themeColor} flex items-center justify-center font-syne font-bold text-xl text-[#111] border-2 border-black shadow-[2px_2px_0px_#000] overflow-hidden`}>
                    {testimonial.avatar_url ? (
                      <img src={testimonial.avatar_url} alt={testimonial.client_name} className="w-full h-full object-cover" />
                    ) : (
                      testimonial.client_name ? testimonial.client_name.charAt(0) : "A"
                    )}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-[#111] text-xl tracking-tighter">
                      {testimonial.client_name}
                    </h4>
                    <p className="font-mono text-xs text-[#555] uppercase tracking-widest mt-1 font-bold">
                      {testimonial.role || "Client"}
                      {testimonial.company ? ` at ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-8 flex justify-center">
        <a 
          href="/leave-review" 
          className="neo-btn text-[#111] font-bold py-3 px-8 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all"
        >
          Leave a Review
        </a>
      </div>
    </section>
  );
}
