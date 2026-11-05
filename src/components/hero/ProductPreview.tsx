import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, BarChart3, FolderKanban, LayoutDashboard, Search, Settings, Users, Zap } from 'lucide-react'
import { MetricChart } from '@/components/features/MetricChart'

const sidebar = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Automations', icon: Zap },
  { label: 'Team', icon: Users },
  { label: 'Settings', icon: Settings },
]

const metrics = [
  { label: 'Monthly revenue', value: '$48,290', delta: '+12.4%', up: true },
  { label: 'Active users', value: '12,840', delta: '+8.1%', up: true },
  { label: 'Deploys this week', value: '328', delta: '+22%', up: true },
  { label: 'Avg. response', value: '182 ms', delta: '-9.6%', up: true },
]

const projects = [
  { name: 'Mobile app redesign', value: 82, color: 'bg-primary' },
  { name: 'API v3 migration', value: 64, color: 'bg-secondary' },
  { name: 'Onboarding revamp', value: 41, color: 'bg-cyan' },
]

const activity = [
  { who: 'Maya', what: 'deployed api-gateway to production', time: '2m', color: 'bg-success' },
  { who: 'Daniel', what: 'closed 6 tasks in Sprint 24', time: '18m', color: 'bg-primary' },
  { who: 'Automation', what: 'flagged a slow query on /reports', time: '1h', color: 'bg-amber-400' },
  { who: 'Sofia', what: 'invited 3 teammates', time: '3h', color: 'bg-cyan' },
]

const usage = [30, 38, 34, 46, 42, 56, 52, 64, 60, 74, 70, 88]

/** Browser-window dashboard mockup built from HTML/CSS. Flattens as it scrolls into view. */
export function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 25%'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const y = useTransform(scrollYProgress, [0, 1], [70, 0])

  return (
    <div ref={ref} className="relative mx-auto mt-16 w-full max-w-[1100px] sm:mt-20" style={{ perspective: 1400 }}>
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -top-10 h-2/3 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35),transparent_65%)]" />
      <motion.div
        style={{ rotateX, scale, y, transformOrigin: '50% 0%' }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_40px_120px_-20px_rgba(99,102,241,0.45)] will-change-transform"
        role="img"
        aria-label="Nexus dashboard preview showing revenue metrics, an analytics chart, project progress and recent activity"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-elevated/60 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center rounded-md bg-page/70 px-3 text-xs text-muted">
            app.nexus.dev/overview
          </div>
          <div className="w-10" aria-hidden="true" />
        </div>

        <div className="flex" aria-hidden="true">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 border-r border-line p-4 md:block">
            <div className="mb-5 flex items-center gap-2 px-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-primary to-secondary text-[11px] font-bold text-white">N</span>
              <span className="text-sm font-semibold text-white">Acme Inc.</span>
            </div>
            <ul className="space-y-1">
              {sidebar.map(({ label, icon: Icon, active }) => (
                <li key={label} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${active ? 'bg-primary/15 text-white' : 'text-body'}`}>
                  <Icon className="h-4 w-4" />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-line bg-white/[0.03] p-3">
              <p className="text-xs font-medium text-white">Sprint 24</p>
              <p className="mt-0.5 text-[11px] text-muted">5 days remaining</p>
              <div className="mt-2.5 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-cyan" />
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-white sm:text-lg">Good morning, Alex</p>
                <p className="text-xs text-muted">Here's what's happening across your workspace.</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="flex h-8 w-44 items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-2.5 text-xs text-muted">
                  <Search className="h-3.5 w-3.5" /> Search…
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-secondary to-primary text-xs font-semibold text-white">A</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-line bg-white/[0.025] p-3 sm:p-4">
                  <p className="truncate text-[11px] text-muted sm:text-xs">{m.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">{m.value}</p>
                  <p className="mt-1 text-[11px] font-medium text-success">{m.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-5">
              <div className="rounded-xl border border-line bg-white/[0.025] p-4 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">Usage analytics</p>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">Live</span>
                </div>
                <MetricChart points={usage} className="mt-3 h-32 sm:h-40" delay={0.6} />
              </div>
              <div className="rounded-xl border border-line bg-white/[0.025] p-4 lg:col-span-2">
                <p className="text-sm font-medium text-white">Project progress</p>
                <ul className="mt-3 space-y-3.5">
                  {projects.map((p) => (
                    <li key={p.name}>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{p.name}</span>
                        <span className="text-muted">{p.value}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                        <motion.div
                          className={`h-full rounded-full ${p.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${p.value}%` }}
                          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-line bg-white/[0.025] p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-white">Recent activity</p>
              </div>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {activity.map((a) => (
                  <li key={a.what} className="flex items-start gap-2.5 text-xs">
                    <span className={`pulse-dot mt-1 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                    <span className="min-w-0 flex-1 text-body">
                      <span className="font-medium text-white">{a.who}</span> {a.what}
                    </span>
                    <span className="shrink-0 text-muted">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
