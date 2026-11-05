import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { fadeUp } from '@/animations/motionVariants'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import type { PricingPlan } from '@/types'
import { AnimatedPrice } from './AnimatedPrice'
import type { Billing } from './BillingToggle'

interface PricingCardProps {
  plan: PricingPlan
  billing: Billing
  direction: 1 | -1
}

export function PricingCard({ plan, billing, direction }: PricingCardProps) {
  const amount = billing === 'annual' ? plan.annual : plan.monthly
  const display = amount === null ? (plan.priceLabel ?? 'Custom') : amount === 0 ? 'Free' : `$${amount}`
  const paid = amount !== null && amount > 0

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      aria-label={`${plan.name} plan`}
      className={cn('relative rounded-3xl', plan.highlighted && 'lg:-my-4')}
    >
      {plan.highlighted && (
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-3 -inset-y-8 -z-10 sm:-inset-x-8 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.28),transparent_70%)]" />
      )}
      <div className={cn('relative flex h-full flex-col rounded-3xl border bg-card p-7 sm:p-8', plan.highlighted ? 'conic-border border-transparent bg-elevated/80 lg:py-12' : 'border-line')}>
        {plan.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-3.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-lg shadow-primary/40">
            Most Popular
          </span>
        )}
        <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
        <p className="mt-1.5 min-h-10 text-sm text-body">{plan.description}</p>

        <div className="mt-6 flex items-end gap-2">
          <AnimatedPrice value={display} direction={direction} />
          {paid && <span className="pb-2 text-sm text-muted">per user/month</span>}
        </div>
        <p className="mt-1 h-5 text-xs text-muted">{paid ? (billing === 'annual' ? 'Billed annually' : 'Billed monthly') : ''}</p>

        <Button href={plan.href} variant={plan.highlighted ? 'primary' : 'ghost'} size="lg" arrow className="mt-6 w-full">
          {plan.cta}
        </Button>

        <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
              <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.highlighted ? 'text-cyan' : 'text-success')} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
