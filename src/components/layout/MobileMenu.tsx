import { motion } from 'framer-motion'
import { navLinks, SIGNIN_URL, SIGNUP_URL } from '@/data/navigation'
import { Button } from '@/components/ui/Button'

interface MobileMenuProps {
  id: string
  onClose: () => void
}

export function MobileMenu({ id, onClose }: MobileMenuProps) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-page/95 backdrop-blur-xl md:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pt-6 pb-10">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={onClose}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
            className="rounded-xl px-3 py-4 text-2xl font-medium text-white transition-colors hover:bg-white/5"
          >
            {link.label}
          </motion.a>
        ))}
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
          <Button href={SIGNIN_URL} variant="ghost" size="lg" onClick={onClose}>Sign in</Button>
          <Button href={SIGNUP_URL} size="lg" arrow onClick={onClose}>Get Started</Button>
        </div>
      </nav>
    </motion.div>
  )
}
