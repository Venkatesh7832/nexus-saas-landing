import { AnimatePresence, motion } from 'framer-motion'
import { ANNUAL_DISCOUNT_PERCENT } from '@/data/pricing'
import { springBounce } from '@/animations/transitions'

export type Billing = 'monthly' | 'annual'

interface BillingToggleProps {
  value: Billing
  onChange: (value: Billing) => void
}

const options: { id: Billing; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual' },
]

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full border border-line bg-card p-1">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') onChange(value === 'monthly' ? 'annual' : 'monthly')
              }}
              className={`relative min-h-10 rounded-full px-5 py-2 text-sm font-medium transition-colors ${active ? 'text-white' : 'text-body hover:text-white'}`}
            >
              {active && (
                <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-gradient-to-b from-primary to-[#5457e0] shadow-[0_4px_20px_-4px_rgba(99,102,241,0.8)]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>
      <div className="w-24" aria-live="polite">
        <AnimatePresence>
          {value === 'annual' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.4, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={springBounce}
              className="inline-block rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success"
            >
              Save {ANNUAL_DISCOUNT_PERCENT}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
