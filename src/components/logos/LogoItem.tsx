import type { LogoBrand } from '@/types'

export function LogoItem({ brand }: { brand: LogoBrand }) {
  return (
    <li className="shrink-0 px-8 sm:px-12">
      <span
        className={`select-none text-xl text-slate-500 opacity-70 transition-[color,opacity] duration-300 hover:text-white hover:opacity-100 sm:text-2xl ${brand.className}`}
      >
        {brand.name}
      </span>
    </li>
  )
}
