import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for rturk.me — how your data is collected and used.',
  path: '/privacy',
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-4">
          Legal
        </p>
        <h1 className="font-display font-black text-5xl md:text-6xl uppercase leading-none tracking-tight text-cinder mb-4">
          Privacy <span className="text-brand-500">Policy</span>
        </h1>
        <p className="text-ash text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-ash leading-relaxed">
          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              1. Information I Collect
            </h2>
            <p>
              When you use the contact form on this site, I collect your name, email address, and the
              message you submit. I do not collect any other personal information unless you voluntarily
              provide it.
            </p>
            <p>
              This site may collect anonymized analytics data (page views, referrers, device type) via
              privacy-respecting tools. No personally identifiable information is stored in analytics.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              2. How I Use Your Information
            </h2>
            <p>Information submitted through the contact form is used solely to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Respond to your inquiry</li>
              <li>Discuss your project or service request</li>
            </ul>
            <p className="mt-3">I will never sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              3. Cookies
            </h2>
            <p>
              This site uses minimal cookies required for basic functionality. No third-party advertising
              cookies are set. If analytics are enabled, they use privacy-first tooling that does not
              fingerprint or track users across sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              4. Data Retention
            </h2>
            <p>
              Contact form submissions are retained only as long as necessary to fulfill the purpose for
              which they were submitted. You may request deletion of your data at any time by emailing{' '}
              <a href="mailto:rturk.me@gmail.com" className="text-brand-400 hover:text-brand-300 underline">
                rturk.me@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              5. External Links
            </h2>
            <p>
              This site links to external sites (GitHub, LinkedIn, demo projects). I am not responsible
              for the privacy practices of those sites and encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              6. Changes to This Policy
            </h2>
            <p>
              This policy may be updated occasionally. The "Last updated" date at the top reflects the
              most recent revision. Continued use of the site constitutes acceptance of the current policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-wide text-cinder mb-3">
              7. Contact
            </h2>
            <p>
              Questions about this policy? Reach me at{' '}
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
