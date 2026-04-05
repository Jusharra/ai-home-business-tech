export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  startingPrice: string;
  heroImage?: string;
  benefits: string[];
  packages: ServicePackage[];
  useCases: string[];
  faqs: FAQ[];
  targetAudience: 'home' | 'business' | 'both';
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  image: string;
  badge?: 'Bestseller' | 'New' | 'Bundle & Save';
  isAffiliate?: boolean;
  affiliateUrl?: string;
  features: string[];
  whatsIncluded?: string[];
  rating?: number;
  reviewCount?: number;
  relatedProducts?: string[];
}

export type ProductCategory =
  | 'templates'
  | 'guides'
  | 'prompts'
  | 'hardware';

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  isAffiliate?: boolean;
  affiliateUrl?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
  ctaLink: string;
}

export interface PricingSection {
  category: 'home' | 'business' | 'training' | 'support';
  title: string;
  description: string;
  tiers: PricingTier[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  location: string;
  avatar?: string;
  rating: number;
  service?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  type: 'home' | 'business';
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  type: 'home' | 'business';
  companyName?: string;
  employeeCount?: string;
  services: string[];
  needs: string;
  budget: string;
  contactMethod: 'email' | 'phone' | 'text';
  referralSource: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
}
