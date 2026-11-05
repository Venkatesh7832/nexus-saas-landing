import { useId } from 'react'
import { motion } from 'framer-motion'

interface MetricChartProps {
  points: number[]
  /** Hex stroke colours for the line gradient. */
  from?: string
  to?: string
  className?: string
  showGrid?: boolean
  delay?: number
}

const W = 400
const H = 160
const PAD = 12

function buildPath(points: number[]): { line: string; area: string; last: { x: number; y: number } } {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * W,
    y: H - PAD - ((p - min) / span) * (H - PAD * 2),
  }))
  let d = `M ${coords[0].x} ${coords[0].y}`
  for (let i = 1; i < coords.length; i++) {
    const a = coords[i - 1]
    const b = coords[i]
    const mx = (a.x + b.x) / 2
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
  }
  return { line: d, area: `${d} L ${W} ${H} L 0 ${H} Z`, last: coords[coords.length - 1] }
}

/** Self-drawing SVG line + area chart. Draws once when scrolled into view. */
export function MetricChart({ points, from = '#6366F1', to = '#22D3EE', className, showGrid = true, delay = 0.2 }: MetricChartProps) {
  const uid = useId().replace(/:/g, '')
  const { line, area, last } = buildPath(points)

  return (
    <div className={`relative ${className ?? ''}`} role="img" aria-label="Line chart showing steady growth over twelve periods">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`stroke-${uid}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
          <linearGradient id={`fill-${uid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={from} stopOpacity="0.35" />
            <stop offset="1" stopColor={from} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showGrid &&
          [0.25, 0.5, 0.75].map((r) => (
            <line key={r} x1="0" x2={W} y1={H * r} y2={H * r} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
          ))}
        <motion.path
          d={area}
          fill={`url(#fill-${uid})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#stroke-${uid})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <motion.span
        aria-hidden="true"
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4"
        style={{ left: `${(last.x / W) * 100}%`, top: `${(last.y / H) * 100}%`, backgroundColor: to, boxShadow: `0 0 16px ${to}`, ['--tw-ring-color' as string]: `${to}33` }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 1.5, type: 'spring', stiffness: 400, damping: 18 }}
      />
    </div>
  )
}
