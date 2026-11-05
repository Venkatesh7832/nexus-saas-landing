import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { plans } from '@/data/pricing'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BillingToggle } from './BillingToggle'
import type { Billing } from './BillingToggle'
import { PricingCard } from './PricingCard'

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [direction, setDirection] = useState<1 | -1>(1);

  const change = (next: Billing) => {
    setDirection(next === 'annual' ? 1 : -1)
    setBilling(next)
  }

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative overflow-x-clip py-20 sm:py-28">
      <Container>
        <SectionHeading id="pricing-heading" title="Simple pricing that scales with you." description="Start free, upgrade when your team is ready. No hidden fees, cancel anytime." />
        <div className="mt-10">
          <BillingToggle value={billing} onChange={change} />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billing={billing} direction={direction} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
