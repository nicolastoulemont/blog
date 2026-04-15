import { CATEGORY_COLOR_REGISTRY, CATEGORY_COLOR_VARIANTS, type CategoryName } from '~/lib/categories'

interface TagProps {
  category: CategoryName
  className?: string
  size?: 'sm' | 'md'
}

export function Tag({ category, className = '', size = 'md' }: TagProps) {
  const activeColor = CATEGORY_COLOR_REGISTRY[category]
  const { bg, text, border } = CATEGORY_COLOR_VARIANTS[activeColor]

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
  } as const

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizes[size]} ${bg} ${text} ${border} ${className}`}
    >
      {category}
    </span>
  )
}
