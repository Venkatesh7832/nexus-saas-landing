import { useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import { logos } from '@/data/logos'
import { Container } from '@/components/ui/Container'
import { LogoItem } from './LogoItem'

const BASE_SPEED = 55 // px per second
const HOVER_FACTOR = 0.15

function Track({ hidden }: { hidden?: boolean }) {
  // Each track repeats the brand list twice so a single track always exceeds ultrawide viewports.
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...logos, ...logos].map((brand, i) => (
        <LogoItem key={`${brand.name}-${i}`} brand={brand} />
      ))}
    </ul>
  )
}

export function LogoCloud() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const factor = useRef(1)
  const [hovering, setHovering] = useState(false)

  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return
    // Ease the speed toward its target so hover slows/resumes smoothly.
    const target = hovering ? HOVER_FACTOR : 1
    factor.current += (target - factor.current) * Math.min(delta / 180, 1)
    const loop = trackRef.current.scrollWidth / 2
    let next = x.get() - (BASE_SPEED * factor.current * delta) / 1000
    if (next <= -loop) next += loop
    x.set(next)
  })

  return (
    <section id="integrations" aria-labelledby="logos-heading" className="py-14 sm:py-20">
      <Container>
        <h2 id="logos-heading" className="text-center text-sm font-medium text-muted">
          Works with the tools your team already uses
        </h2>
      </Container>

      {reduce ? (
        <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-y-4 px-5">
          {logos.map((b) => (
            <LogoItem key={b.name} brand={b} />
          ))}
        </ul>
      ) : (
        <div
          className="edge-fade mt-8 overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <motion.div ref={trackRef} style={{ x }} className="flex w-max will-change-transform">
            <Track />
            <Track hidden />
          </motion.div>
        </div>
      )}
    </section>
  )
}
