import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3">404</p>
      <h1 className="text-4xl font-bold text-navy-950 mb-4">Page Not Found</h1>
      <p className="text-gray-600 max-w-md mb-8">
        We couldn't find the page you're looking for. Head back home or contact us directly.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-navy-950 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
