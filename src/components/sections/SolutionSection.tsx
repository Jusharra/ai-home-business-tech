'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, GraduationCap, Headphones, ArrowRight } from 'lucide-react';

const valueProps = [
  {
    icon: Home,
    title: 'White-Glove Setup',
    description: 'We come to your home or office. No shipping, no self-installation, no headaches.',
  },
  {
    icon: Briefcase,
    title: 'Custom AI Systems',
    description: 'Built for YOUR life or business—not a generic template that may or may not fit.',
  },
  {
    icon: GraduationCap,
    title: 'Real Training',
    description: "You'll actually know how to use everything we set up. We don't leave until you're confident.",
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: "We're here when you need us. Updates, questions, tweaks—covered.",
  },
];

export function SolutionSection() {
  return (
    <section className="section-padding bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#06B6D4]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/8 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            The solution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Personal IT for AI
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We come to you, set up AI systems tailored to your life or business, train you to use
            them, and provide ongoing support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mb-4">
                <prop.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{prop.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold px-8 py-6 text-base shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
          >
            <Link href="/services">
              See Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
