import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'
import { CATEGORY_NAMES } from './lib/categories'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.iso.date(),
    updatedAt: z.iso.date().optional(),
    categories: z.array(z.enum(CATEGORY_NAMES)),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { blog }
