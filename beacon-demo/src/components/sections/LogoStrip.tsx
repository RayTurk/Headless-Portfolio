import { trustedBy } from '@/lib/data';

export default function LogoStrip() {
  return (
    <section className="border-y border-slate-800 bg-slate-900/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trustedBy.map((company) => (
            <span
              key={company}
              className="text-slate-500 font-semibold text-lg tracking-tight hover:text-slate-400 transition-colors select-none cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
