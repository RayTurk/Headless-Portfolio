import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, CheckCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { services, siteConfig } from '@/lib/data';
import ContactCTA from '@/components/sections/ContactCTA';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy-950 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-navy-300 hover:text-amber-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Summit HVAC & Plumbing
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-navy-300 text-lg max-w-xl">{service.shortDescription}</p>
            </div>
            {service.emergencyAvailable && (
              <div className="flex-shrink-0 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-flex items-center gap-2 w-fit">
                ⚡ 24/7 Emergency Available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Description + Process + FAQ */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-navy-950 mb-4">About This Service</h2>
                <p className="text-gray-600 leading-relaxed">{service.fullDescription}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-navy-950 mb-6">What's Included</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-navy-950 mb-6">How It Works</h2>
                <div className="space-y-6">
                  {service.processSteps.map((step) => (
                    <div key={step.step} className="flex gap-5">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-950 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-navy-950 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-gray-200 rounded-xl"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-navy-950 text-sm">
                        {faq.question}
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quote CTA Card */}
              <div className="bg-navy-950 text-white rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-2">Get a Free Quote</h3>
                <p className="text-navy-300 text-sm mb-5">
                  No obligation. Written estimate before we start any work.
                </p>
                {service.startingPrice && (
                  <div className="bg-white/10 rounded-lg p-3 mb-5">
                    <p className="text-xs text-navy-300 uppercase tracking-wide">Starting From</p>
                    <p className="text-2xl font-bold text-amber-400">{service.startingPrice}</p>
                  </div>
                )}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-lg transition-colors w-full mb-3"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-lg transition-colors w-full text-sm"
                >
                  Request Online Quote
                </Link>
                {service.emergencyAvailable && (
                  <p className="text-xs text-navy-400 text-center mt-3">
                    24/7 emergency service available
                  </p>
                )}
              </div>

              {/* Other services */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-navy-950 mb-4 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                        >
                          → {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
