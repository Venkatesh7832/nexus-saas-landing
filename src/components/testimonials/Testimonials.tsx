import { motion } from 'framer-motion'
import { staggerContainer } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { testimonials } from '@/data/testimonials'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from './TestimonialCard'

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="testimonials-heading" title="Teams love working with Nexus." description="From fast-moving startups to established engineering orgs, teams use Nexus to cut busywork and ship with confidence." />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </motion.div>
        <p className="mt-8 text-center text-xs text-muted">Testimonials are illustrative examples written for this demo and do not represent real customers.</p>
      </Container>
    </section>
  )
}
