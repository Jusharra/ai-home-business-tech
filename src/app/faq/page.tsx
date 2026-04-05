import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { generalFaqs } from '@/data/faqs';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'FAQ | First Choice Cyber',
  description:
    'Answers to common questions about our AI setup, training, and support services. Get clarity before you book.',
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Got questions?</p>
          <h1 className="text-5xl font-extrabold text-white mb-5">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Everything you need to know before booking. Still have questions? Just ask.
          </p>
        </div>
      </section>

      <FAQAccordion faqs={generalFaqs} title="" />

      <CTASection
        headline="Still Have Questions?"
        subhead="Book a free 15-minute call and we'll answer everything."
        primaryLabel="Book Free Call"
      />
    </>
  );
}
