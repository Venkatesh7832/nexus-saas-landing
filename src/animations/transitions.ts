import type { Transition } from 'framer-motion'
import { DURATION_DEFAULT, DURATION_FAST, EASE_PREMIUM } from './animationConfig'

export const baseTransition: Transition = { duration: DURATION_DEFAULT, ease: EASE_PREMIUM }
export const fastTransition: Transition = { duration: DURATION_FAST, ease: EASE_PREMIUM }
export const springSoft: Transition = { type: 'spring', stiffness: 260, damping: 28 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }
export const springBounce: Transition = { type: 'spring', stiffness: 500, damping: 14, mass: 0.8 }
