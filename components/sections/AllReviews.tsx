'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User, Filter, Search, Plus } from 'lucide-react';
import Container from '@/components/layout/Container';
import ReviewFormDialog from '@/components/ui/review-form-dialog';
import { Review } from '@/types/review';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export default function AllReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 9;

  // Mock data for development
  const mockReviews: Review[] = [
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
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      imgurl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      review: 'Working with Habib was an absolute pleasure. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable. The project was delivered on time and exceeded our expectations.',
      stars: 5
    },
    {
      id: '5',
      name: 'Michael Chen',
      email: 'mchen@startup.io',
      imgurl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      review: 'Habib brought our vision to life with incredible precision. His expertise in React and Next.js helped us build a scalable platform that our users love. Highly recommended for any web development project.',
      stars: 5
    },
    {
      id: '6',
      name: 'Emily Rodriguez',
      email: 'emily.r@designstudio.com',
      imgurl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      review: 'The mobile app Habib developed for us is fantastic. The user interface is intuitive and the performance is excellent. His knowledge of React Native really shows in the final product.',
      stars: 4
    },
    {
      id: '7',
      name: 'David Kumar',
      email: 'david.k@enterprise.com',
      imgurl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      review: 'Professional, reliable, and skilled. Habib delivered a complex e-commerce solution that handles our high traffic seamlessly. His code quality and documentation are top-notch.',
      stars: 5
    },
    {
      id: '8',
      name: 'Lisa Thompson',
      email: 'lisa.t@agency.com',
      imgurl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      review: 'Great communication throughout the project. Habib understood our requirements perfectly and provided valuable suggestions that improved the final outcome. Will definitely work with him again.',
      stars: 4
    },
    {
      id: '9',
      name: 'James Wilson',
      email: 'james.w@fintech.com',
      imgurl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      review: 'Exceptional work on our fintech platform. Habib implemented complex financial calculations and security features with expertise. The application is robust and user-friendly.',
      stars: 5
    }
  ];

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
          setReviews(mockReviews);
          setFilteredReviews(mockReviews);
          setLoading(false);
          return;
        }

        // Fetch from Firebase
        const reviewsRef = collection(db, 'portfolio-reviews');
        const q = query(reviewsRef, orderBy('stars', 'desc'));
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
        setFilteredReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
        // Fallback to mock data on error
        setReviews(mockReviews);
        setFilteredReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = reviews;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply star filter
    if (starFilter !== null) {
      filtered = filtered.filter(review => Number(review.stars) === starFilter);
    }

    setFilteredReviews(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, starFilter, reviews]);

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

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="py-20 bg-background min-h-screen">
        <Container>
          <div className="text-center">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-300 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background min-h-screen">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold handwritten text-sketch-blue">
              All Reviews
            </h1>
            <div className="w-32 h-1 bg-sketch-blue mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Read what my clients have to say about working with me. Every review represents 
              a successful collaboration and a satisfied client.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 bg-background border border-notebook-line rounded-lg sketch-border">
              <div className="text-2xl font-bold text-sketch-blue handwritten">
                {loading ? '...' : reviews.length}
              </div>
              <div className="text-sm text-foreground/60">Total Reviews</div>
            </div>
            <div className="text-center p-4 bg-background border border-notebook-line rounded-lg sketch-border">
              <div className="text-2xl font-bold text-sketch-green handwritten">
                {loading ? '...' : reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-foreground/60">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-background border border-notebook-line rounded-lg sketch-border">
              <div className="text-2xl font-bold text-sketch-orange handwritten">
                {loading ? '...' : reviews.filter(review => Number(review.stars) === 5).length}
              </div>
              <div className="text-sm text-foreground/60">5-Star Reviews</div>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue/50"
              />
            </div>

            {/* Star Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-foreground/60" />
              <select
                value={starFilter || ''}
                onChange={(e) => setStarFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="px-3 py-2 border border-notebook-line rounded-lg focus:outline-none focus:ring-2 focus:ring-sketch-blue/50"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Add Review Button */}
            <motion.button
              onClick={() => setIsFormOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-sketch-green text-white rounded-lg font-medium sketch-hover transition-all duration-200"
            >
              <Plus size={18} />
              <span>Add Review</span>
            </motion.button>
          </motion.div>

          {/* Reviews Grid */}
          {filteredReviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
              <p className="text-foreground/60">
                {searchTerm || starFilter ? 'Try adjusting your filters' : 'Be the first to leave a review!'}
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background border border-notebook-line rounded-xl p-6 sketch-border relative hover:shadow-lg transition-shadow duration-300"
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

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center items-center space-x-2 mt-12"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-notebook-line rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sketch-blue hover:text-white transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 border border-notebook-line rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-sketch-blue text-white'
                          : 'hover:bg-sketch-blue hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-notebook-line rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sketch-blue hover:text-white transition-colors"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-foreground/60"
          >
            <p>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredReviews.length)} of {filteredReviews.length} reviews
              {(searchTerm || starFilter) && ` (filtered from ${reviews.length} total)`}
            </p>
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
