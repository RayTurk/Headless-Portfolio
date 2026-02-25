'use client';

import { useState } from 'react';
import { treatments, siteConfig } from '@/lib/data';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Netlify forms handles the submission
    const form = e.currentTarget;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as any).toString(),
    }).then(() => setSubmitted(true));
  };

  return (
    <section className="pt-16 pb-24 bg-parchment-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">New Patient</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-light text-bark mb-3">
              Book your<br />
              <em className="text-blush-500 not-italic">consultation</em>
            </h1>
            <p className="text-sm text-drift font-sans leading-relaxed mb-10">
              Your initial consultation is complimentary and carries no obligation. We&rsquo;ll discuss your goals and build a personalized plan together.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-parchment-100 border border-parchment-200 p-10 text-center">
                <div className="w-10 h-px bg-gold-400 mx-auto mb-6" />
                <h2 className="font-display text-2xl font-light text-bark mb-3">Request received</h2>
                <p className="text-sm text-drift font-sans">
                  We&rsquo;ll reach out within one business day to confirm your appointment.
                </p>
              </div>
            ) : (
              <form
                name="booking"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="booking" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">First Name</label>
                    <input
                      type="text"
                      name="first-name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark placeholder-parchment-400 focus:outline-none focus:border-blush-400 font-sans text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">Last Name</label>
                    <input
                      type="text"
                      name="last-name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark placeholder-parchment-400 focus:outline-none focus:border-blush-400 font-sans text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark placeholder-parchment-400 focus:outline-none focus:border-blush-400 font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark placeholder-parchment-400 focus:outline-none focus:border-blush-400 font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">
                    Treatment of Interest
                  </label>
                  <select
                    name="treatment"
                    className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark focus:outline-none focus:border-blush-400 font-sans text-sm transition-colors"
                  >
                    <option value="">Not sure yet</option>
                    {treatments.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-drift font-sans mb-1.5">
                    Tell us about your goals (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-parchment-50 text-bark placeholder-parchment-400 focus:outline-none focus:border-blush-400 font-sans text-sm resize-none transition-colors"
                    placeholder="Describe what you'd like to address or improve…"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-blush-500 hover:bg-blush-600 text-white font-sans font-medium text-sm tracking-wide transition-colors"
                >
                  Request Consultation
                </button>

                <p className="text-xs text-parchment-400 text-center font-sans">
                  We respond within one business day. Your information is never shared.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-parchment-100 border border-parchment-200 p-7">
                <h3 className="font-display text-xl font-medium text-bark mb-5">What to expect</h3>
                <ul className="space-y-4">
                  {[
                    { step: '01', text: 'Complete this form or call us directly' },
                    { step: '02', text: 'We confirm your appointment within 24 hours' },
                    { step: '03', text: '30-minute consultation — no commitment required' },
                    { step: '04', text: 'We design a personalized treatment plan together' },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="font-display text-lg text-gold-400 font-light leading-none mt-0.5">{item.step}</span>
                      <p className="text-sm text-drift font-sans leading-relaxed">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-parchment-100 border border-parchment-200 p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blush-400" />
                  <a href={`tel:${siteConfig.phone}`} className="text-sm text-bark hover:text-blush-500 transition-colors font-sans">
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blush-400 mt-0.5" />
                  <p className="text-sm text-drift font-sans">{siteConfig.address}<br />{siteConfig.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blush-400" />
                  <p className="text-sm text-drift font-sans">{siteConfig.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
