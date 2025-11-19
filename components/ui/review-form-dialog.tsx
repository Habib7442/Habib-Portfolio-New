'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, User, Send, Terminal } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ReviewFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  review: string;
  stars: number;
  image: File | null;
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
];

export default function ReviewFormDialog({ isOpen, onClose }: ReviewFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    review: '',
    stars: 5,
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, stars: rating }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRandomAvatar = () => {
    return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Check if Firebase is configured
      const isFirebaseConfigured = process.env.NEXT_PUBLIC_PROJECT_ID && 
                                 process.env.NEXT_PUBLIC_API_KEY;

      const reviewData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        review: formData.review.trim(),
        stars: formData.stars,
        imgurl: imagePreview || getRandomAvatar(),
        timestamp: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
        status: 'pending' // For moderation
      };

      if (isFirebaseConfigured) {
        // Save to Firebase
        await addDoc(collection(db, 'portfolio-reviews'), reviewData);
      } else {
        // Log to console for development
        console.log('Review submission (Firebase not configured):', reviewData);
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          review: '',
          stars: 5,
          image: null
        });
        setImagePreview(null);
        setSubmitStatus('idle');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleStarClick(index + 1)}
        className="focus:outline-none transition-colors duration-200"
      >
        <Star
          size={24}
          className={`${
            index < formData.stars 
              ? 'text-neon-yellow fill-neon-yellow drop-shadow-[0_0_5px_var(--neon-yellow)]' 
              : 'text-gray-600 hover:text-neon-yellow/50'
          }`}
        />
      </button>
    ));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-black/90 border border-neon-blue/50 rounded-none p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Terminal className="text-neon-pink" size={20} />
              <h3 className="text-2xl font-bold font-orbitron text-neon-blue tracking-wider">
                SUBMIT_LOG
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neon-blue/10 text-neon-blue rounded-none transition-colors border border-transparent hover:border-neon-blue/50"
            >
              <X size={20} />
            </button>
          </div>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-neon-green/10 border border-neon-green rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_10px_var(--neon-green)]">
                <Send size={32} className="text-neon-green" />
              </div>
              <h4 className="text-xl font-semibold text-neon-green mb-2 font-orbitron tracking-wide">TRANSMISSION_COMPLETE</h4>
              <p className="text-foreground/70 font-vt323 text-lg">
                &gt; Review logged successfully. Pending admin approval.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-black/50 border border-neon-blue/30 flex items-center justify-center mx-auto mb-3 group relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <User size={32} className="text-neon-blue" />
                  )}
                  <div className="absolute inset-0 bg-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <label className="cursor-pointer inline-flex items-center space-x-2 text-sm text-neon-blue hover:text-neon-pink transition-colors font-vt323 tracking-wide uppercase">
                  <Upload size={16} />
                  <span>UPLOAD_AVATAR (OPTIONAL)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-foreground/40 mt-1 font-rajdhani">
                  * Default avatar assigned if null
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neon-blue font-vt323 uppercase tracking-widest">USER_NAME *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-neon-blue/30 rounded-none focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] text-foreground font-rajdhani transition-all duration-200"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neon-blue font-vt323 uppercase tracking-widest">USER_EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-neon-blue/30 rounded-none focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] text-foreground font-rajdhani transition-all duration-200"
                  placeholder="enter.email@address.com"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neon-blue font-vt323 uppercase tracking-widest">RATING_VALUE *</label>
                <div className="flex items-center space-x-1">
                  {renderStars()}
                  <span className="ml-2 text-sm text-neon-blue/60 font-vt323">
                    [{formData.stars}/5]
                  </span>
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-xs font-medium mb-2 text-neon-blue font-vt323 uppercase tracking-widest">REVIEW_CONTENT *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-black/50 border border-neon-blue/30 rounded-none focus:outline-none focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)] text-foreground font-rajdhani transition-all duration-200 resize-none"
                  placeholder="Input experience log..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black rounded-none font-bold font-orbitron tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>INITIATE_UPLOAD</span>
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center font-vt323">
                  &gt; ERROR: UPLOAD_FAILED. RETRY_REQUIRED.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
