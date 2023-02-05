import * as Posts from "~/utils/files"

export const loader = () => {
  const posts = Posts.getAll()
  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map(
          (post) => `<url>
            <loc>https://nicolastoulemont.dev${post.slug}</loc>
            <lastmod>${new Date(post["article:published_time"]).toISOString()}</lastmod>
            <priority>1.0</priority>
        </url>`
        )
        .join("\n")}
      </urlset>
      `
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  })
}
