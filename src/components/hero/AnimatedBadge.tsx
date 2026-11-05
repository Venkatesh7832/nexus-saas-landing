import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function AnimatedBadge({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="conic-border inline-flex rounded-full shadow-[0_0_40px_-10px_rgba(99,102,241,0.7)]"
    >
      <span className="relative m-[1.5px] inline-flex items-center gap-2 rounded-full bg-page/90 px-4 py-1.5 text-sm font-medium text-slate-200">
        <Sparkles className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
        {children}
      </span>
    </motion.div>
  )
}
