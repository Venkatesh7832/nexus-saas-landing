import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { faqs } from '@/data/faqs'
import { SALES_URL } from '@/data/navigation'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQItem } from './FAQItem'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-heading" align="left" title="Frequently asked questions." description="Can't find what you're looking for? Our team is happy to help." />
          <a href={SALES_URL} className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-white hover:underline">
            Contact support
          </a>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={faq.question} variants={staggerItem}>
              <FAQItem faq={faq} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
