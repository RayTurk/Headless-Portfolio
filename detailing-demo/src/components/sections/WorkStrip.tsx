import Image from "next/image";

const workPanels = [
  {
    label: "Ceramic Coating",
    sublabel: "Nano-Ceramic Protection",
    imageSrc: "/images/work-ceramic.jpg",
    bg: "bg-gradient-to-b from-zinc-600/25 via-zinc-800 to-zinc-950",
  },
  {
    label: "Paint Correction",
    sublabel: "Swirl & Scratch Removal",
    imageSrc: "/images/work-paint-correction.jpg",
    bg: "bg-gradient-to-b from-zinc-800 via-zinc-850 to-zinc-950",
  },
  {
    label: "Interior Restore",
    sublabel: "Deep Clean & Extraction",
    imageSrc: "/images/work-interior.jpg",
    bg: "bg-gradient-to-b from-zinc-700/20 via-zinc-900 to-black",
  },
  {
    label: "Before & After",
    sublabel: "Real Results, Documented",
    imageSrc: "/images/work-before-after.webp",
    bg: "bg-gradient-to-b from-zinc-900 via-zinc-800/50 to-zinc-950",
  },
];

export default function WorkStrip() {
  return (
    <section className="bg-black">
      {/* Strip label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-5 h-px bg-zinc-800" />
          <p className="text-zinc-700 text-xs tracking-[0.22em] uppercase font-medium">
            Our Work
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900/50 h-56 sm:h-72 lg:h-[460px]">
        {workPanels.map((panel) => (
          <div
            key={panel.label}
            className="relative overflow-hidden group cursor-pointer"
          >
            {panel.imageSrc ? (
              <Image
                src={panel.imageSrc}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt={panel.label}
              />
            ) : (
              <div
                className={`absolute inset-0 ${panel.bg} transition-transform duration-700 group-hover:scale-105`}
              />
            )}

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Top amber accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-amber-400/0 group-hover:bg-amber-400/70 transition-all duration-300" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <p className="text-white font-bold text-sm lg:text-base leading-tight">
                {panel.label}
              </p>
              <p className="text-zinc-400 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {panel.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
