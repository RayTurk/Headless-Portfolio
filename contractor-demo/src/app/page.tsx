import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreas from '@/components/sections/ServiceAreas';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'Summit HVAC & Plumbing | Greater Cleveland Heating, Cooling & Plumbing',
  description:
    "Northeast Ohio's trusted HVAC and plumbing experts since 2002. 24/7 emergency service, flat-rate pricing, NATE-certified technicians. Serving Lake and Geauga counties.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Testimonials />
      <ServiceAreas />
      <ContactCTA />
    </>
  );
}
