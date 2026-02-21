import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

// Mock monitor data for the CSS dashboard mockup
const monitors = [
  { name: 'api.acme.com', status: 'up', uptime: '99.98%', response: '142ms', location: 'US East' },
  { name: 'app.acme.com', status: 'up', uptime: '100%', response: '89ms', location: 'EU West' },
  { name: 'cdn.acme.com', status: 'up', uptime: '99.99%', response: '34ms', location: 'Global' },
  { name: 'payments.acme.com', status: 'down', uptime: '99.72%', response: '—', location: 'US East' },
];

// Bar heights for the mini response-time chart (relative units)
const chartBars = [40, 55, 45, 60, 52, 48, 65, 50, 43, 58, 46, 70, 52, 44, 60];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-slate opacity-100" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] rounded-full bg-orange-900/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] rounded-full bg-amber-900/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-950/40 text-xs font-medium text-orange-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              30-second check intervals now available
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Know before{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                your customers
              </span>{' '}
              do
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              Beacon monitors your websites and APIs every 30 seconds from 8 global locations. Get paged on Slack or PagerDuty the instant something breaks — before a single user notices.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base transition-colors shadow-glow-brand"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold text-base transition-colors"
              >
                <Play className="w-4 h-4" />
                See how it works
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-white">99.99%</p>
                <p className="text-xs text-slate-400 mt-0.5">Platform uptime SLA</p>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-xs text-slate-400 mt-0.5">Global locations</p>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div>
                <p className="text-2xl font-bold text-white">30s</p>
                <p className="text-xs text-slate-400 mt-0.5">Fastest check interval</p>
              </div>
            </div>
          </div>

          {/* Right: CSS dashboard mockup */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-2xl bg-orange-600/10 blur-xl" />

            <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Dashboard header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-700" />
                    <span className="w-3 h-3 rounded-full bg-slate-700" />
                    <span className="w-3 h-3 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">beacon.app/dashboard</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  3 / 4 Operational
                </span>
              </div>

              {/* Monitor rows */}
              <div className="divide-y divide-slate-800/60">
                {monitors.map((monitor) => (
                  <div key={monitor.name} className="flex items-center px-5 py-3.5 gap-3 hover:bg-slate-800/30 transition-colors">
                    {/* Status dot */}
                    <div className="flex-shrink-0">
                      {monitor.status === 'up' ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] block" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] block animate-pulse" />
                      )}
                    </div>

                    {/* Name */}
                    <span className="flex-1 text-sm font-mono text-slate-200 truncate">{monitor.name}</span>

                    {/* Location */}
                    <span className="hidden sm:block text-xs text-slate-500 w-20 text-center">{monitor.location}</span>

                    {/* Uptime */}
                    <span className="text-xs font-medium text-slate-300 w-14 text-right">{monitor.uptime}</span>

                    {/* Response */}
                    <span
                      className={`text-xs font-mono w-14 text-right ${
                        monitor.status === 'up' ? 'text-orange-400' : 'text-red-400'
                      }`}
                    >
                      {monitor.response}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mini response time chart */}
              <div className="px-5 py-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Response time — last 15 checks</span>
                  <span className="text-xs text-orange-400 font-mono">avg 93ms</span>
                </div>
                <div className="flex items-end gap-0.5 h-10">
                  {chartBars.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-orange-600/70 hover:bg-orange-500/80 transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating incident alert badge */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/90 border border-red-800/60 shadow-lg backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping-slow flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-300">Incident detected</p>
                <p className="text-xs text-red-500 font-mono">payments.acme.com · 34s ago</p>
              </div>
            </div>

            {/* Floating Slack notification */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-lg backdrop-blur-sm">
              <div className="w-6 h-6 rounded-md bg-[#4A154B] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">#</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Paged via Slack</p>
                <p className="text-xs text-slate-400">on-call · now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
