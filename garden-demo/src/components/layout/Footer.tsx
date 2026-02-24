import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Leaf } from 'lucide-react';
import { siteConfig, categories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-base">Clover</span>
                <span className="block text-[9px] font-semibold tracking-[0.18em] text-brand-300 uppercase -mt-0.5">
                  Garden Centre
                </span>
              </div>
            </Link>
            <p className="text-brand-200 text-sm leading-relaxed mb-5">
              {siteConfig.tagline}. Serving Hudson and Greater Cleveland with quality plants and expert advice since {siteConfig.founded}.
            </p>
            <div className="space-y-2.5">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 text-sm text-brand-200 hover:text-white transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 text-sm text-brand-200 hover:text-white transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-brand-200">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Shop by category */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.slug}`} className="text-sm text-brand-200 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Visit</h3>
            <ul className="space-y-2.5 mb-6">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/about#team', label: 'Our Team' },
                { href: '/shop', label: 'All Products' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-200 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-2 text-sm text-brand-200">
              <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {siteConfig.hours.map(({ day, hours }) => (
                  <div key={day}>
                    <span className="text-white text-xs font-medium">{day}</span>
                    <span className="block text-xs">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter teaser */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Garden Club</h3>
            <p className="text-brand-200 text-sm leading-relaxed mb-4">
              Join our newsletter for seasonal planting guides, new arrivals, and member-only discounts.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-white text-brand-800 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-cream transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-400">
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="text-sm text-brand-500">
            Hudson, OH 44236 &mdash; Est. {siteConfig.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}
