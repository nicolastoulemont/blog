/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: ['github-slugger', 'p-queue', 'p-timeout'],
  mdx: async () => {
    const [rehypePrettyCode, rehypeSlug, rehypeAutoLinkHeadings] = await Promise.all([
      import('rehype-pretty-code').then((mod) => mod.default),
      import('rehype-slug').then((mod) => mod.default),
      import('rehype-autolink-headings').then((mod) => mod.default),
    ])

    const options = {
      theme: 'dark-plus',
      onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and allow empty
        // lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }]
        }
      },
      onVisitHighlightedLine(node) {
        node.properties.className.push('line--highlighted')
      },
      onVisitHighlightedWord(node) {
        node.properties.className = ['word']
      },
    }

    return {
      rehypePlugins: [[rehypePrettyCode, options], rehypeSlug, rehypeAutoLinkHeadings],
    }
  },
}
