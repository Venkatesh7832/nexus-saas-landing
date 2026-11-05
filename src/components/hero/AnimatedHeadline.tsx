import { motion } from 'framer-motion'

interface AnimatedHeadlineProps {
  lines: string[]
  className?: string
}

const FROM = [129, 140, 248] // indigo-400
const TO = [196, 160, 255] // violet-ish, readable on dark

function colorAt(t: number): string {
  const c = FROM.map((f, i) => Math.round(f + (TO[i] - f) * t))
  return `rgb(${c[0]} ${c[1]} ${c[2]})`
}

/**
 * Letter-by-letter staggered headline. The accessible name lives on the <h1>;
 * the animated glyphs are aria-hidden so screen readers read the text once.
 * Gradient is applied per-glyph (no background-clip) so transforms never break it.
 */
export function AnimatedHeadline({ lines, className }: AnimatedHeadlineProps) {
  const total = lines.join('').length
  let index = 0

  return (
    <h1 aria-label={lines.join(' ')} className={className}>
      {lines.map((line) => (
        <span key={line} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi, words) => (
            <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
              {word.split('').map((char) => {
                const i = index++
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ color: colorAt(i / Math.max(total - 1, 1)) }}
                    initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                )
              })}
              {wi < words.length - 1 && '\u00A0'}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
