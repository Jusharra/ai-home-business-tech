import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Home AI Setup | First-Choice Cyber | Los Angeles',
  description:
    'In-person AI setup for your home. We come to you, install AI assistants and automations, train your family, and provide ongoing support. Serving LA & Central Valley.',
};

export default function HomeAISetupPage() {
  const service = getServiceBySlug('home-ai-setup');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
