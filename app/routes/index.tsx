import { useLoaderData, Form, useSearchParams, useSubmit, Link } from "@remix-run/react"
import { list } from "~/utils/files"
import { motion, AnimatePresence } from "framer-motion"
import { Request } from "@remix-run/node"

export const loader = ({ request }: { request: Request }) => {
  const urlSearchParams = new URLSearchParams(request.url.split("?")[1])
  const params = Object.fromEntries(urlSearchParams.entries())

  if (!params.search || params.search === "") {
    return list.get("en")
  } else {
    return list.search(params.search)
  }
}

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  const params = Object.fromEntries(searchParams)

  return (
    <main className="mx-auto min-h-full w-full max-w-6xl px-6 md:px-12">
      <section>
        <h1 className="mt-6 mb-6 text-3xl font-bold text-slate-800 dark:text-white sm:mt-12 sm:text-5xl">
          Hi, I'm Nicolas Toulemont
        </h1>
        <p className="mb:9 text-center text-lg font-bold text-slate-600 dark:text-white sm:text-2xl md:mb-12 md:text-left">
          I'm a french full stack software engineer. I mainly use and enjoy Typescript, Node, React and GraphQL at the
          moment.
        </p>
      </section>
      <Form method="get" className="py-6">
        <label htmlFor="search">
          <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-white  sm:text-3xl">Posts</h2>
        </label>
        <input
          id="search"
          name="search"
          type="text"
          className="w-full rounded-lg dark:bg-slate-500 dark:placeholder:text-slate-800"
          placeholder="Search posts"
          onChange={(e) => submit(e.currentTarget.form)}
          {...(params.search && params.search !== "" && { defaultValue: params.search })}
        />
      </Form>
      <div aria-hidden className="mb-6 w-full rounded bg-slate-200 dark:bg-slate-900" style={{ height: 2 }} />

      <div className="grid w-full grid-cols-1 gap-2 pb-10 md:grid-cols-2 md:gap-4">
        <AnimatePresence>
          {data.map((post) => (
            <motion.div
              key={post.title}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ transition: "box-shadow 0.3s ease-in-out" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`block h-full w-full rounded-lg shadow-xl hover:shadow-2xl ${
                post.translation ? "relative" : ""
              }`}
            >
              {post.translation && (
                <Link to={post.translationSlug as string} className="absolute" style={{ top: 0, right: 15, width: 30 }}>
                  <img src={`/img/flag_${post.translation}.svg`} width="100%" alt={post.translation} />
                </Link>
              )}
              <Link
                to={post.slug}
                className="my-3 flex flex-col-reverse items-center justify-center p-6 md:flex-row md:justify-between"
              >
                <article className="w-full dark:text-white sm:w-3/4 sm:pt-0">
                  <h4 className="text-md mb-1 font-bold">{post.title}</h4>
                  <p className="mb-3 text-sm">{post.date}</p>
                  <p className="text-sm">{post.description}</p>
                </article>
                <div className="my-6 flex w-full items-center justify-center md:w-14  md:py-0">
                  <img
                    className="mx-auto w-24 md:mx-0 md:w-14"
                    src={post.imagePath}
                    width={post.imageWidth}
                    height={post.imageHeight}
                    alt={post.imageAlt}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}
