'use client';

import { useState } from 'react';
import { Check, Star, Zap, Briefcase } from 'lucide-react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalSubscribeButton } from '@/components/ecommerce/PayPalSubscribeButton';

const homeFeatures = [
  'Priority support (same-day response)',
  'Monthly AI tips and updates',
  'Annual in-home AI checkup',
  'Member discounts on all home services',
  'Quarterly workflow optimization',
  'Access to member-only resources',
];

const businessFeatures = [
  'Dedicated business support contact',
  'Monthly video check-in call',
  'Annual on-site optimization visit',
  'Member pricing on all business services',
  'Proactive workflow monitoring',
  'Team training access & updates',
];

function MembershipCard({
  title,
  Icon,
  accent,
  monthlyPrice,
  annualPrice,
  savingsText,
  monthlyPlanId,
  annualPlanId,
  features,
}: {
  title: string;
  Icon: React.ElementType;
  accent: string;
  monthlyPrice: string;
  annualPrice: string;
  savingsText: string;
  monthlyPlanId: string;
  annualPlanId: string;
  features: string[];
}) {
  const [isAnnual, setIsAnnual] = useState(false);

  const price = isAnnual ? annualPrice : monthlyPrice;
  const period = isAnnual ? '/year' : '/month';
  const planId = isAnnual ? annualPlanId : monthlyPlanId;
  const planName = `${title} (${isAnnual ? 'Annual' : 'Monthly'})`;

  return (
    <div className="flex flex-col bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}18` }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
      </div>

      {/* Monthly / Annual toggle */}
      <div className="flex bg-[#F1F5F9] rounded-full p-1 mb-6">
        <button
          onClick={() => setIsAnnual(false)}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
            !isAnnual ? 'bg-white shadow-md text-[#0F172A]' : 'text-[#64748B]'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
            isAnnual ? 'bg-white shadow-md text-[#0F172A]' : 'text-[#64748B]'
          }`}
        >
          Annual{' '}
          <span className="text-xs text-green-600 font-semibold ml-0.5">{savingsText}</span>
        </button>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-5xl font-extrabold text-[#0F172A]">{price}</span>
        <span className="text-[#64748B] text-base ml-1">{period}</span>
        {isAnnual && <p className="text-xs text-green-600 mt-1">Billed annually</p>}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[#64748B]">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
            {f}
          </li>
        ))}
      </ul>

      <PayPalSubscribeButton planId={planId} planName={planName} />
    </div>
  );
}

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-wide text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-full px-4 py-1.5 text-[#06B6D4] text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-[#06B6D4]" />
            AI Concierge Membership
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            Your Dedicated AI Partner
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ongoing support, priority access, and expert optimization — for your home or business.
            Cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A]">Choose Your Membership</h2>
            <p className="text-[#64748B] mt-2">
              Home or business — ongoing AI concierge support tailored to you.
            </p>
          </div>

          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'placeholder',
              vault: true,
              intent: 'subscription',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <MembershipCard
                title="Home AI Concierge"
                Icon={Zap}
                accent="#06B6D4"
                monthlyPrice="$99"
                annualPrice="$999"
                savingsText="Save ~16%"
                monthlyPlanId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_HOME_MONTHLY || 'placeholder'}
                annualPlanId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_HOME_ANNUAL || 'placeholder'}
                features={homeFeatures}
              />
              <MembershipCard
                title="Business AI Concierge"
                Icon={Briefcase}
                accent="#8B5CF6"
                monthlyPrice="$499"
                annualPrice="$3,999"
                savingsText="Save ~33%"
                monthlyPlanId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_BUSINESS_MONTHLY || 'placeholder'}
                annualPlanId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_BUSINESS_ANNUAL || 'placeholder'}
                features={businessFeatures}
              />
            </div>
          </PayPalScriptProvider>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-2xl">
          <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-6">Questions?</h2>
          <div className="space-y-4 text-sm text-[#64748B]">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Monthly plans cancel anytime with no penalty. Annual plans are billed once per year.',
              },
              {
                q: 'What if I already have a setup package?',
                a: 'Membership is the perfect next step after setup. You get ongoing support, discounts on future services, and peace of mind.',
              },
              {
                q: 'How is support delivered?',
                a: 'Via email, phone, or text — whichever you prefer. We respond same-day for all concierge members.',
              },
              {
                q: 'Can I switch between Home and Business?',
                a: 'Yes. You can switch plans at any time. Contact us and we will handle the transition.',
              },
            ].map((item) => (
              <div key={item.q} className="border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-[#0F172A] mb-1">{item.q}</p>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
