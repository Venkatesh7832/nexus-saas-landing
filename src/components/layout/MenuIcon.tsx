import { motion } from 'framer-motion'

/** Hamburger that morphs into an X by animating SVG path data. */
export function MenuIcon({ open }: { open: boolean }) {
  const t = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <motion.path initial={false} animate={{ d: open ? 'M6 6 L18 18' : 'M4 7 L20 7' }} transition={t} />
      <motion.path d="M4 12 L20 12" initial={false} animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} />
      <motion.path initial={false} animate={{ d: open ? 'M6 18 L18 6' : 'M4 17 L20 17' }} transition={t} />
    </svg>
  )
}
