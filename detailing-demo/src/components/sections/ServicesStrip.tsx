import { services } from '@/lib/data';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesStrip() {
  return (
    <section className="py-20 lg:py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Every service, done obsessively well
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From a weekly maintenance wash to a full ceramic coating install — we bring the same precision and care to every job.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
