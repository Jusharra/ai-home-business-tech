'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Testimonials() {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            Real results
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full p-6 border-slate-200 hover:shadow-lg transition-shadow bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#06B6D4]/20" />
                </div>
                <p className="text-[#0F172A] text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">{t.name}</p>
                      <p className="text-xs text-[#64748B]">{t.title}</p>
                      <p className="text-xs text-[#64748B]">{t.location}</p>
                    </div>
                  </div>
                  {t.service && (
                    <Badge variant="secondary" className="mt-3 text-xs">
                      {t.service}
                    </Badge>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
