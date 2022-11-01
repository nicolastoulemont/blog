import { ElementProps } from "~/components/TableOfContent/types"

export type Category = "Data Structures" | "React" | "Animations" | "GraphQL" | "Career" | "Architecture" | "General"
export type CategoryNames =
  | "Data Structures"
  | "React"
  | "Animations"
  | "GraphQL"
  | "Career"
  | "Architecture"
  | "General"

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
  category: CategoryNames | Array<CategoryNames>
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
