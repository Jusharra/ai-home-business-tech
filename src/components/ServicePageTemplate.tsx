import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { ServicePackageCards } from '@/components/booking/ServicePackageCards';
import { Service } from '@/types';

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
              {service.targetAudience === 'home' ? 'For homes' : service.targetAudience === 'business' ? 'For businesses' : 'For everyone'}
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">{service.title}</h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">{service.fullDescription}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold px-8 py-6 text-base shadow-xl shadow-cyan-500/20">
                <Link href="/contact">Get Started <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-[#0891B2] px-8 py-6 text-base">
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">What&apos;s included</p>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">How We Help</h2>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                    <span className="text-[#64748B]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#8B5CF6] uppercase tracking-wider mb-3">Perfect for you if…</p>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-6">Who This Is For</h2>
              <ul className="space-y-3">
                {service.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    </div>
                    <span className="text-[#64748B]">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-[#0F172A]">Choose Your Package</h2>
          </div>
          <ServicePackageCards service={service} />
        </div>
      </section>

      {/* Membership CTA */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="bg-[#0F172A] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#06B6D4] font-semibold text-sm mb-1">AI Concierge Membership</p>
              <h3 className="text-2xl font-bold text-white mb-2">Want Ongoing AI Support?</h3>
              <p className="text-slate-400 max-w-lg">
                Join our Home or Business AI Concierge membership for priority support, ongoing
                optimization, and exclusive member pricing billed monthly or annually.
              </p>
            </div>
            <Button asChild className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold flex-shrink-0 px-8">
              <Link href="/membership">View Membership Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <FAQAccordion faqs={service.faqs} title={`${service.title} FAQ`} />
      )}

      <CTASection
        headline={`Ready to Get Started with ${service.title}?`}
        subhead="Book a free consultation and see what's possible."
      />
    </>
  );
}
