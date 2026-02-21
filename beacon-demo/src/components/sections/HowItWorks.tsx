import {
  PlusCircle,
  Users,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import { howItWorksSteps } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  'plus-circle': PlusCircle,
  'users': Users,
  'shield-check': ShieldCheck,
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-900/40 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
            Simple setup
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Up and running in minutes</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No agents to install, no infrastructure to manage. Add a URL and you&rsquo;re monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines on md+ */}
          <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-gradient-to-r from-orange-600/40 via-amber-600/40 to-orange-600/40" />

          {howItWorksSteps.map((step) => {
            const Icon = iconMap[step.icon] ?? ShieldCheck;
            return (
              <div key={step.step} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-slate-900 border border-slate-800">
                {/* Step number */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-full bg-orange-950/60 border border-orange-800/60 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-orange-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
