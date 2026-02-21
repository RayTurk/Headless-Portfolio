import { MapPin } from 'lucide-react';
import { serviceAreas } from '@/lib/data';

export default function ServiceAreas() {
  const byCounty = serviceAreas.reduce<Record<string, string[]>>((acc, area) => {
    if (!acc[area.county]) acc[area.county] = [];
    acc[area.county].push(area.city);
    return acc;
  }, {});

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Where We Work
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-950 mb-4">
            Serving Greater Cleveland
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We serve a 50-mile radius of the Greater Cleveland area, with fast response times throughout Lake and Geauga counties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {Object.entries(byCounty).map(([county, cities]) => (
            <div key={county} className="bg-white rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-navy-950">{county} County</h3>
              </div>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {cities.map((city) => (
                  <li key={city} className="text-sm text-gray-600">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't see your city?{' '}
          <a href="/contact" className="text-amber-600 font-medium hover:underline">
            Contact us — we may still serve your area.
          </a>
        </p>
      </div>
    </section>
  );
}
