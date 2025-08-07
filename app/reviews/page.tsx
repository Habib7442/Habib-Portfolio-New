import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import AllReviews from '@/components/sections/AllReviews';

export const metadata: Metadata = {
  title: 'Client Reviews - Habib Tanwir',
  description: 'Read what my clients have to say about working with me. Every review represents a successful collaboration and a satisfied client.',
  keywords: 'reviews, testimonials, client feedback, web developer, frontend developer, React developer',
};

export default function ReviewsPage() {
  return (
    <Layout>
      <AllReviews />
    </Layout>
  );
}
