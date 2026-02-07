import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import ContactForm from '@/components/ui/ContactForm';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Ray Turk for WordPress maintenance, custom development, hosting, or a free site audit. Cleveland-based, serving clients nationwide.',
  path: '/contact',
});

export default function ContactPage() {
  const schema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <RevealOnScroll preset="fade-up" className="text-center mb-16">
            <span className="inline-block text-brand-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Contact
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-surface-50 mb-6">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl mx-auto">
              Whether you need ongoing maintenance, a new build, or just want to chat about your
              web strategy — I&apos;m here to help.
            </p>
          </RevealOnScroll>

          {/* Grid: Form + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <RevealOnScroll preset="fade-right" className="lg:col-span-3">
              <div className="rounded-2xl border border-surface-700 bg-surface-900/60 p-8">
                <ContactForm />
              </div>
            </RevealOnScroll>

            {/* Info Sidebar */}
            <RevealOnScroll preset="fade-left" className="lg:col-span-2">
              <div className="space-y-8">
                {/* Response Time Badge */}
                <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                  <span className="text-accent-400 text-sm font-medium">
                    Usually responds within 24 hours
                  </span>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-3">
                      Email
                    </h3>
                    <a
                      href="mailto:hello@rayturk.com"
                      className="text-surface-200 hover:text-brand-400 transition-colors"
                    >
                      hello@rayturk.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-3">
                      Location
                    </h3>
                    <p className="text-surface-200">Cleveland, Ohio</p>
                    <p className="text-surface-400 text-sm">Serving clients nationwide</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-3">
                      Socials
                    </h3>
                    <div className="flex gap-4">
                      {SOCIAL_LINKS.filter((s) => s.platform !== 'email').map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 hover:text-brand-400 hover:border-brand-500/50 transition-all duration-300"
                          aria-label={link.name}
                        >
                          <span className="text-sm font-medium capitalize">{link.platform.charAt(0).toUpperCase()}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="space-y-4 pt-4">
                  <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-4">
                    <h4 className="text-surface-200 font-medium mb-1">Free Site Audit</h4>
                    <p className="text-surface-400 text-sm">
                      Not sure what your site needs? Mention &quot;free audit&quot; in your message and
                      I&apos;ll review your site at no cost.
                    </p>
                  </div>
                  <div className="rounded-xl border border-surface-700 bg-surface-800/50 p-4">
                    <h4 className="text-surface-200 font-medium mb-1">Prefer a Call?</h4>
                    <p className="text-surface-400 text-sm">
                      Send a message with your preferred time and I&apos;ll set up a quick call to
                      discuss your project.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
