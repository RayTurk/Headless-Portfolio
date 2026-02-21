import { Search, CloudRain, Droplets, Layers, ShieldCheck, CheckCircle } from 'lucide-react';
import { processSteps } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  'cloud-rain': CloudRain,
  droplets: Droplets,
  layers: Layers,
  'shield-check': ShieldCheck,
  'check-circle': CheckCircle,
};

export default function Process() {
  return (
    <section className="py-20 lg:py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3">
            The Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Six steps to a perfect finish
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Every vehicle goes through the same meticulous process. No shortcuts, no rushing — just results you can see.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = iconMap[step.icon] ?? ShieldCheck;
            return (
              <div
                key={step.step}
                className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-zinc-600 font-bold text-4xl leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (not on last item in each row or last item overall) */}
                {idx < processSteps.length - 1 && (idx + 1) % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-zinc-700" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
