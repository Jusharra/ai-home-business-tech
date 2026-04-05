'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

interface CTASectionProps {
  headline?: string;
  subhead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  dark?: boolean;
}

export function CTASection({
  headline = 'Ready to Reclaim Your Time?',
  subhead = 'Book a free 15-minute consultation and see what AI can do for you.',
  primaryLabel = 'Book Free Consultation',
  primaryHref = '/contact',
  dark = true,
}: CTASectionProps) {
  return (
    <section
      className={`section-padding relative overflow-hidden ${
        dark ? 'bg-[#0F172A]' : 'bg-[#06B6D4]'
      }`}
    >
      {dark && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container-wide relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{headline}</h2>
          <p className="text-lg text-white/80 mb-8">{subhead}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#0F172A] hover:bg-white/90 font-semibold px-8 py-6 text-base hover:scale-105 transition-all"
            >
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base"
            >
              <a href="tel:+15550000000">
                <Phone className="mr-2 w-5 h-5" />
                (555) 000-0000
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
