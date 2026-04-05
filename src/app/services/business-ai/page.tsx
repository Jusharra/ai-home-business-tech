import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Business AI Automation | First Choice Cyber | Los Angeles',
  description:
    'Custom AI workflows for your business. Email automation, lead follow-up, scheduling, and more. In-person setup in Los Angeles and the Central Valley.',
};

export default function BusinessAIPage() {
  const service = getServiceBySlug('business-ai');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
