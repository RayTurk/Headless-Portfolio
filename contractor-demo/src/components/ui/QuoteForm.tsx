'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from './Button';
import { services } from '@/lib/data';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  honeypot: string;
}

export default function QuoteForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.service) newErrors.service = 'Please select a service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // Spam trap
    if (!validate()) return;

    setStatus('submitting');

    try {
      // TODO: Replace with real form submission (Netlify Forms, Formspree, or API route)
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-xl font-bold text-navy-950">Request Received!</h3>
        <p className="text-gray-600">
          We'll call you within 2 business hours to confirm your appointment. For emergencies, call us directly at{' '}
          <a href="tel:4405550192" className="font-semibold text-amber-600">(440) 555-0192</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 outline-none transition-colors"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 outline-none transition-colors"
            placeholder="(440) 555-0000"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 outline-none transition-colors"
          placeholder="you@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Service Needed <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 outline-none transition-colors bg-white"
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Other / Not Sure</option>
        </select>
        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Tell us more (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-navy-950 focus:ring-1 focus:ring-navy-950 outline-none transition-colors resize-none"
          placeholder="Describe the issue or what you need…"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Something went wrong. Please call us directly at (440) 555-0192.</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Request Free Quote'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        We respond within 2 business hours. No spam, ever.
      </p>
    </form>
  );
}
