import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import QuoteForm from '@/components/ui/QuoteForm';
import { siteConfig, serviceAreas } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact & Free Quote',
  description:
    'Request a free quote from Summit HVAC & Plumbing. We respond within 2 business hours. For emergencies, call (440) 555-0192.',
};

const hours = [
  { day: 'Monday – Friday', hours: '7:00 AM – 7:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 5:00 PM' },
  { day: 'Sunday', hours: 'Emergency calls only' },
  { day: '24/7 Emergencies', hours: 'Always available' },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-navy-950 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Request a Free Quote</h1>
          <p className="text-navy-300 text-lg max-w-xl">
            Fill out the form and we'll call you within 2 business hours. For emergencies, call us directly — we're available 24/7.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-navy-950 mb-2">Tell Us What You Need</h2>
              <p className="text-gray-500 text-sm mb-6">
                All fields marked <span className="text-red-500">*</span> are required. We'll never share your information.
              </p>
              <QuoteForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-amber-500 rounded-xl p-6 text-navy-950">
                <h3 className="font-bold text-lg mb-2">Emergency? Call Now</h3>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-6 h-6" />
                  {siteConfig.phoneDisplay}
                </a>
                <p className="text-navy-800 text-sm mt-2">Available 24/7 · No holiday surcharges</p>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-card space-y-4">
                <h3 className="font-bold text-navy-950">Contact Information</h3>

                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-amber-600 transition-colors">
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-600 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-navy-950">Business Hours</h3>
                </div>
                <ul className="space-y-2">
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="text-gray-600">{h.day}</span>
                      <span className="font-medium text-navy-950">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-xl p-6 shadow-card">
                <h3 className="font-bold text-navy-950 mb-4">Service Areas</h3>
                <div className="grid grid-cols-2 gap-y-1.5">
                  {serviceAreas.slice(0, 10).map((area) => (
                    <span key={area.city} className="text-sm text-gray-600">
                      {area.city}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  + surrounding {siteConfig.serviceRadius}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
