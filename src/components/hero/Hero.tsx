import { motion } from 'framer-motion'
import { fadeUp } from '@/animations/motionVariants'
import { SIGNUP_URL } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { AnimatedBadge } from './AnimatedBadge'
import { AnimatedHeadline } from './AnimatedHeadline'
import { MagneticButton } from './MagneticButton'
import { ProductPreview } from './ProductPreview'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 h-[620px] w-[900px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.28),transparent_65%)]" />
        <div className="absolute top-[10%] right-[-10%] h-[420px] w-[520px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18),transparent_70%)]" />
        <div className="absolute top-[30%] left-[-10%] h-[360px] w-[460px] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <AnimatedBadge>Introducing Version 2.0</AnimatedBadge>

          <div id="hero-heading" className="mt-8">
            <AnimatedHeadline
              lines={['Your workflow.', 'Without limits.']}
              className="text-[clamp(2.5rem,9vw,5.5rem)] leading-[1.04] font-bold tracking-tight"
            />
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.1 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-body text-pretty sm:text-lg md:text-xl"
          >
            One intelligent workspace to plan projects, automate workflows, and help your team move from ideas to impact — faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <MagneticButton href={SIGNUP_URL}>Start building free</MagneticButton>
            <Button href="#features" variant="ghost" size="lg" arrow>
              Explore the platform
            </Button>
          </motion.div>
        </div>

        <ProductPreview />
      </Container>
    </section>
  )
}
