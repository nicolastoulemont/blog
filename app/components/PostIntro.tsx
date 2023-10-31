import { CategoryNames } from '~/utils/styles'
import { Tag } from './Tag'

interface PostIntroProps {
  publishedAt: string
  editedAt?: string
  categories: CategoryNames[]
}

export function PostIntro({ publishedAt, editedAt, categories }: PostIntroProps) {
  return (
    <div className="mb:3 flex w-full flex-col justify-center text-center sm:flex-row sm:justify-between sm:text-left md:mb-6">
      Nicolas Toulemont - {editedAt ? editedAt : publishedAt} {editedAt ? '- Edited' : ''}
      <div className="flex items-center justify-center space-x-2">
        {categories.map((category) => (
          <Tag key={category} category={category} className="mt-3 sm:mt-0" />
        ))}
      </div>
    </div>
  )
}
