import { AnimatePresence, motion } from 'framer-motion'
import type { FAQ } from '@/types'

interface FAQItemProps {
  faq: FAQ
  index: number
  open: boolean
  onToggle: () => void
}

export function FAQItem({ faq, index, open, onToggle }: FAQItemProps) {
  const btnId = `faq-btn-${index}`
  const panelId = `faq-panel-${index}`
  return (
    <div className={`rounded-2xl border transition-colors duration-300 ${open ? 'border-primary/30 bg-card' : 'border-line bg-card/50 hover:border-white/15'}`}>
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-medium text-white sm:px-6"
        >
          <span>{faq.question}</span>
          <span aria-hidden="true" className="relative grid h-6 w-6 shrink-0 place-items-center">
            <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
            <motion.span className="absolute h-3.5 w-0.5 rounded-full bg-current" animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-body sm:px-6">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
