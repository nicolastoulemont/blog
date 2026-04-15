import { type CategoryName } from '~/lib/categories'
import { Tag } from './Tag'

interface PostIntroProps {
  publishedAt: string
  editedAt?: string
  categories: CategoryName[]
}

export function PostIntro({ publishedAt, editedAt, categories }: PostIntroProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-y border-slate-200/80 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Nicolas Toulemont
        {' · '}
        {editedAt ? `${editedAt} · Edited` : publishedAt}
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Tag key={category} category={category} size="sm" />
        ))}
      </div>
    </div>
  )
}
