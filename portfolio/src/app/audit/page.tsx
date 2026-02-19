'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Search, CheckCircle, XCircle, AlertCircle, ArrowRight,
  Globe, Shield, Smartphone, Share2, ChevronDown, ChevronUp,
} from 'lucide-react';
import type { AuditResult, AuditCheck } from '@/app/api/audit/route';

type Step = 'form' | 'scanning' | 'results';

const categoryMeta = {
  seo: { label: 'SEO', icon: Search, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  technical: { label: 'Technical', icon: Globe, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  social: { label: 'Social Sharing', icon: Share2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  accessibility: { label: 'Accessibility', icon: Smartphone, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
} as const;

const scanMessages = [
  'Connecting to your site…',
  'Checking SSL certificate…',
  'Analyzing page title & meta tags…',
  'Scanning H1 headings…',
  'Checking mobile viewport…',
  'Evaluating Open Graph tags…',
  'Inspecting image accessibility…',
  'Looking for structured data…',
  'Checking canonical URLs…',
  'Measuring server response time…',
  'Compiling your report…',
];

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 80 ? 'Good' : score >= 50 ? 'Needs Work' : 'Poor';
  const circumference = 2 * Math.PI * 54;
  const dash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - dash }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

function CheckItem({ check }: { check: AuditCheck }) {
  const [open, setOpen] = useState(false);
  const icon = check.status === 'pass'
    ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
    : check.status === 'warning'
    ? <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
    : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />;

  return (
    <div className="border border-slate-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
      >
        {icon}
        <span className="flex-1 text-sm text-slate-300">{check.name}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          check.status === 'pass' ? 'bg-emerald-500/15 text-emerald-400' :
          check.status === 'warning' ? 'bg-amber-500/15 text-amber-400' :
          'bg-red-500/15 text-red-400'
        }`}>
          {check.status === 'pass' ? 'Pass' : check.status === 'warning' ? 'Warning' : 'Fail'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-1 font-medium">{check.message}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{check.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuditPage() {
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scanMessage, setScanMessage] = useState(scanMessages[0]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!url.trim()) e.url = 'Website URL is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('scanning');
    setApiError('');

    // Cycle through scan messages
    let i = 0;
    const interval = setInterval(() => {
      i = Math.min(i + 1, scanMessages.length - 1);
      setScanMessage(scanMessages[i]);
    }, 900);

    // Submit to Netlify for lead capture
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'audit', name, email, website: url }).toString(),
    }).catch(() => {/* non-critical */});

    // Run audit
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, name, email }),
      });
      clearInterval(interval);
      setScanMessage(scanMessages[scanMessages.length - 1]);
      await new Promise((r) => setTimeout(r, 600));

      if (!res.ok) throw new Error('Audit failed');
      const data: AuditResult = await res.json();
      setResult(data);
      setStep('results');
    } catch {
      clearInterval(interval);
      setApiError('Something went wrong running the audit. Please try again.');
      setStep('form');
    }
  };

  const categories = Object.keys(categoryMeta) as (keyof typeof categoryMeta)[];

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Form step ── */}
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5">
                  <Shield className="w-3.5 h-3.5" /> Free Website Audit
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  How healthy is<br />
                  <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    your website?
                  </span>
                </h1>
                <p className="text-slate-400 max-w-md mx-auto text-lg">
                  Enter your details and we&apos;ll scan your site for SEO, technical,
                  social sharing, and accessibility issues — instantly.
                </p>
              </div>

              {/* What you get */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((cat) => {
                  const { label, icon: Icon, color, bg } = categoryMeta[cat];
                  return (
                    <div key={cat} className={`rounded-xl border p-3 flex items-center gap-2.5 ${bg}`}>
                      <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                      <span className="text-sm text-slate-300 font-medium">{label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} name="audit" className="space-y-4">
                <input type="hidden" name="form-name" value="audit" />

                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${errors.name ? 'border-red-500/50' : 'border-slate-800'}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${errors.email ? 'border-red-500/50' : 'border-slate-800'}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setErrors((p) => ({ ...p, url: '' })); }}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm ${errors.url ? 'border-red-500/50' : 'border-slate-800'}`}
                  />
                  {errors.url && <p className="text-red-400 text-xs mt-1">{errors.url}</p>}
                </div>

                {apiError && <p className="text-red-400 text-sm text-center">{apiError}</p>}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Run Free Audit
                </motion.button>

                <p className="text-center text-xs text-slate-500">
                  No account needed. Results appear instantly. We may follow up with tips.
                </p>
              </form>
            </motion.div>
          )}

          {/* ── Scanning step ── */}
          {step === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center py-20"
            >
              <div className="relative inline-flex items-center justify-center mb-8">
                <motion.div
                  className="w-24 h-24 rounded-full border-2 border-indigo-500/30"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-emerald-500/40"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <Globe className="absolute w-8 h-8 text-indigo-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">Scanning your site…</h2>
              <p className="text-slate-400 text-sm mb-8 font-mono">{url}</p>

              <motion.div
                key={scanMessage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-indigo-300 text-sm font-medium"
              >
                {scanMessage}
              </motion.div>
            </motion.div>
          )}

          {/* ── Results step ── */}
          {step === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-1">Your Site Audit Report</h2>
                <p className="text-slate-400 text-sm font-mono truncate">{result.url}</p>
              </div>

              <div className="flex justify-center mb-10">
                <ScoreGauge score={result.score} />
              </div>

              {result.fetchError && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-sm">
                  <strong>Note:</strong> {result.fetchError}. Some checks could not be completed.
                </div>
              )}

              {/* Category summaries */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((cat) => {
                  const catChecks = result.checks.filter((c) => c.category === cat);
                  if (catChecks.length === 0) return null;
                  const passed = catChecks.filter((c) => c.status === 'pass').length;
                  const { label, icon: Icon, color, bg } = categoryMeta[cat];
                  return (
                    <div key={cat} className={`rounded-xl border p-4 ${bg}`}>
                      <div className={`flex items-center gap-2 mb-2 ${color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{passed}/{catChecks.length}</p>
                      <p className="text-xs text-slate-500">checks passed</p>
                    </div>
                  );
                })}
              </div>

              {/* Detailed checks by category */}
              <div className="space-y-8 mb-10">
                {categories.map((cat) => {
                  const catChecks = result.checks.filter((c) => c.category === cat);
                  if (catChecks.length === 0) return null;
                  const { label, icon: Icon, color } = categoryMeta[cat];
                  return (
                    <div key={cat}>
                      <div className={`flex items-center gap-2 mb-3 ${color}`}>
                        <Icon className="w-4 h-4" />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">{label}</h3>
                      </div>
                      <div className="space-y-2">
                        {catChecks.map((check) => (
                          <CheckItem key={check.id} check={check} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500/15 to-emerald-500/10 border border-indigo-500/25 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {result.score >= 80
                    ? 'Great foundation — let\'s take it further'
                    : result.score >= 50
                    ? 'There\'s real room to improve your site'
                    : 'Your site needs some attention'}
                </h3>
                <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                  I can help you fix these issues and build a faster, more visible website.
                  Let&apos;s talk about what your site needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get a Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => { setStep('form'); setResult(null); setUrl(''); }}
                    className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white transition-colors text-sm font-semibold"
                  >
                    Audit Another Site
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
