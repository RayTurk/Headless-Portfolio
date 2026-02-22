import { processSteps } from '@/lib/data';

export default function Process() {
  return (
    <section className="py-16 lg:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-20 xl:gap-32">

          {/* ── Left: Sticky section header ─────────────────────── */}
          <div className="mb-12 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-amber-400" />
                <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">The Process</p>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                Six steps
                <br />
                to a perfect
                <br />
                <span className="text-amber-400 font-light italic">finish.</span>
              </h2>

              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                Every vehicle goes through the same meticulous process. No shortcuts, no rushing —
                just results you can see.
              </p>

              {/*
                📸 IMAGE SLOT — Process section accent
                Optionally add a small portrait image here:
                  <div className="mt-10 rounded-xl overflow-hidden aspect-[4/3]">
                    <Image src="/images/process-detail.jpg" width={400} height={300} className="object-cover" alt="Detailer at work" />
                  </div>
              */}

              {/* Decorative large number */}
              <div
                className="mt-10 text-[7rem] font-black leading-none select-none hidden lg:block"
                style={{ color: 'rgba(39,39,42,0.8)' }}
                aria-hidden="true"
              >
                06
              </div>
            </div>
          </div>

          {/* ── Right: Numbered steps ────────────────────────────── */}
          <div className="divide-y divide-zinc-900">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="flex gap-5 py-8 first:pt-0 last:pb-0 group"
              >
                {/* Large step number */}
                <div className="flex-shrink-0 w-10 text-right">
                  <span className="text-3xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Amber vertical tick */}
                <div className="flex-shrink-0 pt-2.5">
                  <div className="w-px h-3 bg-zinc-800 group-hover:bg-amber-400/60 transition-colors rounded-full" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
