import clsx from 'clsx'
import type { BlogPostSummary } from '~/lib/blog-core'
import { formatMonthYear } from '~/lib/date'
import { UI_STRINGS } from '~/lib/site'
import { Tag } from './Tag'

interface PostCardProps {
  post: BlogPostSummary
  variant?: 'large' | 'compact' | 'featured'
}

export function PostCard({ post, variant = 'large' }: PostCardProps) {
  const compact = variant === 'compact'
  const featured = variant === 'featured'
  const Heading = featured ? 'h2' : 'h3'
  const ui = UI_STRINGS[post.locale]
  const date = formatMonthYear(post.publishedAt, post.locale)
  const arrow = (
    <span
      className="border-line group-hover:bg-accent group-hover:text-accent-ink grid place-items-center border-l px-4 transition-colors"
      aria-hidden="true"
    >
      <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )

  return (
    <a
      href={post.url}
      aria-label={post.title}
      className={clsx(
        'group border-line-strong bg-panel text-fg relative mt-[1.375rem] border',
        compact ? 'grid grid-cols-[minmax(0,1fr)_auto_auto]' : 'flex flex-1 flex-col',
      )}
    >
      <div className="absolute top-0 -left-px flex -translate-y-full">
        {featured && (
          <span className="tab border-accent bg-accent text-accent-ink">Latest</span>
        )}
        {post.categories.map((category) => (
          <Tag key={category} category={category} className="tab" />
        ))}
      </div>
      <div
        className={clsx(
          'min-w-0',
          featured
            ? 'grid flex-1 grid-cols-2 items-center gap-6 px-6 py-8'
            : compact
              ? 'px-4 py-[0.85rem]'
              : 'flex min-h-44 flex-1 flex-col justify-center p-6',
        )}
      >
        <Heading
          className={clsx(
            'font-bold tracking-[-0.01em]',
            featured
              ? 'text-2xl leading-[1.2]'
              : compact
                ? 'text-[0.9375rem] leading-[1.3]'
                : 'text-[1.05rem] leading-[1.3] text-balance',
          )}
        >
          {post.title}
        </Heading>
        <p
          className={clsx(
            'text-muted',
            compact ? 'mt-1 text-[0.7rem] leading-normal' : 'text-xs leading-[1.6]',
            !featured && !compact && 'mt-[0.6rem]',
          )}
        >
          {post.description}
        </p>
      </div>
      {compact ? (
        <>
          <div className="border-line flex flex-col justify-center border-l px-4 py-2 whitespace-nowrap">
            <time
              dateTime={post.publishedAt}
              className="text-[0.8125rem] leading-[1.3] font-semibold"
            >
              {date}
            </time>
            <span className="text-muted text-[0.625rem]">{post.readingMinutes} min</span>
          </div>
          {arrow}
        </>
      ) : (
        <div className="border-line-strong grid grid-cols-[1fr_1fr_auto] border-t">
          <div className="px-3.5 py-3">
            <time
              className="block text-[0.9375rem] leading-[1.2] font-semibold"
              dateTime={post.publishedAt}
            >
              {date}
            </time>
            <span className="text-muted mt-[0.15rem] block text-[0.625rem]">
              {ui.published}
            </span>
          </div>
          <div className="border-line border-l px-3.5 py-3">
            <span className="block text-[0.9375rem] leading-[1.2] font-semibold">
              {post.readingMinutes} min
            </span>
            <span className="text-muted mt-[0.15rem] block text-[0.625rem]">
              {ui.reading}
            </span>
          </div>
          {arrow}
        </div>
      )}
    </a>
  )
}
