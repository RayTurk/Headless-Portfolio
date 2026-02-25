import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import FeaturedDishes from '@/components/sections/FeaturedDishes';
import ChefStory from '@/components/sections/ChefStory';
import MenuPreview from '@/components/sections/MenuPreview';
import PressStrip from '@/components/sections/PressStrip';
import ReservationsCTA from '@/components/sections/ReservationsCTA';

export const metadata: Metadata = {
  title: 'Ember & Oak | Wood-Fired Restaurant Cleveland, OH',
  description:
    'Ember & Oak is a wood-fired restaurant in Cleveland, Ohio. Exceptional dry-aged beef, smoked duck, and seasonal small plates. Open for dinner Tue–Sat.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <ChefStory />
      <MenuPreview />
      <PressStrip />
      <ReservationsCTA />
    </>
  );
}
