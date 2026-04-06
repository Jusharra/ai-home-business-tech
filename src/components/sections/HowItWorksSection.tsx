'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Wrench, Smile, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: CalendarCheck,
    title: 'Book a Free Consultation',
    description: "We'll discuss your needs and show you what's possible with no obligation, no tech jargon.",
  },
  {
    number: '02',
    icon: Wrench,
    title: 'We Come to You',
    description: 'Our AI expert arrives at your home or business, sets everything up, and trains you hands-on.',
  },
  {
    number: '03',
    icon: Smile,
    title: 'Live Your Life',
    description: "Your AI systems handle the busywork. We're here for ongoing support whenever you need us.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            The process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">Simple as 1-2-3</h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                {/* Step number bubble */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-brand mb-6 relative z-10 shadow-xl shadow-cyan-500/20">
                  <div className="text-center">
                    <step.icon className="w-8 h-8 text-white mx-auto" />
                    <span className="text-white text-xs font-bold opacity-70">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold px-8 py-6 text-base shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Link href="/how-it-works">
              See the Full Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
