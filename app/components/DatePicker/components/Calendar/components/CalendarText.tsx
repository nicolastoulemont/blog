import clsx from "clsx"
import { ReactNode } from "react"

const TEXT_VARIANTS = {
  muted: "text-slate-400 font-normal",
  regular: "text-slate-700 dark:text-white font-medium",
  selected: "text-white font-medium",
} as const

export function CalendarText({
  children,
  variant,
}: {
  children: ReactNode
  variant: keyof typeof TEXT_VARIANTS
}) {
  return (
    <span
      className={clsx(
        "text-base font-medium transition-colors sm:text-sm",
        TEXT_VARIANTS[variant]
      )}
    >
      {children}
    </span>
  )
}
