import { CATEGORY_COLOR_REGISTRY, CATEGORY_COLOR_VARIANTS, type CategoryName } from '~/lib/categories'

interface TagProps {
  category: CategoryName
  className?: string
  size?: 'sm' | 'md'
}

export function Tag({ category, className = '', size = 'md' }: TagProps) {
  const activeColor = CATEGORY_COLOR_REGISTRY[category]
  const { bg, text } = CATEGORY_COLOR_VARIANTS[activeColor]

  const sizes = {
    sm: 'p-1 text-xs',
    md: 'px-2 py-1 text-sm',
  } as const

  return (
    <span className={`inline-flex items-center rounded-lg ${sizes[size]} ${bg} ${text} ${className}`}>
      {category}
    </span>
  )
}
