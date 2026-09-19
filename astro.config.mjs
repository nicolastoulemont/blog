import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export default defineConfig({
  site: 'https://nicolastoulemont.dev',
  output: 'static',
  compressHTML: true,
  devToolbar: {
    enabled: process.env.BLOG_E2E !== '1',
  },
  integrations: [react(), mdx()],
  vite: {
    cacheDir: process.env.BLOG_E2E === '1' ? 'node_modules/.vite-e2e' : undefined,
    optimizeDeps: {
      include: [
        '@base-ui/react/menu',
        '@headlessui/react',
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
