import type { Metadata } from 'next';
import ServiceCard from '@/components/ui/ServiceCard';
import ContactCTA from '@/components/sections/ContactCTA';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'HVAC and plumbing services from Summit: heating, cooling, plumbing, water heaters, indoor air quality, and maintenance plans. Serving Greater Cleveland.',
};

export default function ServicesPage() {
  const hvacServices = services.filter((s) =>
    ['heating', 'cooling', 'indoor-air-quality', 'maintenance-plans'].includes(s.slug)
  );
  const plumbingServices = services.filter((s) =>
    ['plumbing', 'water-heaters'].includes(s.slug)
  );

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy-950 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
            What We Offer
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-navy-300 text-lg max-w-xl">
            Full-service HVAC and plumbing for homeowners throughout Greater Cleveland. Licensed, insured, and available around the clock.
          </p>
        </div>
      </section>

      {/* HVAC Services */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-950 mb-8">HVAC Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {hvacServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Plumbing Services */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-950 mb-8">Plumbing Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {plumbingServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
