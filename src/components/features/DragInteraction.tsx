import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

type Lane = 'todo' | 'doing' | 'done'
const lanes: { id: Lane; label: string; progress: number }[] = [
  { id: 'todo', label: 'To do', progress: 0 },
  { id: 'doing', label: 'In progress', progress: 60 },
  { id: 'done', label: 'Done', progress: 100 },
]

const avatars = [
  { i: 'MC', c: 'bg-primary' },
  { i: 'DO', c: 'bg-secondary' },
  { i: 'SR', c: 'bg-cyan text-slate-900' },
]

function Avatars() {
  return (
    <div className="flex -space-x-1.5">
      {avatars.map((a) => (
        <span key={a.i} className={`grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white ring-2 ring-elevated ${a.c}`}>
          {a.i}
        </span>
      ))}
    </div>
  )
}

/** Kanban lanes with one draggable card. Drop it on a lane to change its status; arrow keys also work. */
export function DragInteraction() {
  const boardRef = useRef<HTMLDivElement>(null)
  const laneRefs = useRef<Record<Lane, HTMLDivElement | null>>({ todo: null, doing: null, done: null })
  const [lane, setLane] = useState<Lane>('doing')
  const current = lanes.find((l) => l.id === lane)!

  const nearestLane = (centerY: number): Lane => {
    let best: Lane = lane
    let dist = Infinity
    for (const l of lanes) {
      const el = laneRefs.current[l.id]
      if (!el) continue
      const r = el.getBoundingClientRect()
      const d = Math.abs(centerY - (r.top + r.height / 2))
      if (d < dist) {
        dist = d
        best = l.id
      }
    }
    return best
  }

  const move = (dir: -1 | 1) => {
    const idx = lanes.findIndex((l) => l.id === lane)
    const next = lanes[Math.min(Math.max(idx + dir, 0), lanes.length - 1)]
    setLane(next.id)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); move(-1) }
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1) }
  }

  const card = (
    <motion.div
      layoutId="task-card"
      drag
      dragConstraints={boardRef}
      dragElastic={0.12}
      dragMomentum={false}
      whileDrag={{ scale: 1.03, rotate: 1.5, zIndex: 20, boxShadow: '0 20px 40px -12px rgba(99,102,241,0.6)' }}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={(_, info) => setLane(nearestLane(info.point.y - window.scrollY))}
      onKeyDown={onKey}
      tabIndex={0}
      role="group"
      aria-label={`Task: Design onboarding flow. Status ${current.label}. Drag, or use up and down arrow keys, to change status.`}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      className="relative cursor-grab touch-none rounded-xl border border-primary/40 bg-elevated p-3 shadow-lg shadow-primary/10"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-white">Design onboarding flow</p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${lane === 'done' ? 'bg-success/15 text-success' : lane === 'doing' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-slate-300'}`}>
          {current.label}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Avatars />
        <div className="h-1.5 flex-1 rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" animate={{ width: `${current.progress}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        <span className="w-8 text-right text-[10px] text-muted">{current.progress}%</span>
      </div>
    </motion.div>
  )

  return (
    <div ref={boardRef} className="space-y-2.5 rounded-2xl border border-line bg-page/60 p-3">
      {lanes.map((l) => (
        <div key={l.id} ref={(el) => { laneRefs.current[l.id] = el }} className={`min-h-[104px] rounded-xl border border-dashed p-2.5 transition-colors ${lane === l.id ? 'border-primary/30 bg-primary/[0.04]' : 'border-line'}`}>
          <div className="mb-2 flex items-center justify-between px-0.5 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              {l.id === 'done' && <Check className="h-3 w-3 text-success" aria-hidden="true" />}
              {l.label}
            </span>
          </div>
          {lane === l.id && card}
          {l.id === 'todo' && lane !== 'todo' && (
            <div className="rounded-lg border border-line bg-white/[0.03] p-2.5 text-[12px] text-slate-300">Write release notes</div>
          )}
          {l.id === 'done' && lane !== 'done' && (
            <div className="rounded-lg border border-line bg-white/[0.03] p-2.5 text-[12px] text-slate-400 line-through decoration-slate-600">Set up CI pipeline</div>
          )}
        </div>
      ))}
    </div>
  )
}
