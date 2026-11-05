
import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { CheckCircle2, RotateCcw } from 'lucide-react'
import { codeLines } from '@/data/features'

const TOKEN =
  /(\b(?:const|await|true|false)\b)|('[^']*')|(\b[a-zA-Z]+(?=\())|(\.[a-zA-Z]+)/g

function highlight(line: string) {
  const out: Array<string | { t: string; c: string }> = []
  let last = 0

  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0

    if (i > last) out.push(line.slice(last, i))

    const c = m[1]
      ? 'text-secondary'
      : m[2]
        ? 'text-success'
        : m[3]
          ? 'text-cyan'
          : 'text-sky-300'

    out.push({ t: m[0], c })
    last = i + m[0].length
  }

  if (last < line.length) out.push(line.slice(last))

  return out.map((p, i) =>
    typeof p === 'string' ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i} className={p.c}>
        {p.t}
      </span>
    ),
  )
}

const full = codeLines.join('\n')

export function CodeTyping() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()

  const [count, setCount] = useState(0)
  const [run, setRun] = useState(0)

  // Reduced-motion users see the complete code immediately.
  // This is derived during rendering, not set inside an effect.
  const visibleCount = reduce ? full.length : count

  useEffect(() => {
    if (!inView || reduce) return

    let current = 0

    const id = window.setInterval(() => {
      current = Math.min(current + 1, full.length)
      setCount(current)

      if (current >= full.length) {
        window.clearInterval(id)
      }
    }, 32)

    return () => window.clearInterval(id)
  }, [inView, reduce, run])

  const typed = full.slice(0, visibleCount).split('\n')
  const done = visibleCount >= full.length

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-line bg-page/80 font-mono text-[12px] leading-6 sm:text-[13px]"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span
            className="h-2 w-2 rounded-full bg-secondary"
            aria-hidden="true"
          />
          deploy.ts
        </div>

        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={!done && !reduce}
          aria-label="Replay typing animation"
          className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-white disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <pre
        className="overflow-x-auto p-4 text-slate-300"
        aria-label={full}
      >
        <code aria-hidden="true">
          {typed.map((line, i) => (
            <div key={i} className="flex whitespace-pre">
              <span className="mr-4 w-3 shrink-0 select-none text-right text-muted/60">
                {i + 1}
              </span>

              <span>
                {highlight(line)}

                {i === typed.length - 1 && !done && (
                  <span className="caret ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-cyan" />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>

      <div className="flex min-h-10 items-center border-t border-line px-4 py-2 font-sans text-xs">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-success"
              role="status"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Build completed · deployed to us-east-1 in 12.4s
            </motion.span>
          ) : (
            <motion.span
              key="run"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted"
            >
              Waiting for deploy…
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
