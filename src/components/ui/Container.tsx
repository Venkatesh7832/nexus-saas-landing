import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10', className)}>{children}</Tag>
}
