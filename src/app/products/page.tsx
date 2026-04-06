'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { products, productCategories } from '@/data/products';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const [category, setCategory] = useState<string>('all');

  const filtered = category === 'all' ? products : products.filter((p) => p.category === category);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Resources</p>
          <h1 className="text-5xl font-extrabold text-white mb-5">AI Products &amp; Resources</h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Templates, guides, prompt packs, and hardware recommendations to supercharge your AI journey.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="container-wide flex flex-wrap gap-2 justify-center">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                category === cat.id
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-slate-200'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <p className="text-center text-[#64748B] py-20">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Affiliate disclosure */}
      <div className="container-wide pb-8 px-4 md:px-8">
        <p className="text-xs text-[#64748B] text-center">
          Some products contain affiliate links. As an affiliate partner, we may earn commissions from qualifying purchases at no extra cost to you.
        </p>
      </div>
    </>
  );
}
