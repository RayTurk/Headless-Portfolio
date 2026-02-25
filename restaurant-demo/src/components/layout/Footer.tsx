import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-ember-900 border-t border-ember-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-display text-2xl font-medium text-cream block">
                Ember <span className="text-gold-500">&amp;</span> Oak
              </span>
              <span className="text-xs tracking-[0.25em] uppercase text-stone font-sans">{siteConfig.tagline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone mt-5">
              <Instagram className="w-4 h-4 text-gold-500" />
              <a href="#" className="hover:text-cream transition-colors">{siteConfig.instagram}</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-gold-500 font-sans mb-5">Hours</h3>
            <ul className="space-y-2 text-sm text-stone font-sans">
              <li>{siteConfig.hours.dinnerWeekday}</li>
              <li>{siteConfig.hours.dinnerWeekend}</li>
              <li>{siteConfig.hours.brunch}</li>
              <li className="text-ember-600">{siteConfig.hours.closed}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-gold-500 font-sans mb-5">Find Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                <span className="text-stone">{siteConfig.address}<br />{siteConfig.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-stone hover:text-cream transition-colors">{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-stone hover:text-cream transition-colors">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ember-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ember-600">&copy; {new Date().getFullYear()} Ember &amp; Oak. All rights reserved.</p>
          <p className="text-xs text-ember-600">Site by <span className="text-gold-600">Ray Turk</span></p>
        </div>
      </div>
    </footer>
  );
}
