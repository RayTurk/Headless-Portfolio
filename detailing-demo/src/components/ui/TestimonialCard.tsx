import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col hover:border-zinc-700 transition-all duration-300',
        className
      )}
    >
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < testimonial.rating ? 'text-cyan-400 fill-cyan-400' : 'text-zinc-700'
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-zinc-300 text-sm leading-relaxed mb-5 flex-1 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author info */}
      <div className="pt-4 border-t border-zinc-800">
        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
        <p className="text-zinc-500 text-xs mt-0.5">{testimonial.vehicle}</p>
        <span className="inline-block mt-2 text-xs text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
          {testimonial.serviceReceived}
        </span>
      </div>
    </div>
  );
}
