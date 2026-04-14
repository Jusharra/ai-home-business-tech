'use client';

import { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/booking/BookingModal';
import type { Service } from '@/types';

function parsePriceNumeric(price: string): number {
  return parseFloat(price.replace(/[$,]/g, '')) || 0;
}

interface SelectedPackage {
  name: string;
  price: string;
  priceNumeric: number;
}

export function ServicePackageCards({ service }: { service: Service }) {
  const [selected, setSelected] = useState<SelectedPackage | null>(null);

  const gridCols =
    service.packages.length === 2
      ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
      : 'grid-cols-1 md:grid-cols-3';

  return (
    <>
      <div className={`grid ${gridCols} gap-6`}>
        {service.packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col bg-white border-2 rounded-2xl p-6 h-full ${
              pkg.isPopular
                ? 'border-[#06B6D4] shadow-xl shadow-cyan-500/10'
                : 'border-slate-200'
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#06B6D4] text-white px-3 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> Most Popular
                </Badge>
              </div>
            )}

            <h3 className="text-lg font-bold text-[#0F172A] mb-1">{pkg.name}</h3>
            <p className="text-2xl font-extrabold text-[#0F172A] mb-1">{pkg.price}</p>
            {!service.bookingOnly && <p className="text-xs text-slate-400 mb-4">one-time</p>}
            <p className="text-sm text-[#64748B] mb-4">{pkg.description}</p>

            <ul className="space-y-2 mb-6 flex-1">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={() =>
                setSelected({
                  name: pkg.name,
                  price: pkg.price,
                  priceNumeric: parsePriceNumeric(pkg.price),
                })
              }
              className={`w-full font-semibold ${
                pkg.isPopular
                  ? 'bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-[#0F172A] hover:bg-[#1e293b] text-white'
              }`}
            >
              {pkg.cta}
            </Button>
          </div>
        ))}
      </div>

      {selected && (
        <BookingModal
          serviceSlug={service.slug}
          serviceTitle={service.title}
          packageName={selected.name}
          packagePrice={selected.price}
          packagePriceNumeric={selected.priceNumeric}
          bookingOnly={service.bookingOnly}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
