'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/data';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as any).toString(),
    }).then(() => setSubmitted(true));
  };

  return (
    <section className="pt-16 pb-24 bg-ember-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-xs tracking-[0.25em] uppercase text-gold-500 font-sans">Join Us</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-cream mb-3">
              Reserve a <em className="font-light italic text-gold-400">table</em>
            </h1>
            <p className="text-sm text-stone font-sans leading-relaxed mb-10">
              Reservations are recommended for dinner service, especially Fri–Sat. We hold tables for 15 minutes past your reservation time.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-ember-900 border border-ember-700/50 p-10 text-center">
                <div className="w-10 h-px bg-gold-500 mx-auto mb-6" />
                <h2 className="font-display text-2xl font-light text-cream mb-3">Reservation request received</h2>
                <p className="text-sm text-stone font-sans">
                  We&rsquo;ll confirm your reservation by email or phone within a few hours.
                </p>
              </div>
            ) : (
              <form
                name="reservations"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="reservations" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">First Name</label>
                    <input
                      type="text"
                      name="first-name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream placeholder-ember-600 focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Last Name</label>
                    <input
                      type="text"
                      name="last-name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream placeholder-ember-600 focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream placeholder-ember-600 focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream placeholder-ember-600 focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Time</label>
                    <select
                      name="time"
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    >
                      {['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Guests</label>
                    <select
                      name="guests"
                      className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream focus:outline-none focus:border-gold-500/60 font-sans text-sm transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                      <option>9+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-stone font-sans mb-1.5">Special requests (optional)</label>
                  <textarea
                    name="requests"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-ember-700 bg-ember-900 text-cream placeholder-ember-600 focus:outline-none focus:border-gold-500/60 font-sans text-sm resize-none transition-colors"
                    placeholder="Allergies, dietary restrictions, special occasions…"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-ember-950 font-sans font-semibold text-sm tracking-wide transition-colors"
                >
                  Request Reservation
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              <div className="rounded-2xl bg-ember-900 border border-ember-700/50 p-7">
                <h3 className="font-display text-xl font-medium text-cream mb-5">Hours</h3>
                <ul className="space-y-2 text-sm font-sans text-stone">
                  <li>{siteConfig.hours.dinnerWeekday}</li>
                  <li>{siteConfig.hours.dinnerWeekend}</li>
                  <li>{siteConfig.hours.brunch}</li>
                  <li className="text-ember-600 mt-1">{siteConfig.hours.closed}</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-ember-900 border border-ember-700/50 p-7 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                  <p className="text-sm text-stone font-sans">{siteConfig.address}<br />{siteConfig.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <a href={`tel:${siteConfig.phone}`} className="text-sm text-stone hover:text-cream transition-colors font-sans">{siteConfig.phoneDisplay}</a>
                </div>
              </div>
              <div className="rounded-2xl bg-ember-900 border border-ember-700/50 p-7">
                <p className="text-sm text-stone font-sans leading-relaxed">
                  <span className="text-cream font-medium">Private dining:</span> Groups of 10 or more may reserve our private dining room. Contact us directly to arrange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
