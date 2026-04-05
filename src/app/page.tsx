import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { generalFaqs } from '@/data/faqs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <SolutionSection />
      <ServicesGrid />
      <HowItWorksSection />
      <Testimonials />
      <CTASection />
      <FAQAccordion faqs={generalFaqs.slice(0, 4)} showViewAll title="Common Questions" />
    </>
  );
}
