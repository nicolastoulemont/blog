import { ElementProps } from '~/components/TableOfContent/types'
import type { CategoryNames } from '~/utils/styles/categories'

interface MetaData {
  canonical: string
  'og:url': string
  title: string
  'og:title': string
  description: string
  'og:description': string
  'og:type': string
  'og:image': string
  'og:image:alt': string
  'og:image:width': string
  'og:image:height': string
  'article:published_time': string | 'not_published'
}

export interface PostMatterData {
  meta: MetaData
  categories: [CategoryNames]
  translation?: 'fr' | 'en'
}

export interface PostMetaData extends MetaData {
  slug: string
  categories: [CategoryNames]
  translation?: 'fr'
  lang: 'en' | 'fr'
  translationSlug?: string
  headings: ElementProps[]
}
