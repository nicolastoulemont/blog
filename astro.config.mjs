import { defineConfig, fontProviders } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  site: 'https://nicolastoulemont.dev',
  redirects: {
    '/blog/en/[year]/[slug]': '/blog/[year]/[slug]',
    '/blog/fr/[year]/[slug]': '/fr/blog/[year]/[slug]',
  },
  compressHTML: true,
  image: { layout: 'constrained' },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: ['100 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
  ],
  devToolbar: {
    enabled: process.env.BLOG_E2E !== '1',
  },
  integrations: [
    react(),
    mdx(),
    {
      name: 'isolate-dependency-cache',
      hooks: {
        'astro:config:setup'({ command, updateConfig }) {
          const cache =
            command === 'dev' && process.env.BLOG_E2E === '1' ? 'e2e' : command
          updateConfig({ vite: { cacheDir: `node_modules/.vite-${cache}` } })
        },
      },
    },
  ],
  vite: {
    optimizeDeps: {
      include: [
        '@headlessui/react',
        '@base-ui/react/dialog',
        'cmdk',
        'clsx',
        'date-fns',
        'framer-motion',
        'react-icons/fi',
        'react-icons/hi2',
      ],
    },
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true,
    },
    processor: unified({
      rehypePlugins: [
        rehypeSlug,
        rehypeFigures,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              className: ['heading-anchor'],
              ariaLabel: 'Link to section',
            },
            content: {
              type: 'text',
              value: '#',
            },
          },
        ],
      ],
    }),
  },
})

function rehypeFigures() {
  return (tree) => {
    let figure = 0
    function visit(node) {
      if (
        node.type === 'element' &&
        node.tagName === 'p' &&
        node.children.length === 1 &&
        node.children[0].tagName === 'img'
      ) {
        figure += 1
        node.tagName = 'figure'
        node.children.unshift({
          type: 'element',
          tagName: 'span',
          properties: { className: ['tab'], ariaHidden: 'true' },
          children: [{ type: 'text', value: `fig. ${String(figure).padStart(2, '0')}` }],
        })
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}
