import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedPriceProps {
  /** Text to display, e.g. "$29", "Free", "Custom". Changing it triggers the transition. */
  value: string
  direction: 1 | -1
}

export function AnimatedPrice({ value, direction }: AnimatedPriceProps) {
  return (
    <span className="relative inline-flex h-14 items-center overflow-hidden" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={value}
          custom={direction}
          initial={{ opacity: 0, y: 28 * direction, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -28 * direction, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-semibold tracking-tight text-white tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
