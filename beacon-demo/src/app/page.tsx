import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import LogoStrip from '@/components/sections/LogoStrip';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import PricingSection from '@/components/sections/PricingSection';
import Testimonials from '@/components/sections/Testimonials';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Beacon — Uptime Monitoring for Modern Teams',
  description:
    'Know before your customers do. Beacon monitors your websites and APIs every 30 seconds from 8 global locations with instant Slack and PagerDuty alerts.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
