import { ElementProps } from "~/components/TableOfContent/types"
import type { CategoryNames } from "~/utils/styles/categories"

export interface PostMetaData {
  title: string
  date: string | "not_published"
  slug: string
  snippet: string
  description: string
  imagePath: string
  imageAlt: string
  imageWidth: string
  imageHeight: string
  category: CategoryNames | CategoryNames[]
  translation?: string
  translationSlug?: string
  headings: ElementProps[]
}

export type PostMatterData = Pick<
  PostMetaData,
  | "date"
  | "description"
  | "category"
  | "imageAlt"
  | "imagePath"
  | "imageHeight"
  | "imageWidth"
  | "snippet"
  | "title"
  | "translation"
  | "translationSlug"
>
