import { Outlet } from "@remix-run/react"
import { motion } from "framer-motion"

export default function BlogContainer() {
  return (
    <motion.article
      className="prose mx-auto mt-14 max-w-6xl px-9 pt-10 dark:prose-invert sm:px-12 lg:prose-lg"
      variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
      initial="hidden"
      animate="visible"
    >
      <Outlet />
    </motion.article>
  )
}
