import type { PricingPlan } from '@/types'
import { SALES_URL, SIGNUP_URL } from './navigation'

export const ANNUAL_DISCOUNT_PERCENT = 20

export const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For individuals and small teams getting started.',
    monthly: 0,
    annual: 0,
    cta: 'Get started free',
    href: SIGNUP_URL,
    features: ['Up to 3 projects', 'Basic analytics', '5 team members', 'Community support', 'Core integrations'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need speed and automation.',
    monthly: 29,
    annual: 23,
    cta: 'Start Pro trial',
    href: SIGNUP_URL,
    highlighted: true,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Unlimited team members',
      'Priority support',
      'All integrations',
      'AI-powered workflows',
      'Custom dashboards',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with advanced security needs.',
    monthly: null,
    annual: null,
    priceLabel: 'Custom',
    cta: 'Talk to sales',
    href: SALES_URL,
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security and SSO',
      'Custom onboarding',
      '99.99% uptime SLA',
      'Dedicated infrastructure',
    ],
  },
]
