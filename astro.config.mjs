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
  integrations: [react(), mdx()],
  vite: {
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
