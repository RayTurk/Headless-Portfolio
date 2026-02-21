import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data';
import Link from 'next/link';

export default function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
            What We Do
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 mb-4">
            Full-Service HVAC & Plumbing
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From emergency repairs to planned replacements, Summit has the expertise to keep your home comfortable year-round.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-navy-950 font-semibold border-2 border-navy-950 hover:bg-navy-950 hover:text-white px-6 py-3 rounded-lg transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
