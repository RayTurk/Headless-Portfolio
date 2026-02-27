import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const results = [
  { id: 1, label: 'Lip Enhancement', detail: 'Hyaluronic Acid Filler', image: '/images/result-lips.jpg' },
  { id: 2, label: 'Cheek Contouring', detail: 'Sculptra + Filler', image: '/images/result-cheeks.jpg' },
  { id: 3, label: 'Skin Resurfacing', detail: 'RF Microneedling Series', image: '/images/result-skin.jpg' },
];

export default function ResultsGallery() {
  return (
    <section className="py-20 lg:py-28 bg-parchment-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-xs tracking-[0.25em] uppercase text-drift font-sans">Real Results</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-light text-bark leading-tight">
            The proof is in<br />
            <em className="text-blush-500 not-italic">the transformation</em>
          </h2>
          <p className="mt-4 text-base text-drift font-sans leading-relaxed">
            Every result shown is from a real Luminary patient. Individual outcomes vary — that&rsquo;s why every plan begins with a personal consultation.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((r) => (
            <div key={r.id} className="group relative rounded-2xl overflow-hidden bg-parchment-200">
              {/* Image slot */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={r.image}
                  fill
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  alt={r.label}
                />
              </div>

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-bark/60 to-transparent">
                <p className="font-display text-lg font-medium text-white">{r.label}</p>
                <p className="text-xs text-white/70 font-sans tracking-wider">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-blush-500 hover:bg-blush-600 text-white font-sans font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200"
          >
            Book Your Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
