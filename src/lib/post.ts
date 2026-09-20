import { CATEGORY_SLUGS, type CategorySlug, type CategoryName } from './categories'
import { LOCALE_LABELS, SITE_URL, type SiteLocale } from './site'

export interface BlogPostSummary {
  id: string
  locale: SiteLocale
  year: string
  slug: string
  url: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  categories: CategoryName[]
  ogImage?: string
  translationKey?: string
  readingMinutes: number
  localeLabel: string
}

export function parseEntryId(id: string) {
  const [locale, year, ...slugParts] = id.split('/')
  const slug = slugParts.join('/')

  if (
    (locale !== 'en' && locale !== 'fr') ||
    !/^\d{4}$/.test(year ?? '') ||
    !slug ||
    slugParts.length !== 1
  ) {
    throw new Error(`Invalid blog entry id: ${id}`)
  }

  return {
    locale,
    year,
    slug,
  } as const
}

export function getPostUrl({
  locale,
  year,
  slug,
}: Pick<BlogPostSummary, 'locale' | 'year' | 'slug'>) {
  return locale === 'fr' ? `/fr/blog/${year}/${slug}` : `/blog/${year}/${slug}`
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString()
}

export function getRelatedPosts<
  T extends Pick<BlogPostSummary, 'id' | 'locale' | 'categories'>,
>(post: T, posts: T[]) {
  return posts.filter((candidate) => {
    if (candidate.id === post.id || candidate.locale !== post.locale) {
      return false
    }

    return candidate.categories.some((category) => post.categories.includes(category))
  })
}

export function getTranslation<
  T extends Pick<BlogPostSummary, 'locale' | 'translationKey'>,
>(post: T, posts: T[]) {
  if (!post.translationKey) {
    return undefined
  }

  return posts.find((candidate) => {
    return (
      candidate.translationKey === post.translationKey && candidate.locale !== post.locale
    )
  })
}

export function toBlogSummary<
  T extends {
    data: {
      title: string
      locale: SiteLocale
      description: string
      publishedAt: string
      updatedAt?: string
      categories: CategoryName[]
      ogImage?: string
      translationKey?: string
    }
    id: string
    body?: string
  },
>(entry: T): BlogPostSummary {
  const { locale, year, slug } = parseEntryId(entry.id)

  if (entry.data.locale !== locale) {
    throw new Error(`Blog locale does not match its directory: ${entry.id}`)
  }

  return {
    id: entry.id,
    locale,
    year,
    slug,
    url: getPostUrl({ locale, year, slug }),
    title: entry.data.title,
    description: entry.data.description,
    publishedAt: entry.data.publishedAt,
    updatedAt: entry.data.updatedAt,
    categories: entry.data.categories,
    ogImage: entry.data.ogImage,
    translationKey: entry.data.translationKey,
    localeLabel: LOCALE_LABELS[locale],
    readingMinutes: readingMinutes(entry.body ?? ''),
  }
}

export type SearchIndexItem = Pick<
  BlogPostSummary,
  'id' | 'title' | 'description' | 'categories'
>

export function readingMinutes(body: string) {
  return Math.max(1, Math.ceil((body.match(/\S+/g)?.length ?? 0) / 200))
}

export function filterPosts<T extends SearchIndexItem>(
  posts: T[],
  { query, category }: { query: string; category: CategorySlug | null },
) {
  const search = query.trim().toLowerCase()
  return posts.filter(
    (post) =>
      (category === null ||
        post.categories.some((value) => CATEGORY_SLUGS[value] === category)) &&
      [post.title, post.description, ...post.categories].some((value) =>
        value.toLowerCase().includes(search),
      ),
  )
}
