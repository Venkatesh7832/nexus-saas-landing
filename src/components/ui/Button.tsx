import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'light'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: Variant
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-primary to-[#5457e0] text-white shadow-[0_8px_30px_-8px_rgba(99,102,241,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_12px_40px_-8px_rgba(139,92,246,0.9),inset_0_1px_0_rgba(255,255,255,0.3)]',
  ghost: 'border border-white/10 bg-white/[0.03] text-white hover:border-white/20 hover:bg-white/[0.07]',
  light: 'bg-white text-slate-900 hover:bg-slate-100',
}

export function Button({ href, children, variant = 'primary', size = 'md', arrow, className, onClick, disabled }: ButtonProps) {
  return (
    <motion.a
      href={disabled ? undefined : href}
      onClick={onClick}
      aria-disabled={disabled || undefined}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className={cn(
        'group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[box-shadow,background-color,border-color] duration-300',
        size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-sm',
        variants[variant],
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </motion.a>
  )
}
