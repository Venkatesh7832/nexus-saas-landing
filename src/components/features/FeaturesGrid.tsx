import { motion } from 'framer-motion'
import { Bot, Lock, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { staggerContainer } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { chartPoints, securityChecks } from '@/data/features'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from './FeatureCard'
import { MetricChart } from './MetricChart'
import { CodeTyping } from './CodeTyping'
import { DragInteraction } from './DragInteraction'

function AIVisual() {
  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-secondary/20" />
      <div className="absolute inset-6 rounded-full border border-primary/25" />
      <div className="animate-orbit absolute inset-0">
        <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" />
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary" />
      </div>
      <div className="animate-orbit-rev absolute inset-6">
        <span className="absolute top-1/2 right-0 h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_#6366f1]" />
      </div>
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_50px_-4px_rgba(139,92,246,0.9)]">
        <Bot className="h-8 w-8 text-white" />
        <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-cyan" />
      </div>
    </div>
  )
}

function SecurityVisual() {
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
      <div className="relative mx-auto grid h-32 w-32 place-items-center" aria-hidden="true">
        <motion.span className="absolute inset-0 rounded-full border border-success/30" animate={{ scale: [1, 1.25], opacity: [0.7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
        <motion.span className="absolute inset-0 rounded-full border border-success/30" animate={{ scale: [1, 1.25], opacity: [0.7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }} />
        <svg viewBox="0 0 64 64" className="h-24 w-24 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">
          <motion.path
            d="M32 6 L54 14 V30 C54 44 44 54 32 58 C20 54 10 44 10 30 V14 Z"
            fill="rgba(52,211,153,0.08)"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M22 32 L29 39 L43 24"
            fill="none"
            stroke="#34D399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
        </svg>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {securityChecks.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200"
          >
            <Lock className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="features-heading"
          title="Everything your team needs, in one place."
          description="Plan, automate, ship, and measure — without juggling a dozen tabs. Nexus brings the whole workflow together."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-12"
        >
          <FeatureCard
            accent="indigo"
            title="Advanced analytics"
            description="Track revenue, usage, and team velocity in real time with dashboards that update as your product grows."
            className="lg:col-span-8"
          >
            <div className="rounded-2xl border border-line bg-page/60 p-4 sm:p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted">Monthly recurring revenue</p>
                  <p className="mt-1 text-2xl font-semibold text-white sm:text-3xl">$128,400</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> +24.8%
                </span>
              </div>
              <MetricChart points={chartPoints} className="mt-4 h-36 sm:h-44" />
            </div>
          </FeatureCard>

          <FeatureCard
            accent="violet"
            title="AI-powered workflows"
            description="Describe a repetitive task and Nexus builds the automation — triaging issues, routing requests, and summarizing updates."
            className="lg:col-span-4"
          >
            <AIVisual />
          </FeatureCard>

          <FeatureCard
            accent="cyan"
            title="Developer-first"
            description="Ship from your terminal or your CI with a typed SDK, instant previews, and one-command deploys that scale automatically."
            className="lg:col-span-8"
            layout="split"
          >
            <CodeTyping />
          </FeatureCard>

          <FeatureCard
            accent="indigo"
            title="Team collaboration"
            description="Move work forward together. Drag the task between lanes to update its status — everyone sees it instantly."
            className="lg:col-span-4 lg:row-span-2"
          >
            <DragInteraction />
          </FeatureCard>

          <FeatureCard
            accent="emerald"
            title="Enterprise security"
            description="Encryption everywhere, granular access control, and the audit trail your security team expects."
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-2 pb-4 text-xs text-success">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> All systems protected
            </div>
            <SecurityVisual />
          </FeatureCard>
        </motion.div>
      </Container>
    </section>
  )
}
