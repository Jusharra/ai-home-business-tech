import type { Metadata } from 'next';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Clock, FileText, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get a Custom Quote | First Choice Cyber',
  description:
    'Request a custom quote for AI setup, training, or support. Tell us what you need and we\'ll respond within 24 hours with a tailored proposal.',
};

const steps = [
  { icon: FileText, title: 'Submit your request', desc: 'Fill in the form with your needs and budget' },
  { icon: Clock, title: 'We review within 24 hours', desc: 'Our team reviews and prepares your quote' },
  { icon: Phone, title: 'Discovery call', desc: 'We schedule a brief call to clarify details' },
];

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Custom quote</p>
          <h1 className="text-5xl font-extrabold text-white mb-5">Tell Us What You Need</h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            We&apos;ll review your request and send a custom proposal within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="font-bold text-[#0F172A] mb-4">What Happens Next</h2>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-4 h-4 text-[#06B6D4]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{step.title}</p>
                        <p className="text-xs text-[#64748B]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0F172A] rounded-2xl p-6">
                <p className="text-[#06B6D4] font-semibold text-sm mb-2">Prefer to talk first?</p>
                <p className="text-white font-bold text-lg mb-1">(555) 000-0000</p>
                <p className="text-slate-400 text-sm">Mon–Fri, 9am–6pm PT</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6">Request a Quote</h2>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
