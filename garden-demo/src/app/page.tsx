import Hero from '@/components/sections/Hero';
import CategoryGrid from '@/components/sections/CategoryGrid';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import SeasonalBanner from '@/components/sections/SeasonalBanner';
import AboutSnippet from '@/components/sections/AboutSnippet';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <SeasonalBanner />
      <AboutSnippet />
      <Testimonials />
      <Newsletter />
    </>
  );
}
