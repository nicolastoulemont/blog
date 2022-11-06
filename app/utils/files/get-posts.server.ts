import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { isValid } from "date-fns"
import type { PostMetaData, PostMatterData } from "./types"
import { getFilesPath } from "./get-files-path.server"
import { getType, HeadingType } from "./headingId.server"
import { ElementProps } from "~/components/TableOfContent/types"
import GithubSlugger from "github-slugger"

function getPosts(lang?: "en" | "fr"): PostMetaData[] {
  const filesPath = getFilesPath(path.join(process.cwd(), "app", "routes", "blog"))

  const publishedPosts = filesPath
    // For now we only show english posts and only add small link to the
    // translation on the card
    // .filter((filePath) => !filePath.includes("blog/fr/"))
    .map((filePath) => {
      const source = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(source) as unknown as { data: PostMatterData; content: string }

      // Relative path within the project
      const relativePath = filePath.split(process.cwd())[1]

      const slug = `/blog${relativePath.split("blog")[1].replace(".mdx", "")}`

      const parseHeadings = /(#|##|###|####|#####|######) (.*$)/gim

      const slugger = new GithubSlugger()
      const headings: ElementProps[] =
        content.match(parseHeadings)?.map((heading: string) => {
          const content = heading.replace(/#/g, "").trim()
          return {
            id: slugger.slug(content),
            type: getType(heading) as HeadingType,
            content,
          }
        }) ?? []

      return {
        ...data,
        ...(data.translation && { translationSlug: slug.replace(/\/en\//, "/fr/") }),
        lang: slug.includes("/en/") ? "en" : ("fr" as "en" | "fr"),
        headings,
        slug,
      }
    })
    .filter((post) => isValid(new Date(post.date)))
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1))

  if (lang) {
    return publishedPosts.filter((post) => post.lang === lang)
  } else {
    return publishedPosts
  }
}

function searchPosts(input: string) {
  const hits = []
  const query = input.toLowerCase()

  const match = (str: string) => str.toLowerCase().includes(query)

  for (const post of getPosts()) {
    const hit = match(post.title) || match(post.description) || match(post.category)
    if (hit) {
      hits.push(post)
    }
  }

  return hits
}

function getPostBySlug(slug: string) {
  const posts = getPosts()
  const post = posts.find((post) => post.slug.includes(slug))

  if (!post) {
    throw new Error(`No post found for ${slug}`)
  }

  return post
}

export const list = {
  get: getPosts,
  search: searchPosts,
  getBySlug: getPostBySlug,
}
