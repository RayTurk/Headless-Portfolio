import { testimonials } from '@/lib/data';
import TestimonialCard from '@/components/ui/TestimonialCard';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What our customers say
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real reviews from real car owners. We let the results speak.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-cyan-400 fill-cyan-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-zinc-400 text-sm">
            <span className="text-white font-semibold">4.9 / 5.0</span> — 200+ verified Google reviews
          </p>
        </div>
      </div>
    </section>
  );
}
