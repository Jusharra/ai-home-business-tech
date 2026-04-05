import type { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { CheckCircle2, X, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | First Choice Cyber',
  description:
    'Learn about First Choice Cyber—why we started, what makes us different, and how we help families and businesses in Los Angeles and the Central Valley with AI.',
};

const differentiators = [
  {
    them: 'Sell you software and leave you to figure it out',
    us: 'Come to you, set it up, train you, and support you',
  },
  {
    them: 'Generic solutions built for everyone',
    us: 'Custom AI systems built for YOUR life or business',
  },
  {
    them: 'Call centers and ticket queues',
    us: 'Direct access to real humans who know your setup',
  },
  {
    them: 'One-time transaction',
    us: 'Ongoing relationship and continuous optimization',
  },
];

const values = [
  {
    title: 'We Show Up',
    description: 'In-person, hands-on service. We come to you. No shipping things to yourself and figuring it out alone.',
    icon: '🤝',
  },
  {
    title: 'We Simplify',
    description: 'No jargon, no confusion. We make complex technology feel simple and approachable for everyone.',
    icon: '✨',
  },
  {
    title: 'We Support',
    description: 'We\'re not done when setup is done. We\'re ongoing partners who keep your AI running and improving.',
    icon: '🛡️',
  },
];

const serviceAreas = [
  {
    region: 'Los Angeles County',
    areas: ['West LA', 'Brentwood', 'Pacific Palisades', 'Beverly Hills', 'Santa Monica', 'Culver City', 'Westwood'],
  },
  {
    region: 'Kern County',
    areas: ['Bakersfield', 'Rosamond', 'Tehachapi', 'Wasco', 'Shafter'],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Our story</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            We Make AI Work For Real People
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Not another tech company. A partner who shows up, sets up, and sticks around.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Why First Choice Cyber Exists</h2>
            <p className="text-[#64748B] leading-relaxed mb-4">
              We kept seeing the same thing: incredible AI tools that could genuinely transform people&apos;s lives and businesses—but nobody to help them actually use those tools. Thousands of dollars of AI software sitting unused because setup was confusing. Business owners losing leads while their AI software sat unconfigured. Families with smart home devices that barely worked.
            </p>
            <p className="text-[#64748B] leading-relaxed mb-4">
              The gap wasn&apos;t the technology. It was the human layer. The person who shows up, figures out what YOU need, sets it up the right way, and makes sure you can actually use it.
            </p>
            <p className="text-[#64748B] leading-relaxed">
              That&apos;s First Choice Cyber. We&apos;re the white-glove AI deployment team for homes and businesses in Los Angeles and the Central Valley. We come to you. We set up AI systems customized for your life. We train you. We support you. And we&apos;re here for the long haul.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]">What Makes Us Different</h2>
          </div>
          <div className="space-y-4">
            {differentiators.map((d, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Others</p>
                    <p className="text-sm text-[#64748B]">{d.them}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-1">Us</p>
                    <p className="text-sm text-[#0F172A] font-medium">{d.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#0F172A]">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Our Approach</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A]">Where We Serve</h2>
            <p className="text-[#64748B] mt-2">In-person service throughout:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceAreas.map((area) => (
              <div key={area.region} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#06B6D4]" />
                  <h3 className="font-bold text-[#0F172A]">{area.region}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.areas.map((a) => (
                    <span key={a} className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1 text-[#64748B]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#64748B] mt-6">
            Virtual consultations and training sessions available nationwide.
          </p>
        </div>
      </section>

      <CTASection headline="Ready to Meet Us?" subhead="Book a free consultation and let's talk about what AI can do for you." />
    </>
  );
}
