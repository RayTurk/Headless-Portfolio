import Link from 'next/link';
import { Phone, Mail, MapPin, Flame } from 'lucide-react';
import { siteConfig, serviceAreas } from '@/lib/data';

const footerServices = [
  { href: '/services/heating', label: 'Heating' },
  { href: '/services/cooling', label: 'Cooling & AC' },
  { href: '/services/plumbing', label: 'Plumbing' },
  { href: '/services/water-heaters', label: 'Water Heaters' },
  { href: '/services/indoor-air-quality', label: 'Indoor Air Quality' },
  { href: '/services/maintenance-plans', label: 'Maintenance Plans' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const displayAreas = serviceAreas.slice(0, 8);

  return (
    <footer className="bg-navy-950 text-white">
      {/* Emergency Bar */}
      <div className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-navy-950 font-semibold text-sm">
            24/7 Emergency Service — No Holiday Surcharges
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-navy-950 font-bold text-lg hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base">Summit HVAC & Plumbing</span>
            </div>
            <p className="text-navy-200 text-sm leading-relaxed mb-4">
              Greater Cleveland's trusted HVAC and plumbing experts since 2002. Licensed, insured, and available 24/7.
            </p>
            <div className="space-y-2 text-sm text-navy-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-navy-200 hover:text-amber-400 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Get a Quote' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Service Areas
            </h3>
            <ul className="space-y-1.5">
              {displayAreas.map((area) => (
                <li key={area.city} className="text-sm text-navy-200">
                  {area.city}
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  + More areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-navy-400">
          <p>© {currentYear} Summit HVAC & Plumbing. All rights reserved.</p>
          <p>License #{siteConfig.licenseNumber} · Serving Greater Cleveland, OH</p>
        </div>
      </div>
    </footer>
  );
}
