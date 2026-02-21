import Link from 'next/link';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/data';

const serviceLinks = [
  { href: '/services#exterior-hand-wash', label: 'Exterior Hand Wash' },
  { href: '/services#interior-deep-clean', label: 'Interior Deep Clean' },
  { href: '/services#paint-correction', label: 'Paint Correction' },
  { href: '/services#ceramic-coating', label: 'Ceramic Coating' },
  { href: '/services#headlight-restoration', label: 'Headlight Restoration' },
  { href: '/services#engine-bay-cleaning', label: 'Engine Bay Cleaning' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'All Services' },
  { href: '/booking', label: 'Book Appointment' },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-white text-lg">
                Revive<span className="text-cyan-400">.</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              {siteConfig.tagline}. Ceramic-certified technicians serving Greater Cleveland since 2016.
            </p>
            <div className="space-y-2.5">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-1.5">
              {siteConfig.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="text-sm text-zinc-600">
            Brooklyn, OH 44144 &mdash; Serving Greater Cleveland
          </p>
        </div>
      </div>
    </footer>
  );
}
