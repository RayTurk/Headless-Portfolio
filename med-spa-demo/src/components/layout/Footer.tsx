import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-parchment-100 border-t border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl font-medium tracking-[0.12em] text-bark uppercase block">Luminary</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-drift">Aesthetics</span>
            </div>
            <p className="text-sm text-drift leading-relaxed max-w-xs">
              Medical-grade aesthetics delivered with clinical precision and an artist&rsquo;s eye for natural beauty.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-blush-500">
              <Instagram className="w-4 h-4" />
              <a href="#" className="hover:text-blush-600 transition-colors">{siteConfig.instagramHandle}</a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-drift mb-5">Treatments</h3>
            <ul className="space-y-3 text-sm text-bark">
              {['Botox & Dysport', 'Dermal Fillers', 'RF Microneedling', 'Medical-Grade Peels', 'Laser Treatments', 'HydraFacial MD'].map((t) => (
                <li key={t}>
                  <Link href="/treatments" className="hover:text-blush-500 transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-drift mb-5">Visit Us</h3>
            <ul className="space-y-4 text-sm text-bark">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blush-400 mt-0.5 flex-shrink-0" />
                <span className="text-drift">{siteConfig.address}<br />{siteConfig.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blush-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-drift hover:text-bark transition-colors">{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blush-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-drift hover:text-bark transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-parchment-300">
              <p className="text-xs tracking-wider uppercase text-drift">Hours</p>
              <p className="text-sm text-bark mt-1">{siteConfig.hours}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sage-400">&copy; {new Date().getFullYear()} Luminary Aesthetics. All rights reserved.</p>
          <p className="text-xs text-sage-400">Site by <span className="text-blush-400">Ray Turk</span></p>
        </div>
      </div>
    </footer>
  );
}
