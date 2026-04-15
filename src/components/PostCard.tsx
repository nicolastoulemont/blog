import type { BlogPost, SearchIndexItem } from '~/lib/blog'
import { formatDisplayDate } from '~/lib/date'
import { Tag } from './Tag'

interface PostCardProps {
  post: BlogPost | SearchIndexItem
  showLocale?: boolean
}

export function PostCard({ post, showLocale = true }: PostCardProps) {
  return (
    <a
      href={post.url}
      className="surface-card group flex h-full flex-col justify-between overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {showLocale ? (
              <span className="rounded-full border border-slate-200 px-2 py-1 text-xs uppercase tracking-[0.24em] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {post.localeLabel}
              </span>
            ) : null}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {formatDisplayDate(post.publishedAt, post.locale)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-950 transition-colors group-hover:text-sky-700 dark:text-slate-50 dark:group-hover:text-sky-300">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {post.description}
          </p>
        </div>
        {post.ogImage ? (
          <img
            className="hidden h-16 w-16 rounded-2xl border border-white/70 object-cover sm:block dark:border-slate-800"
            src={post.ogImage}
            alt={post.title}
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.categories.map((category) => (
          <Tag key={category} category={category} size="sm" />
        ))}
      </div>
    </a>
  )
}
