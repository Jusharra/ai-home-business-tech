import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Building2, GraduationCap, Headphones, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'AI Services for Home & Business | First-Choice Cyber',
  description:
    'From home AI setup to full business automation—white-glove, in-person AI deployment for Los Angeles and the Central Valley.',
};

const homeServices = [
  {
    icon: Home,
    title: 'Home AI Setup',
    description:
      'AI assistants, smart home integration, email and calendar automation, and hands-on training for your household.',
    price: 'From $249',
    href: '/services/home-ai-setup',
  },
];

const businessServices = [
  {
    icon: Building2,
    title: 'Business AI Setup',
    description:
      'Lead follow-up, email management, scheduling automation, and custom workflow systems for your business.',
    price: 'From $500',
    href: '/services/business-ai',
  },
  {
    icon: GraduationCap,
    title: 'AI Training',
    description:
      'Hands-on, personalized training so you and your team can actually use AI effectively.',
    price: 'From $149',
    href: '/services/ai-training',
  },
  {
    icon: Headphones,
    title: 'AI Support',
    description:
      'Monthly maintenance plans that keep your AI systems optimized, updated, and performing.',
    price: 'From $129/mo',
    href: '/services/ai-support',
  },
];

const allServices = [
  { icon: Home, title: 'Home AI Setup', description: 'AI for your household', price: 'From $249', href: '/services/home-ai-setup', color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10' },
  { icon: Building2, title: 'Business AI Setup', description: 'AI for your business', price: 'From $500', href: '/services/business-ai', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
  { icon: GraduationCap, title: 'AI Training', description: 'Learn AI hands-on', price: 'From $149', href: '/services/ai-training', color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10' },
  { icon: Headphones, title: 'AI Support', description: 'Ongoing maintenance', price: 'From $129/mo', href: '/services/ai-support', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
  { icon: MapPin, title: 'Google My Business Optimization', description: 'Rank higher on Google Maps + AI search', price: 'From $500', href: '/services/google-my-business', color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            All services
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            AI Services for Home &amp; Business
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From simple setup to full AI transformation, we meet you where you are.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allServices.map((service) => (
              <Link key={service.href} href={service.href} className="group">
                <Card className="h-full p-8 border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white">
                  <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-5`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-3">{service.title}</h2>
                  <p className="text-[#64748B] leading-relaxed mb-5">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{service.price}</Badge>
                    <span className={`flex items-center gap-1 text-sm font-medium ${service.color} group-hover:gap-2 transition-all`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not Sure Where to Start?"
        subhead="Book a free consultation and we'll help you figure out exactly what you need."
      />
    </>
  );
}
