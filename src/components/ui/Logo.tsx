import { motion, useReducedMotion } from 'framer-motion'

/** Nexus brand mark with a subtle idle glow pulse. */
export function Logo({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <a href="#top" aria-label="Nexus home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <motion.span
        className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-primary to-secondary shadow-[0_0_24px_-4px_rgba(99,102,241,0.8)]"
        animate={reduce ? undefined : { boxShadow: ['0 0 14px -4px rgba(99,102,241,0.6)', '0 0 28px -2px rgba(139,92,246,0.9)', '0 0 14px -4px rgba(99,102,241,0.6)'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={reduce ? undefined : { rotate: -8, scale: 1.06 }}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <motion.path
            d="M10 23V9l12 14V9"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </svg>
      </motion.span>
      <span className="text-lg font-semibold tracking-tight text-white">Nexus</span>
    </a>
  )
}
