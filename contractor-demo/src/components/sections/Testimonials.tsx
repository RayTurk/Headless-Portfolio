import TestimonialCard from '@/components/ui/TestimonialCard';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  // Show first 3 on homepage
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Customer Reviews
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-navy-300 max-w-xl mx-auto">
            Over 800 five-star reviews on Google. Here's what our neighbors say about Summit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Google badge */}
        <div className="text-center mt-10">
          <span className="inline-flex items-center gap-2 text-navy-300 text-sm">
            ★★★★★ 4.9 average · 800+ Google reviews
          </span>
        </div>
      </div>
    </section>
  );
}
