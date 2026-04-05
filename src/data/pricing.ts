export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface TrainingPlan {
  price: string;
  label: string;
  features: string[];
}

// ─── Home AI Setup ────────────────────────────────────────────────────────────

export const homeSetupTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: '$249',
    description: 'Getting started with AI at home',
    features: [
      '1 AI tool setup',
      'Up to 2 devices configured',
      'Basic email automation',
      'Calendar integration',
      '30-minute hands-on training',
      '7-day follow-up support',
    ],
  },
  {
    name: 'Standard',
    price: '$449',
    description: 'Full household automation',
    features: [
      '2–3 AI tools setup',
      'Up to 4 devices configured',
      'Smart home integration',
      'Email & calendar automation',
      'Grocery and task automation',
      '1-hour training session',
      '30-day follow-up support',
      'Monthly check-in call',
    ],
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '$749',
    description: 'Complete AI for busy families',
    features: [
      'Full home AI setup',
      'Smart home + AI integration',
      'Advanced automations',
      'Training included',
      'Up to 5 devices configured',
      'All email, calendar & task automation',
      'Family workflow setup',
      '90-minute training for all family members',
      '90-day support package',
      'Quarterly optimization session',
    ],
  },
];

// ─── Business AI ─────────────────────────────────────────────────────────────

export const businessSetupTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$500',
    description: 'Solo or small business',
    features: [
      '1 automation system',
      'Basic setup (email, chatbot, or scheduling)',
    ],
  },
  {
    name: 'Growth',
    price: '$1,000',
    description: 'Growing teams',
    features: [
      '2–3 automation systems',
      'Email + scheduling + basic workflows',
      'Workflow optimization',
    ],
    isPopular: true,
  },
  {
    name: 'Advanced',
    price: '$3,000',
    description: 'Full AI transformation',
    features: [
      'Full business AI system',
      'Multi-step automations',
      'Customer interaction workflows',
      'Custom integrations',
      'Training included',
    ],
  },
];

// ─── AI Training ──────────────────────────────────────────────────────────────

export const homeTraining: TrainingPlan = {
  price: '$149',
  label: 'Home AI Training',
  features: [
    '90-minute 1-on-1 session',
    'Advanced prompting and workflows',
    'AI tools for your specific industry',
    'Automation and integration setup',
    'Custom workflow templates',
    '2-week follow-up support',
  ],
};

export const businessTraining: TrainingPlan = {
  price: '$1,299',
  label: 'Business AI Workshop',
  features: [
    'Half-day workshop (up to 10 people)',
    'Customized to your industry and tools',
    'Hands-on practice for all attendees',
    'Team workflow templates',
    'Q&A session included',
    '30-day team support',
    'Recording provided',
  ],
};
