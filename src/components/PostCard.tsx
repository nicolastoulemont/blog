import clsx from 'clsx'
import type { BlogPostSummary } from '~/lib/post'
import { formatMonthYear } from '~/lib/date'
import { UI_STRINGS } from '~/lib/site'
import { Tag } from './Tag'

type Variant = 'large' | 'compact' | 'featured'

interface PostCardProps {
  post: BlogPostSummary
  variant?: Variant
}

const VARIANTS = {
  large: {
    Heading: 'h3',
    card: 'flex flex-1 flex-col',
    body: 'flex min-h-44 flex-1 flex-col justify-center p-6',
    heading: 'text-[1.05rem] leading-[1.3] text-balance',
    description: 'mt-[0.6rem] text-xs leading-[1.6]',
    Meta: StackedMeta,
  },
  featured: {
    Heading: 'h2',
    card: 'flex flex-1 flex-col',
    body: 'grid flex-1 items-center px-6 py-8',
    heading: 'text-2xl leading-[1.2]',
    description: 'text-xs leading-[1.6]',
    Meta: StackedMeta,
  },
  compact: {
    Heading: 'h3',
    card: 'grid grid-cols-[minmax(0,1fr)_auto_auto]',
    body: 'px-4 py-[0.85rem]',
    heading: 'text-[0.9375rem] leading-[1.3]',
    description: 'mt-1 text-[0.7rem] leading-normal',
    Meta: InlineMeta,
  },
} as const

export function PostCard({ post, variant = 'large' }: PostCardProps) {
  const { Heading, Meta, ...styles } = VARIANTS[variant]
  const featured = variant === 'featured'

  return (
    <a
      href={post.url}
      aria-label={post.title}
      className={clsx(
        'group border-line-strong bg-panel text-fg relative mt-[1.375rem] border',
        styles.card,
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
          featured &&
            (post.title.length > 40 ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-6'),
          styles.body,
        )}
      >
        <Heading className={clsx('font-bold tracking-[-0.01em]', styles.heading)}>
          {post.title}
        </Heading>
        <p className={clsx('text-muted', styles.description)}>{post.description}</p>
      </div>
      <Meta post={post} />
    </a>
  )
}

interface MetaProps {
  post: BlogPostSummary
}

function InlineMeta({ post }: MetaProps) {
  return (
    <>
      <div className="border-line flex flex-col justify-center border-l px-4 py-2 whitespace-nowrap">
        <time
          dateTime={post.publishedAt}
          className="text-[0.8125rem] leading-[1.3] font-semibold"
        >
          {formatMonthYear(post.publishedAt, post.locale)}
        </time>
        <span className="text-muted text-[0.625rem]">{post.readingMinutes} min</span>
      </div>
      <Arrow />
    </>
  )
}

function StackedMeta({ post }: MetaProps) {
  const ui = UI_STRINGS[post.locale]
  return (
    <div className="border-line-strong grid grid-cols-[1fr_1fr_auto] border-t">
      <div className="px-3.5 py-3">
        <time
          className="block text-[0.9375rem] leading-[1.2] font-semibold"
          dateTime={post.publishedAt}
        >
          {formatMonthYear(post.publishedAt, post.locale)}
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
      <Arrow />
    </div>
  )
}

function Arrow() {
  return (
    <span
      className="border-line group-hover:bg-accent group-hover:text-accent-ink grid place-items-center border-l px-4 transition-colors"
      aria-hidden="true"
    >
      <svg className="size-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}
