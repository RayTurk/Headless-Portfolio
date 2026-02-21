'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const serviceOptions = [
  'Exterior Hand Wash',
  'Interior Deep Clean',
  'Paint Correction',
  'Ceramic Coating',
  'Headlight Restoration',
  'Engine Bay Cleaning',
  'Express Package ($89)',
  'Signature Package ($189)',
  'Elite Package ($349)',
  'Not sure — advise me',
];

const vehicleTypes = [
  'Sedan',
  'Coupe',
  'Hatchback',
  'SUV / Crossover',
  'Pickup Truck',
  'Minivan',
  'Sports Car / Exotic',
  'Classic / Collector',
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: string;
  service: string;
  preferredDate: string;
  notes: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleType: '',
  service: '',
  preferredDate: '',
  notes: '',
};

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate submission — replace with real API call or Netlify Forms
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Request Received!</h3>
        <p className="text-zinc-400 max-w-sm leading-relaxed">
          Thanks for reaching out. We&apos;ll confirm your appointment within 24 hours. Check your email for a confirmation.
        </p>
        <button
          onClick={() => { setForm(initialState); setStatus('idle'); }}
          className="mt-8 text-sm text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact info */}
      <div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
          Your Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm text-zinc-400 mb-1.5">
              Full Name <span className="text-cyan-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-zinc-400 mb-1.5">
              Email <span className="text-cyan-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="jane@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm text-zinc-400 mb-1.5">
              Phone <span className="text-cyan-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(216) 555-0000"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="preferredDate" className="block text-sm text-zinc-400 mb-1.5">
              Preferred Date
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Vehicle info */}
      <div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
          Vehicle Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="vehicleYear" className="block text-sm text-zinc-400 mb-1.5">
              Year
            </label>
            <input
              id="vehicleYear"
              name="vehicleYear"
              type="text"
              value={form.vehicleYear}
              onChange={handleChange}
              placeholder="2021"
              maxLength={4}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vehicleMake" className="block text-sm text-zinc-400 mb-1.5">
              Make
            </label>
            <input
              id="vehicleMake"
              name="vehicleMake"
              type="text"
              value={form.vehicleMake}
              onChange={handleChange}
              placeholder="BMW"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vehicleModel" className="block text-sm text-zinc-400 mb-1.5">
              Model
            </label>
            <input
              id="vehicleModel"
              name="vehicleModel"
              type="text"
              value={form.vehicleModel}
              onChange={handleChange}
              placeholder="M4 Competition"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="vehicleType" className="block text-sm text-zinc-400 mb-1.5">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service */}
      <div>
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
          Service Requested
        </h3>
        <div>
          <label htmlFor="service" className="block text-sm text-zinc-400 mb-1.5">
            Service or Package <span className="text-cyan-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className={cn(inputClass, 'cursor-pointer')}
          >
            <option value="">Select a service or package</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm text-zinc-400 mb-1.5">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Any specific concerns, known paint issues, interior stains, etc."
            className={cn(inputClass, 'resize-none')}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-cyan-glow hover:shadow-cyan-glow-lg text-sm"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Request...
          </>
        ) : (
          'Request Appointment'
        )}
      </button>

      <p className="text-xs text-zinc-500 text-center">
        We confirm all appointments within 24 hours. No spam, ever.
      </p>
    </form>
  );
}

const inputClass =
  'w-full bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors';
