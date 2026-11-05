export interface NavLink {
  label: string
  href: string
}

export interface LogoBrand {
  name: string
  /** Tailwind classes giving each wordmark its own typographic character. */
  className: string
}

export type Accent = 'indigo' | 'violet' | 'cyan' | 'emerald'

export interface PricingPlan {
  id: 'starter' | 'pro' | 'enterprise'
  name: string
  description: string
  /** Price in USD per user/month. `null` means custom pricing. */
  monthly: number | null
  annual: number | null
  priceLabel?: string
  cta: string
  href: string
  highlighted?: boolean
  features: string[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  accent: Accent
}

export interface FAQ {
  question: string
  answer: string
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}
