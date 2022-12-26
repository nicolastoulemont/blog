import { Outlet, useLoaderData } from "@remix-run/react"
import { motion } from "framer-motion"
import * as Posts from "~/utils/files"
import { Card, DesktopTableOfContent, MobileTableOfContent, Tag } from "~/components"
import { CATEGORY_COLOR_REGISTRY } from "~/utils/styles"
import { MetaFunction } from "@remix-run/node"
import { PostMetaData } from "~/utils/files/types"

const isSameLanguage = (suggestion: PostMetaData, post: PostMetaData) => suggestion.lang === post.lang
const isNotTargetPost = (suggestion: PostMetaData, post: PostMetaData) => suggestion.title !== post.title
const hasCommonCategory = (suggestion: PostMetaData, post: PostMetaData) =>
  post.categories.some((category) => suggestion.categories.includes(category))

export const loader = ({ request }: { request: Request }) => {
  const slug = `/blog${request.url.split("/blog")[1]}`
  const post = Posts.getBySlug(slug)
  const suggestions = Posts.getAll().filter(
    (sug) => isSameLanguage(sug, post) && isNotTargetPost(sug, post) && hasCommonCategory(sug, post)
  )

  return { post, suggestions }
}

export const meta: MetaFunction = ({ data: { post } }: { data: { post: PostMetaData } }) => {
  const canonical = `https://nicolastoulemont.dev${post.slug}`
  return {
    canonical,
    "og:url": canonical,
    "og:type": "article",
    title: post.title,
    "og:title": post.title,
    description: post.description,
    "og:description": post.description,
    "og:image": post.imagePath,
    "og:image:width": post.imageWidth,
    "og:image:height": post.imageHeight,
    "og:image:alt": post.imageAlt,
    "article:published_time": post.date,
  }
}

export default function BlogContainer() {
  const { post, suggestions } = useLoaderData<typeof loader>()

  const activeColor = CATEGORY_COLOR_REGISTRY[post.categories[0]]

  return (
    <main className="relative">
      <motion.article
        className="prose m-0 mx-auto w-full px-6 py-10 dark:prose-invert lg:mx-0 lg:max-w-[calc(100%-250px)] lg:prose-lg lg:px-12 2xl:mx-auto 2xl:max-w-6xl"
        variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
        initial="hidden"
        animate="visible"
      >
        <Outlet />
        {suggestions.length > 0 ? (
          <section className="not-prose mt-12">
            <h2 className="mb-3 text-xl font-bold text-slate-800 dark:text-white  sm:text-3xl">
              From the same {post.categories.length > 1 ? "categories" : "category"}
            </h2>
            <ul>
              {suggestions.map((suggestion) => (
                <Card key={suggestion.slug} post={suggestion} />
              ))}
            </ul>
          </section>
        ) : null}
      </motion.article>
      <DesktopTableOfContent elements={post.headings} activeColor={activeColor} />
      <MobileTableOfContent elements={post.headings} activeColor={activeColor} />
    </main>
  )
}
