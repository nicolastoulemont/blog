import { CATEGORY_SLUGS, type CategoryName } from '~/lib/categories'

export function Tag({
  category,
  className = '',
}: {
  category: CategoryName
  className?: string
}) {
  return (
    <span className={`tag ${className}`} data-cat={CATEGORY_SLUGS[category]}>
      {category}
    </span>
  )
}
