import { CategoryNames } from "~/utils/styles"
import { CATEGORY_COLOR_REGISTRY, CATEGORY_COLOR_VARIANTS } from "~/utils/styles"

interface PostIntroProps {
  publishedAt: string
  editedAt?: string
  category: CategoryNames | CategoryNames[]
}

export function PostIntro({ publishedAt, editedAt, category }: PostIntroProps) {
  const activeColor = CATEGORY_COLOR_REGISTRY[Array.isArray(category) ? category[0] : category]
  const { bg, text } = CATEGORY_COLOR_VARIANTS[activeColor]
  return (
    <div className="mb:3 flex w-full flex-col justify-center text-center sm:flex-row sm:justify-between sm:text-left md:mb-6">
      Nicolas Toulemont - {editedAt ? editedAt : publishedAt} {editedAt ? "- Edited" : ""}
      <div className="flex items-center justify-center">
        {Array.isArray(category) ? (
          category.map((category, index) => (
            <div
              key={category}
              className={`mt:2 sm:mt:0 rounded-lg  px-2 py-1 text-sm ${bg} ${text} ${index === 0 ? "ml:0" : "ml:3"}`}
            >
              {category}
            </div>
          ))
        ) : (
          <div key={category} className={`mt:3 sm:mt:0 rounded-lg px-2 py-1 text-sm ${bg} ${text}`}>
            {category}
          </div>
        )}
      </div>
    </div>
  )
}
