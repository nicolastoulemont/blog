import { defineConfig, fontProviders } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import figures from './src/lib/figures.mjs'
import mermaid from './src/lib/mermaid.mjs'

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
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true,
    },
    processor: unified({
      rehypePlugins: [
        [
          mermaid,
          {
            css: import.meta.resolve('@fontsource-variable/jetbrains-mono/index.css'),
            mermaidConfig: {
              look: 'handDrawn',
              handDrawnSeed: 1,
              fontFamily: 'var(--font-jetbrains, "JetBrains Mono Variable", monospace)',
            },
          },
        ],
        rehypeSlug,
        figures,
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
