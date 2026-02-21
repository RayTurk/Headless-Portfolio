import Hero from '@/components/sections/Hero';
import ServicesStrip from '@/components/sections/ServicesStrip';
import Packages from '@/components/sections/Packages';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import BookingCTA from '@/components/sections/BookingCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Packages />
      <Process />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
