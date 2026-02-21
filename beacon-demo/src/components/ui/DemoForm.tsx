'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const teamSizeOptions = [
  'Just me',
  '2–5 people',
  '6–20 people',
  '21–100 people',
  '100+ people',
];

export default function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You&rsquo;re on the list!</h3>
        <p className="text-slate-400 max-w-sm">
          Thanks for reaching out. A member of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
            Full name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jordan Wells"
            className={cn(
              'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5',
              'text-white placeholder-slate-500 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              'transition-colors'
            )}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
            Work email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={cn(
              'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5',
              'text-white placeholder-slate-500 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              'transition-colors'
            )}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme Corp"
          className={cn(
            'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5',
            'text-white placeholder-slate-500 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'transition-colors'
          )}
        />
      </div>

      <div>
        <label htmlFor="team-size" className="block text-sm font-medium text-slate-300 mb-1.5">
          Team size
        </label>
        <select
          id="team-size"
          name="team_size"
          className={cn(
            'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5',
            'text-white text-sm',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'transition-colors'
          )}
        >
          <option value="">Select team size</option>
          {teamSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
          What are you trying to monitor?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your stack — websites, APIs, microservices..."
          className={cn(
            'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5',
            'text-white placeholder-slate-500 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'transition-colors resize-none'
          )}
        />
      </div>

      {/* Honeypot */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'px-6 py-3 rounded-lg text-sm font-semibold text-white',
          'bg-indigo-600 hover:bg-indigo-500 transition-colors',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'shadow-glow-brand'
        )}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request Demo
          </>
        )}
      </button>
    </form>
  );
}
