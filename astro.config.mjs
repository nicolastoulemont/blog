import { defineConfig, fontProviders } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
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

// Wraps each lone image and Mermaid diagram in a numbered figure. The id lets
// prose link to it with [fig. 01](#fig-01), and the tab links to itself.
function rehypeFigures() {
  return (tree) => {
    let count = 0

    function figure(media, { caption, className }) {
      count += 1
      const number = String(count).padStart(2, '0')
      return {
        type: 'element',
        tagName: 'figure',
        properties: { id: `fig-${number}`, className },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: { className: ['tab'], href: `#fig-${number}` },
            children: [{ type: 'text', value: `fig. ${number}` }],
          },
          media,
          ...(caption.length
            ? [
                {
                  type: 'element',
                  tagName: 'figcaption',
                  properties: {},
                  children: caption,
                },
              ]
            : []),
        ],
      }
    }

    function visit(node) {
      node.children?.forEach((child, index) => {
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children.length === 1 &&
          child.children[0].tagName === 'img'
        ) {
          const image = child.children[0]
          const alt = image.properties.alt?.trim()
          node.children[index] = figure(image, {
            caption: alt ? [{ type: 'text', value: alt }] : [],
          })
        } else if (
          child.type === 'element' &&
          child.tagName === 'div' &&
          child.properties.className?.includes('mermaid')
        ) {
          const title = child.children[0].children.find(
            (node) => node.tagName === 'title',
          )
          node.children[index] = figure(child, {
            caption: title?.children ?? [],
            className: ['diagram'],
          })
        } else {
          visit(child)
        }
      })
    }
    visit(tree)
  }
}
