import Link from 'next/link';
import { Radio, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center">
            <Radio className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        <div className="text-6xl font-bold text-indigo-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-400 mb-8">
          We monitor uptime for thousands of endpoints — but this one doesn&rsquo;t exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Beacon
        </Link>
      </div>
    </div>
  );
}
