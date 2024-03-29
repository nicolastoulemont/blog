import clsx from 'clsx'
import { forwardRef } from 'react'

interface CalendarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
}

export const CalendarButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(
  function CalendarButton({ isSelected, children, className, ...restProps }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(
          'z-10 flex h-full w-full items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-blue-200 dark:hover:bg-blue-800',
          isSelected
            ? 'dark:hover-bg-blue-900 bg-blue-500 hover:bg-blue-500 dark:bg-blue-900'
            : '',
          className
        )}
        {...restProps}
      >
        {children}
      </button>
    )
  }
)
