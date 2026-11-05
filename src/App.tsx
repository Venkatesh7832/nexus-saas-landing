import { MotionConfig } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { LogoCloud } from '@/components/logos/LogoCloud'
import { FeaturesGrid } from '@/components/features/FeaturesGrid'
import { Testimonials } from '@/components/testimonials/Testimonials'
import { PricingSection } from '@/components/pricing/PricingSection'
import { FAQSection } from '@/components/faq/FAQSection'
import { CTASection } from '@/components/cta/CTASection'
import { SectionDivider } from '@/components/ui/SectionDivider'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main">
        <Hero />
        <LogoCloud />
        <SectionDivider />
        <FeaturesGrid />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
