import { forwardRef } from "react"
import { clsx } from "clsx"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface HeaderIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant: "left" | "right"
}

export const HeaderIconButton = forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  function HeaderIconButton({ children, className, variant, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-xl border-none bg-blue-50 font-medium text-slate-700 dark:bg-slate-800 dark:text-white sm:h-8 sm:w-8",
          props.disabled ? "text-slate-400" : "",
          className
        )}
        {...props}
      >
        {variant === "left" ? (
          <FiChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
        ) : (
          <FiChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
        )}
      </button>
    )
  }
)
