import type { LogoBrand } from '@/types'

/**
 * Text-based brand marks. Official SVG assets are trademarked and are not bundled;
 * swap these for licensed assets in your own deployment if you have permission.
 */
export const logos: LogoBrand[] = [
  { name: 'GitHub', className: 'font-semibold tracking-tight' },
  { name: 'Figma', className: 'font-bold tracking-tight' },
  { name: 'Vercel', className: 'font-semibold tracking-[0.02em]' },
  { name: 'Stripe', className: 'font-extrabold italic tracking-tight' },
  { name: 'Supabase', className: 'font-medium tracking-tight' },
  { name: 'Cloudflare', className: 'font-semibold tracking-tight' },
  { name: 'Linear', className: 'font-medium tracking-[0.04em]' },
  { name: 'Framer', className: 'font-bold tracking-tighter' },
]
