import { type CategoryName } from '~/lib/categories'
import { Tag } from './Tag'

interface PostIntroProps {
  publishedAt: string
  editedAt?: string
  categories: CategoryName[]
}

export function PostIntro({ publishedAt, editedAt, categories }: PostIntroProps) {
  return (
    <div className="mb-3 flex w-full flex-col justify-center text-center text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:justify-between sm:text-left md:mb-6">
      <p>
        Nicolas Toulemont - {editedAt ? editedAt : publishedAt} {editedAt ? '- Edited' : ''}
      </p>
      <div className="flex items-center justify-center gap-2">
        {categories.map((category) => (
          <Tag key={category} category={category} className="mt-3 sm:mt-0" />
        ))}
      </div>
    </div>
  )
}
