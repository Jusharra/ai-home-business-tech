'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#0F172A] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#06B6D4]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 hero-grid-bg" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-3 py-1">
              <MapPin className="w-3.5 h-3.5" />
              Serving LA &amp; Central Valley
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
          >
            AI That Works{' '}
            <span className="gradient-text">While You Live</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl"
          >
            We set up, train, and support AI systems that handle your busywork so you can focus
            on what matters. White glove, in-person service for homes and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold text-base px-8 py-6 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <Link href="/contact">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-black shadow-cyan-500/25 hover:border-white/40 text-base px-8 py-6"
            >
              <Link href="/how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {[
              'Free 15-min consultation',
              'In-person setup & training',
              'Ongoing support included',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
        >
          {[
            { value: '100+', label: 'Setups Completed' },
            { value: '5★', label: 'Average Rating' },
            { value: '2 hrs', label: 'Avg. Setup Time' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
