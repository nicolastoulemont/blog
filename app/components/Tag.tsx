import {
  CategoryNames,
  CATEGORY_COLOR_REGISTRY,
  CATEGORY_COLOR_VARIANTS,
} from "~/utils/styles"

export function Tag({
  category,
  className,
  size = "md",
}: {
  category: CategoryNames
  className?: string
  size?: "sm" | "md"
}) {
  const activeColor = CATEGORY_COLOR_REGISTRY[category]
  const { bg, text } = CATEGORY_COLOR_VARIANTS[activeColor]

  const sizes = {
    sm: "p-1 text-xs",
    md: "px-2 py-1 text-sm",
  }

  return (
    <div className={`rounded-lg ${sizes[size]} ${bg} ${text} ${className}`}>
      {category}
    </div>
  )
}
