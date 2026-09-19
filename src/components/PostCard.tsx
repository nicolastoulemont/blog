import type { BlogPostSummary } from '~/lib/blog-core'
import { formatDisplayDate } from '~/lib/date'
import { Tag } from './Tag'

interface PostCardProps {
  post: BlogPostSummary
  showLocale?: boolean
}

export function PostCard({ post, showLocale = true }: PostCardProps) {
  const titleId = `post-${post.id}`

  return (
    <a
      href={post.url}
      aria-labelledby={titleId}
      className="group block h-full w-full rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl"
    >
      <article className="relative my-3 flex h-full flex-col-reverse items-center justify-center p-6 md:flex-row md:justify-between">
        {showLocale ? (
          <span className="absolute right-4 top-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-700 dark:text-slate-200">
            {post.locale}
          </span>
        ) : null}
        <div className="w-full text-slate-800 dark:text-white sm:w-3/4 sm:pt-0">
          <h3 id={titleId} className="mb-1 text-md font-bold">{post.title}</h3>
          <div className="mb-3 flex flex-wrap items-center justify-start gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {post.categories.map((category) => (
                <Tag key={category} category={category} size="sm" />
              ))}
            </div>
            <span className="text-xs">{formatDisplayDate(post.publishedAt, post.locale)}</span>
          </div>
          <p className="text-sm">{post.description}</p>
        </div>
        {post.ogImage ? (
          <div className="my-6 flex w-full items-center justify-center md:w-14 md:py-0">
            <img
              className="mx-auto w-24 md:mx-0 md:w-14"
              src={post.ogImage}
              alt=""
              loading="lazy"
            />
          </div>
        ) : null}
      </article>
    </a>
  )
}
