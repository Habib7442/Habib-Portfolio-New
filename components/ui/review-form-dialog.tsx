'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, User, Send } from 'lucide-react';
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
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 hover:text-yellow-300'
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
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-background border border-notebook-line rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto sketch-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold handwritten text-sketch-blue">
              Share Your Experience
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} className="text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-green-600 mb-2">Thank You!</h4>
              <p className="text-foreground/70">
                Your review has been submitted and is pending approval.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-sketch-blue/10 flex items-center justify-center mx-auto mb-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={32} className="text-sketch-blue" />
                  )}
                </div>
                <label className="cursor-pointer inline-flex items-center space-x-2 text-sm text-sketch-blue hover:text-sketch-green transition-colors">
                  <Upload size={16} />
                  <span>Upload Photo (Optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-foreground/60 mt-1">
                  A random avatar will be used if no photo is uploaded
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue/50"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue/50"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">Rating *</label>
                <div className="flex items-center space-x-1">
                  {renderStars()}
                  <span className="ml-2 text-sm text-foreground/70">
                    ({formData.stars} star{formData.stars !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Review *</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue/50 resize-none"
                  placeholder="Share your experience working with me..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-sketch-green text-white rounded-lg font-medium sketch-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Review</span>
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Failed to submit review. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
