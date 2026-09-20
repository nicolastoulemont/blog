import { expect, test } from '@playwright/test'

test('readers can discover a feed of published articles', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'RSS', exact: true })).toHaveAttribute(
    'href',
    '/rss.xml',
  )
  const response = await request.get('/rss.xml')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('xml')
  const feed = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, 'application/xml')
      return {
        title: document.querySelector('channel > title')?.textContent,
        posts: [...document.querySelectorAll('item')].map((item) => ({
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          date: item.querySelector('pubDate')?.textContent,
        })),
      }
    },
    await response.text(),
  )
  expect(feed.title).toBe('Nicolas Toulemont engineering blog')
  expect(feed.posts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        title: 'The Tree',
        link: 'https://nicolastoulemont.dev/blog/2022/the-tree/',
      }),
      expect.objectContaining({
        link: 'https://nicolastoulemont.dev/fr/blog/2021/retraining-web-development-online/',
      }),
    ]),
  )
  for (const post of feed.posts)
    expect(Number.isFinite(Date.parse(post.date ?? ''))).toBe(true)
})
