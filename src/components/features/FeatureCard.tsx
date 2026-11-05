import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { fadeUp } from '@/animations/motionVariants'
import { accents } from '@/lib/accents'
import { cn } from '@/lib/cn'
import type { Accent } from '@/types'

interface FeatureCardProps {
  title: string
  description: string
  accent: Accent
  className?: string
  children: ReactNode
  /** Visual placement relative to copy on wide cards. */
  layout?: 'stack' | 'split'
}

export function FeatureCard({ title, description, accent, className, children, layout = 'stack' }: FeatureCardProps) {
  const { rgb } = accents[accent]
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(${rgb},0.16), transparent 70%)`
  const edge = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(${rgb},0.9), transparent 70%)`

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left)
    mouseY.set(e.clientY - r.top)
  }

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      onMouseMove={onMove}
      className={cn('group relative overflow-hidden rounded-3xl border border-line bg-card', className)}
    >
      {/* z-0: spotlight + edge highlight — above the card background, below content */}
      <motion.div aria-hidden="true" style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <motion.div aria-hidden="true" style={{ background: edge }} className="border-glow pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className={cn('relative z-10 flex h-full flex-col gap-6 p-6 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:p-8', layout === 'split' && 'md:flex-row md:items-center md:gap-10')}>
        <div className={cn(layout === 'split' && 'md:w-2/5 md:shrink-0')}>
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">{description}</p>
        </div>
        <div className={cn('min-w-0 flex-1', layout === 'stack' && 'mt-auto')}>{children}</div>
      </div>
    </motion.article>
  )
}
