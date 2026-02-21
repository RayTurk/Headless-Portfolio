import { testimonials } from '@/lib/data';
import TestimonialCard from '@/components/ui/TestimonialCard';

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-900/40 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Trusted by builders
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Engineering teams rely on Beacon
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From solo founders to DevOps leads at scale-ups — here&rsquo;s what they say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
