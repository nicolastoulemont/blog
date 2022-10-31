import type { Category } from "~/lib/mdx"

interface PostIntroProps {
  publishedAt: string
  category: Category | Array<Category>
}

export function PostIntro({ publishedAt, category }: PostIntroProps) {
  return (
    <div className="mb:3 flex w-full flex-col justify-center text-center sm:flex-row sm:justify-between sm:text-left md:mb-6">
      Nicolas Toulemont - {publishedAt}
      <div className="flex items-center justify-center">
        {Array.isArray(category) ? (
          category.map((category, index) => (
            <div
              key={category}
              className={`mt:2 sm:mt:0 rounded-lg bg-blue-200 px-2 py-1 ${index === 0 ? "ml:0" : "ml:3"}`}
            >
              {category}
            </div>
          ))
        ) : (
          <div key={category} className="mt:3 sm:mt:0 rounded-lg bg-blue-200 px-2 py-1">
            {category}
          </div>
        )}
      </div>
    </div>
  )
}
