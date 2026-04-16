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
  const { bg, text, stroke } = CATEGORY_COLOR_VARIANTS[variant]

  return (
    <div
      className={`not-prose my-3 flex rounded-2xl px-6 py-3 ${bg} ${text} ${flexDir === 'column' ? 'flex-col text-left' : 'flex-col items-center text-center sm:flex-row sm:text-left'}`}
    >
      {Icon ? (
        <div className={flexDir === 'column' ? 'mb-3' : 'mr-0 mb-3 sm:mb-0 sm:mr-3'}>
          <Icon className={`h-6 w-6 ${stroke}`} />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
