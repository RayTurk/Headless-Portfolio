import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms of service for rturk.me — the conditions under which this site and its services are provided.',
  path: '/terms',
  noIndex: true,
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-surface-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-4">
          Legal
        </p>
        <h1 className="font-display font-black text-5xl md:text-6xl uppercase leading-none tracking-tight text-cinder mb-4">
          Terms of <span className="text-brand-500">Service</span>
        </h1>
        <p className="text-ash text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-ash leading-relaxed">
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing rturk.me, you agree to these terms. If you do not agree, please do not use
              the site. These terms apply to all visitors, whether or not they engage my services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              2. Services
            </h2>
            <p>
              This site is a portfolio and marketing presence for Ray Turk Development, offering
              WordPress development, web maintenance, hosting, and custom development services.
              The demo sites linked from this portfolio are provided for illustrative purposes only
              and are not intended for commercial use.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              3. Intellectual Property
            </h2>
            <p>
              All content on this site — including design, copy, code, and demo projects — is the
              intellectual property of Ray Turk unless otherwise noted. You may not reproduce,
              distribute, or create derivative works without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              4. Contact Form & Communications
            </h2>
            <p>
              Submitting the contact form does not create a client relationship or any contractual
              obligation. A formal engagement begins only upon a signed agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              5. Disclaimer of Warranties
            </h2>
            <p>
              This site is provided "as is" without warranties of any kind. I make no guarantees
              regarding uptime, accuracy of information, or fitness for a particular purpose. Use
              the site at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              Ray Turk shall not be liable for any indirect, incidental, or consequential damages
              arising from your use of this site or any services described herein.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              7. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the State of Ohio, United States, without
              regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              8. Changes to Terms
            </h2>
            <p>
              These terms may be updated at any time. Continued use of the site after changes
              constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              9. Contact
            </h2>
            <p>
              Questions about these terms? Reach me at{' '}
              <a href="mailto:rturk.me@gmail.com" className="text-brand-400 hover:text-brand-300 underline">
                rturk.me@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
