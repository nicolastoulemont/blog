import { describe, expect, it } from 'vitest'
import type { BlogPostSummary } from './blog-core'
import { getPostUrl, getTranslation, parseEntryId, toSearchIndex } from './blog-core'

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
})

describe('getPostUrl', () => {
  it('uses the root blog path for english posts', () => {
    expect(
      getPostUrl({
        locale: 'en',
        year: '2022',
        slug: 'the-tree',
      })
    ).toBe('/blog/2022/the-tree')
  })

  it('prefixes french posts with /fr', () => {
    expect(
      getPostUrl({
        locale: 'fr',
        year: '2021',
        slug: 'retraining-web-development-online',
      })
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

describe('toSearchIndex', () => {
  it('keeps the locale label and category data needed by the homepage search', () => {
    const post = makePost({
      locale: 'fr',
      localeLabel: 'Francais',
      categories: ['Career', 'React'],
      url: '/fr/blog/2021/retraining-web-development-online',
    })

    expect(toSearchIndex([post])).toEqual([
      {
        categories: ['Career', 'React'],
        description: 'Example description',
        locale: 'fr',
        localeLabel: 'Francais',
        publishedAt: '2022-01-01',
        title: 'Example',
        url: '/fr/blog/2021/retraining-web-development-online',
        ogImage: undefined,
      },
    ])
  })
})
