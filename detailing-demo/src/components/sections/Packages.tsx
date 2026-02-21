import { packages } from '@/lib/data';
import PackageCard from '@/components/ui/PackageCard';

export default function Packages() {
  return (
    <section className="py-20 lg:py-24 bg-zinc-950/80 border-y border-zinc-800/50">
      {/* Subtle gradient backdrop */}
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.04)_0%,_transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14">
            <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-3">
              Packages
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose your level of clean
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              All packages include a satisfaction guarantee. Not sure which to book? Call us — we&apos;ll recommend based on your car&apos;s condition.
            </p>
          </div>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Fine print */}
          <p className="text-center text-zinc-600 text-xs mt-8">
            Prices listed are for standard-size vehicles. Trucks, SUVs, and large vehicles may vary. Final pricing confirmed at drop-off inspection.
          </p>
        </div>
      </div>
    </section>
  );
}
