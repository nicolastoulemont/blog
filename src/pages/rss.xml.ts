import rss from '@astrojs/rss'
import { getAllPosts } from '~/lib/posts'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '~/lib/site'

export async function GET() {
  const posts = await getAllPosts()
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: SITE_URL,
    items: posts
      .toSorted((left, right) => right.publishedAt.localeCompare(left.publishedAt))
      .map((post) => ({
        title: post.title,
        description: post.description,
        link: post.url,
        pubDate: new Date(post.publishedAt),
        categories: post.categories,
      })),
  })
}
