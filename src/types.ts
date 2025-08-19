
import type { ReactNode } from 'react';

export interface ServicePackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  isMostPopular?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: ReactNode;
  packages: ServicePackage[];
}

export interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  review: string;
  rating: number;
}

export interface WalletBonus {
  addAmount: number;
  bonusAmount: number;
  total: number;
}

export interface User {
  email: string;
  name: string;
  isAdmin?: boolean;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userEmail: string;
  serviceName: string;
  quantity: number;
  url: string;
  price: number;
  status: OrderStatus;
  date: string;
}

// Types for Dynamic Page Content
export interface SeoData {
    title: string;
    description: string;
    url: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BenefitItem {
    title: string;
    description: string;
    icon: string; // Using a string for icon name for simplicity, will map to component
}

export interface HowItWorksStep {
    title: string;
    description: string;
}

export interface ServicePageContent {
    id: string;
    slug: string;
    hero: {
        headline: string;
        subheadline: string;
        ctaText: string;
        inputPlaceholder: string;
        trustIcons: string[];
    };
    benefits: {
        headline: string;
        items: BenefitItem[];
    };
    howItWorks: {
        headline: string;
        steps: HowItWorksStep[];
    };
    pricing: {
        headline: string;
    };
    credibility: {
        headline: string;
        guarantees: { title: string; description: string }[];
        testimonials: Testimonial[];
    };
    faq: {
        items: FaqItem[];
    };
    finalCta: {
        headline: string;
        subheadline: string;
        ctaText: string;
    };
    seo: SeoData;
}
