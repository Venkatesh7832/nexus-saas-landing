import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface MagneticButtonProps {
  href: string
  children: ReactNode
}

/** Primary CTA that is gently pulled toward the cursor. */
export function MagneticButton({ href, children }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-primary to-[#5457e0] px-7 py-3.5 text-base font-medium text-white shadow-[0_10px_40px_-8px_rgba(99,102,241,0.9),inset_0_1px_0_rgba(255,255,255,0.28)] transition-shadow duration-300 hover:shadow-[0_14px_50px_-8px_rgba(139,92,246,1),inset_0_1px_0_rgba(255,255,255,0.35)]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </motion.a>
  )
}
