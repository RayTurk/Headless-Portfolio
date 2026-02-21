import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function ContactCTA() {
  return (
    <section className="py-16 lg:py-20 bg-amber-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 mb-4">
          Need Service Today?
        </h2>
        <p className="text-navy-800 text-lg mb-8">
          Our technicians are standing by. For emergencies, call now. For non-urgent requests, request a free quote online.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 bg-navy-950 hover:bg-navy-900 text-white font-bold text-lg px-8 py-4 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/40 border-2 border-navy-950 text-navy-950 font-bold text-base px-8 py-4 rounded-lg transition-colors w-full sm:w-auto"
          >
            Request Free Quote
          </Link>
        </div>
        <p className="text-navy-800 text-sm mt-5">
          Available 24/7 · No holiday surcharges · Licensed & Insured
        </p>
      </div>
    </section>
  );
}
