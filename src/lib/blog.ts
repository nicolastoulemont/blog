import { getCollection, type CollectionEntry } from 'astro:content'
import {
  getAbsoluteUrl,
  getRelatedPosts,
  getTranslation,
  toBlogSummary,
  type BlogPostSummary,
} from './blog-core'

type BlogEntry = CollectionEntry<'blog'>

export interface BlogPost extends BlogPostSummary {
  entry: BlogEntry
}

export { getAbsoluteUrl, getRelatedPosts, getTranslation }

export async function getAllPosts() {
  const entries = await getCollection('blog', ({ data }) => !data.draft)

  return entries.map(toBlogPost).sort((left, right) => {
    return (
      new Date(right.updatedAt ?? right.publishedAt).getTime() -
      new Date(left.updatedAt ?? left.publishedAt).getTime()
    )
  })
}

function toBlogPost(entry: BlogEntry): BlogPost {
  return {
    ...toBlogSummary(entry),
    entry,
  }
}
