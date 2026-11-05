import type { Accent } from '@/types'

interface AccentStyle {
  rgb: string
  text: string
  bg: string
  ring: string
}

export const accents: Record<Accent, AccentStyle> = {
  indigo: { rgb: '99,102,241', text: 'text-primary', bg: 'bg-primary/15', ring: 'ring-primary/30' },
  violet: { rgb: '139,92,246', text: 'text-secondary', bg: 'bg-secondary/15', ring: 'ring-secondary/30' },
  cyan: { rgb: '34,211,238', text: 'text-cyan', bg: 'bg-cyan/15', ring: 'ring-cyan/30' },
  emerald: { rgb: '52,211,153', text: 'text-success', bg: 'bg-success/15', ring: 'ring-success/30' },
}
