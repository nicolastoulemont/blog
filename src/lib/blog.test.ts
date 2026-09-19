import { describe, expect, it } from 'vitest'
import type { BlogPostSummary } from './blog-core'
import { getPostUrl, getTranslation, parseEntryId, toBlogSummary } from './blog-core'
import { formatDisplayDate } from './date'

function makePost(overrides: Partial<BlogPostSummary>): BlogPostSummary {
  return {
    id: 'en/2022/example',
    locale: 'en',
    year: '2022',
    slug: 'example',
    url: '/blog/2022/example',
    title: 'Example',
    description: 'Example description',
    publishedAt: '2022-01-01',
    categories: ['React'],
    localeLabel: 'English',
    ...overrides,
  }
}

describe('parseEntryId', () => {
  it('extracts locale, year and slug from content ids', () => {
    expect(parseEntryId('fr/2021/retraining-web-development-online')).toEqual({
      locale: 'fr',
      year: '2021',
      slug: 'retraining-web-development-online',
    })
  })

  it.each(['en/2022', 'de/2022/post', 'en/year/post', 'en/2022/nested/post'])(
    'rejects ids that cannot map to a blog route: %s',
    (id) => {
      expect(() => parseEntryId(id)).toThrow('Invalid blog entry id')
    },
  )
})

describe('blog metadata', () => {
  it('rejects conflicting directory and frontmatter locales', () => {
    const post = makePost({ locale: 'fr' })
    expect(() => toBlogSummary({ id: post.id, data: post })).toThrow(
      'Blog locale does not match its directory',
    )
  })

  it('formats publication dates as calendar dates in either locale', () => {
    expect(formatDisplayDate('2022-01-01', 'en')).toBe('January 1, 2022')
    expect(formatDisplayDate('2022-01-01', 'fr')).toBe('1 janvier 2022')
  })
})

describe('getPostUrl', () => {
  it('uses the root blog path for english posts', () => {
    expect(
      getPostUrl({
        locale: 'en',
        year: '2022',
        slug: 'the-tree',
      }),
    ).toBe('/blog/2022/the-tree')
  })

  it('prefixes french posts with /fr', () => {
    expect(
      getPostUrl({
        locale: 'fr',
        year: '2021',
        slug: 'retraining-web-development-online',
      }),
    ).toBe('/fr/blog/2021/retraining-web-development-online')
  })
})

describe('getTranslation', () => {
  it('returns the matching post with the same translation key in another locale', () => {
    const englishPost = makePost({
      id: 'en/2021/retraining-web-development-online',
      locale: 'en',
      year: '2021',
      slug: 'retraining-web-development-online',
      url: '/blog/2021/retraining-web-development-online',
      translationKey: 'retraining-web-development-online',
    })
    const frenchPost = makePost({
      id: 'fr/2021/retraining-web-development-online',
      locale: 'fr',
      year: '2021',
      slug: 'retraining-web-development-online',
      url: '/fr/blog/2021/retraining-web-development-online',
      localeLabel: 'Francais',
      translationKey: 'retraining-web-development-online',
    })

    expect(getTranslation(englishPost, [englishPost, frenchPost])).toEqual(frenchPost)
  })
})
