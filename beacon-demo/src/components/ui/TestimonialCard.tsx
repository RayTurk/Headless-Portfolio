import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn(
        'flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800',
        'hover:border-slate-700 transition-all duration-300',
        className
      )}
    >
      <Quote className="w-6 h-6 text-indigo-500/60 mb-4 flex-shrink-0" />
      <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-slate-400">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
