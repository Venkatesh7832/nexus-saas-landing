import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, SIGNIN_URL, SIGNUP_URL } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MenuIcon } from './MenuIcon'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const menuId = useId()

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900">
        Skip to content
      </a>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: solid ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 0)',
          borderBottomColor: solid ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[backdrop-filter] duration-300 ${solid ? 'backdrop-blur-md' : 'backdrop-blur-none'}`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className="relative block px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {link.label}
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-primary via-secondary to-cyan"
                        transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={SIGNIN_URL} className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white md:inline-block">
              Sign in
            </a>
            <div className="hidden md:block">
              <Button href={SIGNUP_URL}>Get Started</Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu id={menuId} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}
