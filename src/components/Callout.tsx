import type { ReactNode } from 'react'
import * as FiIcons from 'react-icons/fi'
import { CATEGORY_COLOR_VARIANTS, type CategoryColor } from '~/lib/categories'

interface CalloutProps {
  children: ReactNode
  flexDir?: 'row' | 'column'
  icon?: keyof typeof FiIcons
  variant?: CategoryColor
}

export function Callout({
  children,
  flexDir = 'row',
  icon,
  variant = 'blue',
}: CalloutProps) {
  const Icon = icon ? FiIcons[icon] : undefined
  const { bg, text, stroke, border } = CATEGORY_COLOR_VARIANTS[variant]

  return (
    <div
      className={`my-6 flex gap-4 rounded-3xl border px-5 py-4 ${bg} ${text} ${border} ${flexDir === 'column' ? 'flex-col text-left' : 'flex-col sm:flex-row sm:items-start'} not-prose`}
    >
      {Icon ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/60 dark:bg-slate-950/30">
          <Icon className={`h-5 w-5 ${stroke}`} />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
