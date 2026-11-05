import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/animations/motionVariants'
import { VIEWPORT_ONCE } from '@/animations/animationConfig'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  title: string
  description?: string
  id?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({ title, description, id, align = 'center', className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <motion.h2 id={id} variants={fadeUp} className="text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-body text-pretty sm:text-lg">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
