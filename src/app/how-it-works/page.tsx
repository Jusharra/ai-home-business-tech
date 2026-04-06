import type { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { CalendarCheck, Users, Wrench, BookOpen, Smile, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | First-Choice Cyber',
  description:
    'See exactly how our AI setup process works from free consultation to deployment, training, and ongoing support. No tech expertise required.',
};

const steps = [
  {
    phase: 'Step 1',
    title: 'Discovery',
    subtitle: 'Free Consultation',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
    border: 'border-[#06B6D4]/20',
    icon: CalendarCheck,
    substeps: [
      'Book your free 15-minute call (no obligation)',
      'We assess your needs and current setup',
      'You see exactly what\'s possible with AI',
      'We send a custom proposal with pricing',
    ],
  },
  {
    phase: 'Step 2',
    title: 'Deployment',
    subtitle: 'Setup & Training',
    color: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]/10',
    border: 'border-[#8B5CF6]/20',
    icon: Wrench,
    substeps: [
      'We schedule your setup appointment',
      'Our expert arrives at your home or office',
      'We install, configure, and test everything',
      'Hands-on training so you\'re confident before we leave',
    ],
  },
  {
    phase: 'Step 3',
    title: 'Ongoing',
    subtitle: 'Support & Growth',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
    border: 'border-[#06B6D4]/20',
    icon: RefreshCw,
    substeps: [
      'You live your life while AI handles the busywork',
      'We check in within 48 hours to confirm everything\'s running',
      'Support is available whenever you need it',
      'We optimize and add new features as AI evolves',
    ],
  },
];

const timelines = [
  { label: 'Consultation', time: '15–30 minutes', icon: CalendarCheck },
  { label: 'Setup appointment', time: '1–3 hours', icon: Wrench },
  { label: 'Training session', time: '30–90 minutes', icon: BookOpen },
  { label: 'First follow-up', time: 'Within 48 hours', icon: Users },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">The process</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            Your AI Journey, Step by Step
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            No tech expertise required. We handle everything from setup to support.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.phase} className={`border ${step.border} rounded-2xl p-8 ${step.bg}`}>
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${step.color}`}>{step.phase}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-1">{step.title}</h2>
                    <p className={`font-medium ${step.color} mb-4`}>{step.subtitle}</p>
                    <ul className="space-y-2">
                      {step.substeps.map((sub) => (
                        <li key={sub} className="flex items-start gap-2 text-[#64748B]">
                          <span className={`mt-1 w-5 h-5 rounded-full ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0 text-xs font-bold ${step.color}`}>✓</span>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline expectations */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]">What to Expect</h2>
            <p className="text-[#64748B] mt-2">Here&apos;s how much time each stage typically takes.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timelines.map((t) => (
              <div key={t.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <t.icon className="w-6 h-6 text-[#06B6D4] mx-auto mb-3" />
                <p className="font-semibold text-[#0F172A] text-sm">{t.label}</p>
                <p className="text-[#64748B] text-xs mt-1">{t.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Start?" subhead="Book your free consultation and take the first step." />
    </>
  );
}
