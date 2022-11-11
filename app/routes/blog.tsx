import { Outlet, useLoaderData } from "@remix-run/react"
import { motion } from "framer-motion"
import { list } from "~/utils/files"
import { DesktopTableOfContent, MobileTableOfContent } from "~/components"
import { CATEGORY_COLOR_REGISTRY } from "~/utils/styles"
import { MetaFunction } from "@remix-run/node"
import { PostMetaData } from "~/utils/files/types"

export const loader = ({ request }: { request: Request }) => {
  const slug = `/blog${request.url.split("/blog")[1]}`
  return list.getBySlug(slug)
}

export const meta: MetaFunction = ({ data }: { data: PostMetaData }) => {
  const canonical = `https://nicolastoulemont.dev${data.slug}`
  return {
    canonical,
    "og:url": canonical,
    "og:type": "article",
    title: data.title,
    "og:title": data.title,
    description: data.description,
    "og:description": data.description,
    "og:image": data.imagePath,
    "og:image:width": data.imageWidth,
    "og:image:height": data.imageHeight,
    "og:image:alt": data.imageAlt,
    "article:published_time": data.date,
  }
}

export default function BlogContainer() {
  const data = useLoaderData<typeof loader>()
  const activeColor = CATEGORY_COLOR_REGISTRY[data.category]

  return (
    <main className="relative">
      <motion.article
        className="prose m-0 mx-auto w-full px-6 pt-10 pb-6 dark:prose-invert lg:mx-0 lg:max-w-[calc(100%-250px)] lg:prose-lg lg:px-12 2xl:mx-auto 2xl:max-w-6xl"
        variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
        initial="hidden"
        animate="visible"
      >
        <Outlet />
      </motion.article>
      <DesktopTableOfContent elements={data.headings} activeColor={activeColor} />
      <MobileTableOfContent elements={data.headings} activeColor={activeColor} />
    </main>
  )
}
