import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import TreatmentsStrip from '@/components/sections/TreatmentsStrip';
import ResultsGallery from '@/components/sections/ResultsGallery';
import AboutIntro from '@/components/sections/AboutIntro';
import Testimonials from '@/components/sections/Testimonials';
import BookingCTA from '@/components/sections/BookingCTA';

export const metadata: Metadata = {
  title: 'Luminary Aesthetics | Med Spa Chagrin Falls, OH',
  description:
    'Board-certified injectables, laser treatments, and advanced skincare in Chagrin Falls, Ohio. Book a complimentary consultation.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentsStrip />
      <ResultsGallery />
      <AboutIntro />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
