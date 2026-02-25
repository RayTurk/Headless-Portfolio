import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-10 h-px bg-gold-400 mx-auto mb-8" />
      <h1 className="font-display text-6xl font-light text-bark mb-4">404</h1>
      <p className="text-drift font-sans mb-8">That page doesn&rsquo;t exist.</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-full bg-blush-500 hover:bg-blush-600 text-white font-sans text-sm transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
