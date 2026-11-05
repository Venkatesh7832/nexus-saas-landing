import { motion } from 'framer-motion'
import { Rocket, Sparkles, Workflow, Zap } from 'lucide-react'
import { scaleIn } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { SALES_URL, SIGNUP_URL } from '@/data/navigation'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

const floaters = [
  { Icon: Rocket, pos: 'top-8 left-[6%]', delay: '0s', color: 'text-cyan' },
  { Icon: Zap, pos: 'top-12 right-[8%]', delay: '-2s', color: 'text-secondary' },
  { Icon: Workflow, pos: 'bottom-10 left-[12%]', delay: '-4s', color: 'text-primary' },
  { Icon: Sparkles, pos: 'bottom-12 right-[10%]', delay: '-1s', color: 'text-success' },
]

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-28">
      <Container>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute top-[-40%] left-1/2 h-[480px] w-[760px] max-w-none -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.45),rgba(139,92,246,0.2)_45%,transparent_70%)]"
              animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
            {floaters.map(({ Icon, pos, delay, color }) => (
              <span key={pos} style={{ animationDelay: delay }} className={`animate-float absolute hidden h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] sm:grid ${pos}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </span>
            ))}
          </div>

          <div className="relative mx-auto max-w-3xl">
            <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
              Ready to transform the way your team works?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-body text-pretty sm:text-lg">
              Join the teams building better workflows with Nexus. Start free and see what you can accomplish.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href={SIGNUP_URL} size="lg" arrow className="w-full sm:w-auto">Start building free</Button>
              <Button href={SALES_URL} variant="ghost" size="lg" className="w-full sm:w-auto">Talk to sales</Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
