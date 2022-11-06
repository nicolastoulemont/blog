import { CategoryNames } from "~/utils/styles"
import { CATEGORY_COLOR_REGISTRY, CATEGORY_COLOR_VARIANTS } from "~/utils/styles"
import Tag from "./Tag"

interface PostIntroProps {
  publishedAt: string
  editedAt?: string
  category: CategoryNames
}

export function PostIntro({ publishedAt, editedAt, category }: PostIntroProps) {
  const activeColor = CATEGORY_COLOR_REGISTRY[category]
  const { bg, text } = CATEGORY_COLOR_VARIANTS[activeColor]
  return (
    <div className="mb:3 flex w-full flex-col justify-center text-center sm:flex-row sm:justify-between sm:text-left md:mb-6">
      Nicolas Toulemont - {editedAt ? editedAt : publishedAt} {editedAt ? "- Edited" : ""}
      <div className="flex items-center justify-center">
        <Tag category={category} className="mt-3 sm:mt-0" />
      </div>
    </div>
  )
}
