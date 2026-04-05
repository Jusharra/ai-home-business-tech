'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { generalFaqs } from '@/data/faqs';
import {
  homeSetupTiers,
  businessSetupTiers,
  homeTraining,
  businessTraining,
  type PricingTier,
  type TrainingPlan,
} from '@/data/pricing';

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative flex flex-col bg-white border-2 rounded-2xl p-6 h-full ${
        tier.isPopular ? 'border-[#06B6D4] shadow-xl shadow-cyan-500/10' : 'border-slate-200'
      }`}
    >
      {tier.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-[#06B6D4] text-white px-3 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" /> Most Popular
          </Badge>
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-[#0F172A]">{tier.name}</h3>
        <p className="text-sm text-[#64748B] mt-1">{tier.description}</p>
      </div>
      <div className="mb-5">
        <span className="text-3xl font-extrabold text-[#0F172A]">{tier.price}</span>
        <span className="text-[#64748B] text-sm ml-1">one-time</span>
      </div>
      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#64748B]">
            <Check className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className={`w-full font-semibold ${
          tier.isPopular
            ? 'bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-lg shadow-cyan-500/20'
            : 'bg-[#0F172A] hover:bg-[#1e293b] text-white'
        }`}
      >
        <Link href="/quote">Get Started</Link>
      </Button>
    </div>
  );
}

function TrainingCard({ plan }: { plan: TrainingPlan }) {
  return (
    <div className="border-2 border-[#8B5CF6] rounded-2xl p-8 bg-white shadow-lg shadow-purple-500/10 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-[#0F172A] mb-1">{plan.label}</h3>
      <div className="mb-5">
        <span className="text-4xl font-extrabold text-[#8B5CF6]">{plan.price}</span>
        <span className="text-[#64748B] text-sm ml-1">per session</span>
      </div>
      <ul className="space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#64748B]">
            <Check className="w-4 h-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        asChild
        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold"
      >
        <Link href="/contact">Book a Session</Link>
      </Button>
    </div>
  );
}

export default function PricingPage() {
  const [tab, setTab] = useState<'home' | 'business'>('home');

  const setupTiers = tab === 'home' ? homeSetupTiers : businessSetupTiers;
  const training = tab === 'home' ? homeTraining : businessTraining;
  const sectionTitle = tab === 'home' ? 'Home AI Setup' : 'Business AI Setup';
  const sectionDesc =
    tab === 'home'
      ? 'One-time setup packages to get your home running with AI.'
      : 'One-time setup packages to transform your business with AI.';

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            Transparent pricing
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            Simple, Clear Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            No hidden fees. No surprises. Just the right package for your needs.
          </p>
        </div>
      </section>

      {/* Tab toggle */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="container-wide flex justify-center">
          <div className="flex bg-[#F1F5F9] rounded-full p-1">
            {[
              { value: 'home', label: 'Home Packages' },
              { value: 'business', label: 'Business Packages' },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value as 'home' | 'business')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t.value
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Setup tiers */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]">{sectionTitle}</h2>
            <p className="text-[#64748B] mt-2">{sectionDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {setupTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]">AI Training</h2>
            <p className="text-[#64748B] mt-2">
              Hands-on sessions to get you and your team up to speed.
            </p>
          </div>
          <TrainingCard plan={training} />
        </div>
      </section>

      {/* Membership banner */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="bg-[#0F172A] rounded-2xl p-8 md:p-12 text-center">
            <p className="text-[#06B6D4] font-semibold mb-2">Ongoing AI support</p>
            <h2 className="text-3xl font-bold text-white mb-3">
              Want Continued AI Concierge Support?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              Join our Home or Business AI Concierge membership for priority support, ongoing
              optimization, and more — billed monthly or annually.
            </p>
            <Button asChild className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold">
              <Link href="/membership">View Membership Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={generalFaqs.slice(9, 12)} title="Pricing Questions" />

      <section className="section-padding bg-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Need Something Custom?</h2>
          <p className="text-[#64748B] mb-6">Have a unique setup or budget? Let&apos;s talk.</p>
          <Button asChild className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold">
            <Link href="/quote">Request a Custom Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
