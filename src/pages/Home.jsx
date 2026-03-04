import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import FeaturedProducts from '../components/FeaturedProducts';
import SubscriptionBanner from '../components/SubscriptionBanner';
import RewardsSection from '../components/RewardsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <SubscriptionBanner />
      <RewardsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
