import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 shadow-card">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Meta */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="font-semibold text-navy-950 text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.location}</p>
        </div>
        <span className="text-xs font-medium text-navy-950/60 bg-gray-100 px-2 py-1 rounded-full">
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}
