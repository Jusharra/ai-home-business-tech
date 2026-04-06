import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Training Sessions | First-Choice Cyber | Los Angeles',
  description:
    'Hands-on, personalized AI training for individuals and teams. Learn ChatGPT, Claude, and automation tools with expert guidance. In-person & virtual.',
};

export default function AITrainingPage() {
  const service = getServiceBySlug('ai-training');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
