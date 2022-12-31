import { Outlet, useLoaderData, useLocation } from "@remix-run/react"
import { motion } from "framer-motion"
import * as Posts from "~/utils/files"
import { Card, DesktopTableOfContent, MobileTableOfContent } from "~/components"
import { CATEGORY_COLOR_REGISTRY } from "~/utils/styles"
import { PostMetaData } from "~/utils/files/types"
import { useMemo } from "react"

const isSameLanguage = (suggestion: PostMetaData, post: PostMetaData) =>
  suggestion.lang === post.lang
const isNotTargetPost = (suggestion: PostMetaData, post: PostMetaData) =>
  suggestion.title !== post.title
const hasCommonCategory = (suggestion: PostMetaData, post: PostMetaData) =>
  post.categories.some((category) => suggestion.categories.includes(category))

export const loader = () => ({ posts: Posts.getAll() })

export default function BlogContainer() {
  const { posts } = useLoaderData<typeof loader>()
  const { pathname } = useLocation()

  const { post, suggestions } = useMemo(() => {
    const [post] = posts.filter((post) => post.slug === pathname)

    const suggestions = posts.filter(
      (suggestion) =>
        isSameLanguage(suggestion, post) &&
        isNotTargetPost(suggestion, post) &&
        hasCommonCategory(suggestion, post)
    )
    return { post, suggestions }
  }, [pathname])

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
