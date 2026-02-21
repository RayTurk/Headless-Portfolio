import type { Metadata } from 'next';
import DemoForm from '@/components/ui/DemoForm';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a personalized Beacon demo or reach out to our team. We reply within one business day.',
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email us',
    value: 'hello@beacon.app',
    href: 'mailto:hello@beacon.app',
  },
  {
    icon: MessageSquare,
    title: 'Live chat',
    value: 'Available Mon–Fri, 9am–6pm ET',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Response time',
    value: 'Within one business day',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-32 pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-grid-slate opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-indigo-900/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            See Beacon in action
          </h1>
          <p className="text-lg text-slate-400">
            Tell us about your stack and we&rsquo;ll walk you through a personalized demo. Or just start your free trial — no demo required.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Let&rsquo;s talk monitoring</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Whether you&rsquo;re evaluating Beacon for a team of 2 or 200, we&rsquo;re happy to walk through your use case.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="w-9 h-9 rounded-lg bg-indigo-950/60 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">{item.title}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-slate-400">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-800/30">
                <p className="text-sm font-semibold text-indigo-300 mb-2">Start immediately</p>
                <p className="text-sm text-slate-400">
                  Don&rsquo;t need a demo? Sign up free and have your first monitor running in under 60 seconds. No credit card.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-6">Request a demo</h2>
                <DemoForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
