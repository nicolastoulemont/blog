import { ReactNode } from "react"
import * as FiIcons from "react-icons/fi"

interface CalloutProps {
  children: ReactNode
  icon?: keyof typeof FiIcons
  variant?: "blue" | "orange" | "gray"
}

const variants = {
  orange: {
    container: "bg-orange-200 text-orange-900",
    icon: "stroke-orange-900",
  },
  blue: {
    container: "bg-blue-200 text-blue-900",
    icon: "stroke-blue-900",
  },
  gray: {
    container: "bg-gray-200 text-gray-900",
    icon: "stroke-gray-900",
  },
}

export function Callout({ children, icon, variant = "blue" }: CalloutProps) {
  // @ts-expect-error types mistatches
  const Icon = FiIcons[icon]

  return (
    <div
      className={`my-3 flex flex-col items-center rounded-2xl px-3 py-3 text-center sm:flex-row sm:py-0 sm:text-left ${variants[variant].container}`}
    >
      {Icon && (
        <div className="mb:3 sm:mb:0 mr-0 sm:mr-3 sm:mt-0">
          <Icon size="2rem" className={`stroke-width-1 h-6 w-6 ${variants[variant].icon}`} />
        </div>
      )}

      {children}
    </div>
  )
}
