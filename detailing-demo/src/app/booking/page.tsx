'use client';

import BookingForm from '@/components/ui/BookingForm';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export default function BookingPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Page hero */}
      <div className="relative py-16 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.04)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-amber-400" />
            <p className="text-amber-400 text-xs font-semibold tracking-[0.22em] uppercase">
              Appointment Request
            </p>
            <div className="w-8 h-px bg-amber-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Book Your Detail
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Fill out the form and we&apos;ll confirm your appointment within 24 hours. Or call us for
            same-week availability.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 lg:p-10">
              <BookingForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact info card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
                Contact Us Directly
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{siteConfig.phoneDisplay}</p>
                    <p className="text-zinc-600 text-xs">Mon–Sat, 8am–6pm</p>
                  </div>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors">
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{siteConfig.email}</p>
                    <p className="text-zinc-600 text-xs">Reply within 24 hrs</p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Brooklyn, OH 44144</p>
                    <p className="text-zinc-600 text-xs">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                  Shop Hours
                </h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Sunday', hours: 'By Appointment' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">{day}</span>
                    <span className="text-zinc-300 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-amber-900/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-amber-400 font-bold text-sm mb-2">
                100% Satisfaction Guarantee
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Not happy with the results? We&apos;ll make it right — free of charge. No questions, no
                hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
