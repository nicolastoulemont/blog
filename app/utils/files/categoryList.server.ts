import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { isValid } from "date-fns"
import type { CategoryNames, PostMetaData, PostMatterData } from "./types"
import { getFilesPath } from "./get-files-path.server"
import { generateHeadingId, getType, HeadingType } from "./headingId.server"
import { ElementProps } from "~/components/TableOfContent/types"

interface Category {
  category: CategoryNames
  posts: PostMetaData[]
}

function getCategories() {
  const filesPath = getFilesPath(path.join(process.cwd(), "app", "routes", "blog"))

  const publishedPosts = filesPath
    // For now we only show english posts and only add small link to the
    // translation on the card
    .filter((filePath) => !filePath.includes("blog/fr/"))
    .map((filePath) => {
      const source = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(source) as unknown as { data: PostMatterData; content: string }

      // Relative path within the project
      const relativePath = filePath.split(process.cwd())[1]

      const slug = `/blog${relativePath.split("blog")[1].replace(".mdx", "")}`

      const parseHeadings = /(#|##|###|####|#####|######) (.*$)/gim

      const headings: ElementProps[] =
        content.match(parseHeadings)?.map((heading: string) => {
          const content = heading.replace(/#/g, "").trim()
          return {
            id: generateHeadingId(content),
            type: getType(heading) as HeadingType,
            content,
          }
        }) ?? []

      return {
        ...data,
        ...(data.translation && { translationSlug: slug.replace(/\/en\//, "/fr/") }),
        headings,
        slug,
      }
    })
    .filter((post) => isValid(new Date(post.date)))

  const publishedCategories = Array.from(new Set(publishedPosts.flatMap((p) => p.category))) as CategoryNames[]

  return publishedCategories.reduce((acc: Category[], category) => {
    const categoryPosts = publishedPosts.filter((post) =>
      Array.isArray(post.category) ? post.category.includes(category) : post.category === category
    )

    acc.push({
      category,
      posts: categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    })

    return acc.sort((a, b) => (b.category > a.category ? -1 : 1))
  }, [])
}

function searchCategories(input: string) {
  const hits = []
  const query = input.toLowerCase()

  for (const category of getCategories()) {
    const matchedPosts = category.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        category.category.toLowerCase().includes(query)
    )
    if (matchedPosts.length > 0) {
      hits.push({
        category: category.category,
        posts: matchedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      })
    }
  }

  return hits
}

function getCategoryBySlug(slug: string) {
  let result
  for (const category of getCategories()) {
    const match = category.posts.find((post) => post.slug === slug)
    if (match) {
      result = match
    }
  }

  if (!result) {
    throw new Error(`No post found for ${slug}`)
  }

  return result
}

export const list = {
  get: getCategories,
  search: searchCategories,
  getBySlug: getCategoryBySlug,
}
