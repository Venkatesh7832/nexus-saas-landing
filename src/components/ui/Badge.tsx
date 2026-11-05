import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300', className)}>
      {children}
    </span>
  )
}
