import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { staggerItem } from '@/animations/motionVariants'
import { accents } from '@/lib/accents'
import type { Testimonial } from '@/types'

function initials(name: string): string {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2)
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  const a = accents[t.accent]
  return (
    <motion.figure
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 transition-colors duration-300 hover:border-white/15 sm:p-7"
    >
      <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} aria-hidden="true" className={`h-4 w-4 ${n <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-200">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span aria-hidden="true" className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ring-1 ${a.bg} ${a.text} ${a.ring}`}>
          {initials(t.name)}
        </span>
        <span>
          <span className="block text-sm font-medium text-white">{t.name}</span>
          <span className="block text-xs text-muted">{t.role}, {t.company}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}
