import { ReactNode, forwardRef } from "react"
import { clsx } from "clsx"

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean
  children: ReactNode
  className?: string
}

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(function HeaderButton(
  { children, isActive, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        "rounded-xl border-2 bg-blue-50 px-3 py-1 text-base font-medium text-slate-700 dark:bg-slate-900 dark:text-white sm:px-2 sm:text-sm",
        isActive ? "border-blue-300 dark:border-black" : "border-blue-50 dark:border-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
