'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import ReviewFormDialog from '@/components/ui/review-form-dialog';
import { Review } from '@/types/review';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Firebase is configured
        const isFirebaseConfigured = process.env.NEXT_PUBLIC_PROJECT_ID && 
                                   process.env.NEXT_PUBLIC_API_KEY;

        if (!isFirebaseConfigured) {
          console.log('Firebase not configured, using mock data');
          // Mock data for development
          setReviews([
            {
              id: '1',
              name: 'Dwipshikha Lodh',
              email: 'lodhdwipshikha@gmail.com',
              imgurl: 'https://firebasestorage.googleapis.com/v0/b/the-digital-diary.appspot.com/o/portfolio-images%2F16989105311196.jfif%3Ftoken%3Db0dfe73b-f629-4ba5-9a05-0022e89bc1a0',
              review: 'Habib has an in-depth knowledge of the technologies he has mentioned here which also gets reflects through his work for sure & his work always reflects the passion he has in the field of development.',
              stars: 5
            },
            {
              id: '2',
              name: 'Chinmoy Kumar Swain',
              email: 'chinmoy@omnisiv.com',
              imgurl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              review: 'Habib has an in-depth understanding of web development and has a stronghold in design and aesthetics, which makes him one of the finest web developer I have worked with. Apart from his excellent tech skills, his determination and creativity is something to admire.',
              stars: 5
            },
            {
              id: '3',
              name: 'Ashadul Islam',
              email: 'ashadulmjh@gmail.com',
              imgurl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
              review: "Habib's portfolio is an absolute marvel! It presents a captivating collection of projects that highlights his exceptional skills and creativity. The design is visually stunning, capturing attention and leaving a lasting impression. A true testament to Habib's talent and expertise.",
              stars: 4
            }
          ]);
          setLoading(false);
          return;
        }

        // Fetch from Firebase (limit to top 6 for home page)
        const reviewsRef = collection(db, 'portfolio-reviews');
        const q = query(reviewsRef, orderBy('stars', 'desc'), limit(6));
        const querySnapshot = await getDocs(q);
        
        const fetchedReviews: Review[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedReviews.push({
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email || '',
            imgurl: data.imgurl || '',
            review: data.review || '',
            stars: Number(data.stars) || 5,
            timestamp: data.timestamp
          });
        });

        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section id="reviews" className="py-20 bg-background">
        <Container>
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="py-20 bg-background">
        <Container>
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </Container>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't render section if no reviews
  }

  return (
    <section id="reviews" className="py-20 bg-background">
      <Container>
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold handwritten text-sketch-blue">
              Client Reviews
            </h2>
            <div className="w-24 h-1 bg-sketch-blue mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              What my clients say about working with me. Here are some of the top reviews from satisfied clients.
            </p>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-notebook-line rounded-xl p-6 sketch-border relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-sketch-blue/20">
                  <Quote size={32} />
                </div>

                {/* Review Content */}
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex items-center space-x-1">
                    {renderStars(review.stars)}
                  </div>

                  {/* Review Text */}
                  <p className="text-foreground/80 leading-relaxed italic">
                    "{review.review}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-notebook-line">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-sketch-blue/10 flex items-center justify-center flex-shrink-0">
                      {review.imgurl ? (
                        <img
                          src={review.imgurl}
                          alt={review.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User size={24} className="text-sketch-blue" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold handwritten text-sketch-green">
                        {review.name}
                      </h4>
                      {review.email && (
                        <p className="text-sm text-foreground/60">
                          {review.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <p className="text-foreground/60">
              Want to see more reviews or share your own experience?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/reviews">
                <motion.div
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-sketch-blue text-white rounded-lg font-medium sketch-hover transition-all duration-200"
                >
                  <span>See All Reviews</span>
                  <ArrowRight size={18} />
                </motion.div>
              </Link>
              <motion.button
                onClick={() => setIsFormOpen(true)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 bg-sketch-green text-white rounded-lg font-medium sketch-hover transition-all duration-200"
              >
                Share Your Experience
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Review Form Dialog */}
      <ReviewFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
}
