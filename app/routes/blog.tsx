import { Outlet, useLoaderData } from "@remix-run/react"
import { motion } from "framer-motion"
import { list } from "~/utils/files"
import { DesktopTableOfContent, MobileTableOfContent } from "~/components"
import { CATEGORY_COLOR_REGISTRY } from "~/utils/theme"

export const loader = ({ request }: { request: Request }) => {
  const slug = `/blog${request.url.split("/blog")[1]}`
  return list.getBySlug(slug)
}

export default function BlogContainer() {
  const data = useLoaderData<typeof loader>()
  const activeColor = CATEGORY_COLOR_REGISTRY[Array.isArray(data.category) ? data.category[0] : data.category]

  return (
    <main className="relative px-6 pt-10 lg:px-12">
      <motion.article
        className="prose m-0 mx-auto w-full dark:prose-invert lg:mx-0 lg:max-w-[calc(100%-250px)] lg:prose-lg 2xl:mx-auto 2xl:max-w-5xl"
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
