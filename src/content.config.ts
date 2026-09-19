import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    categories: z.array(
      z.enum([
        'Animations',
        'Architecture',
        'Career',
        'Data Structures',
        'General',
        'GraphQL',
        'React',
      ])
    ),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { blog }
