export async function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://nicolastoulemont.dev/sitemap.xml\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
