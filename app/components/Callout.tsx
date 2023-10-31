import { ReactNode } from 'react'
import * as FiIcons from 'react-icons/fi'
import { CATEGORY_COLOR_VARIANTS, ColorNames } from '~/utils/styles'
interface CalloutProps {
  children: ReactNode
  icon?: keyof typeof FiIcons
  variant?: ColorNames
}

export function Callout({ children, icon, variant = 'blue' }: CalloutProps) {
  // @ts-expect-error types mistatches
  const Icon = FiIcons[icon]
  const { stroke, bg, text } = CATEGORY_COLOR_VARIANTS[variant]
  return (
    <div
      className={`my-3 flex flex-col items-center rounded-2xl px-6 py-3 text-center sm:flex-row sm:py-0 sm:text-left ${bg} ${text}`}
    >
      {Icon && (
        <div className="mb:3 sm:mb:0 mr-0 sm:mr-3 sm:mt-0">
          <Icon size="2rem" className={`stroke-width-1 h-6 w-6 ${stroke}`} />
        </div>
      )}

      {children}
    </div>
  )
}
