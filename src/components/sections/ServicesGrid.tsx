'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Building2, GraduationCap, Headphones, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    icon: Home,
    title: 'Home AI Setup',
    description: 'AI assistants, automation, and smart integrations for your household.',
    price: 'From $149',
    href: '/services/home-ai-setup',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
  },
  {
    icon: Building2,
    title: 'Business AI',
    description: 'Email automation, lead follow-up, scheduling, and workflow systems.',
    price: 'From $299',
    href: '/services/business-ai',
    color: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]/10',
  },
  {
    icon: GraduationCap,
    title: 'AI Training',
    description: 'Learn to use AI effectively with hands-on, personalized training.',
    price: 'From $79',
    href: '/services/ai-training',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
  },
  {
    icon: Headphones,
    title: 'AI Support',
    description: 'Ongoing maintenance, optimization, and priority support.',
    price: 'From $29/mo',
    href: '/services/ai-support',
    color: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]/10',
  },
];

export function ServicesGrid() {
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
            What we offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">How We Help</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full p-6 border-slate-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white">
                <div
                  className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4`}
                >
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{service.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {service.price}
                  </Badge>
                  <Link
                    href={service.href}
                    className={`flex items-center gap-1 text-sm font-medium ${service.color} group-hover:gap-2 transition-all`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
