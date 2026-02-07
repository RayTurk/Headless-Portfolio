import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs, getAllServices } from '@/lib/api';
import { generateServiceMetadata } from '@/lib/seo';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { SITE_URL } from '@/lib/constants';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return generateServiceMetadata(service);
}

export default async function SingleServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const allServices = await getAllServices();
  const relatedServices = allServices
    .filter((s) => s.slug !== params.slug)
    .slice(0, 3);

  const schemas = [
    generateServiceSchema({
      name: service.title,
      description: service.excerpt || service.title,
      url: `${SITE_URL}/services/${service.slug}`,
      price: service.serviceFields?.servicePricingText,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
  ];

  const features = service.serviceFields?.serviceFeatures || [];

  return (
    <>
      <JsonLd data={schemas} />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />

          <RevealOnScroll preset="fade-up" className="mt-8 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-surface-50 mb-4">
              {service.title}
            </h1>
            {service.serviceFields?.servicePricingText && (
              <p className="text-brand-400 font-semibold text-lg">
                {service.serviceFields.servicePricingText}
              </p>
            )}
          </RevealOnScroll>

          {/* Features */}
          {features.length > 0 && (
            <RevealOnScroll preset="fade-up" className="mb-12">
              <div className="rounded-xl border border-surface-700 bg-surface-900/60 p-8">
                <h2 className="text-xl font-semibold text-surface-50 mb-6">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-accent-500 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-surface-300">{feature.featureText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          )}

          {/* Content */}
          <RevealOnScroll preset="fade-up">
            <div
              className="prose prose-invert prose-lg max-w-none mb-16
                prose-headings:text-surface-50 prose-p:text-surface-300
                prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-surface-100"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </RevealOnScroll>

          {/* CTA */}
          <RevealOnScroll preset="scale" className="mb-16">
            <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-950/50 to-surface-900 p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-surface-50 mb-4">
                {service.serviceFields?.serviceCtaText || 'Ready to Get Started?'}
              </h2>
              <a
                href={service.serviceFields?.serviceCtaUrl || '/contact'}
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-lg"
              >
                {service.serviceFields?.serviceCtaText || 'Get Started'}
              </a>
            </div>
          </RevealOnScroll>

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <RevealOnScroll preset="fade-up">
              <h2 className="text-2xl font-bold text-surface-50 mb-8">Other Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((s) => (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-xl border border-surface-700 bg-surface-800/50 p-6 hover:border-brand-500/30 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-surface-50 mb-2">{s.title}</h3>
                    {s.serviceFields?.servicePricingText && (
                      <p className="text-brand-400 text-sm">{s.serviceFields.servicePricingText}</p>
                    )}
                  </a>
                ))}
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>
    </>
  );
}
