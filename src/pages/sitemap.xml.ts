import { getAllPosts, getAbsoluteUrl } from '~/lib/posts'

export async function GET() {
  const posts = await getAllPosts()
  const latest = posts[0]
  const urls = [
    {
      loc: getAbsoluteUrl('/'),
      lastmod: new Date(latest.updatedAt ?? latest.publishedAt).toISOString(),
    },
    ...posts.map((post) => ({
      loc: getAbsoluteUrl(post.url),
      lastmod: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <priority>1.0</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
