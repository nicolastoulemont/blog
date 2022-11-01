import { useLoaderData, Form, useSearchParams, useSubmit, Link } from "@remix-run/react"
import { list } from "~/utils/files"
import { motion, AnimatePresence } from "framer-motion"
import { Request } from "@remix-run/node"

export const loader = ({ request }: { request: Request }) => {
  const urlSearchParams = new URLSearchParams(request.url.split("?")[1])
  const params = Object.fromEntries(urlSearchParams.entries())

  if (!params.search || params.search === "") {
    return list.get()
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
        <h1 className="mt-6 mb-6 text-3xl font-bold text-slate-800  sm:mt-12 sm:text-5xl">Hi, I'm Nicolas Toulemont</h1>
        <p className="mb:9 text-center text-lg font-bold text-slate-600  sm:text-2xl md:mb-12 md:text-left">
          I'm a french full stack software engineer. I mainly use and enjoy Typescript, Node, React and GraphQL at the
          moment. Posts
        </p>
      </section>
      <Form method="get" className="py-6">
        <label htmlFor="search">
          <h2 className="mb-6 text-xl font-bold text-slate-800  sm:text-3xl">Posts</h2>
        </label>
        <input
          id="search"
          name="search"
          type="text"
          className="w-full rounded-lg"
          placeholder="Search posts"
          onChange={(e) => submit(e.currentTarget.form)}
          {...(params.search && params.search !== "" && { defaultValue: params.search })}
        />
      </Form>
      <div aria-hidden className="mb-6 w-full rounded bg-slate-200" style={{ height: 2 }} />
      <AnimatePresence>
        {data.map((category, index) => (
          <motion.section
            key={`category-${index}`}
            className="my-6"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text:lg font-bold text-slate-800 sm:text-2xl ">{category.category}</h3>
            <ul>
              {category.posts.map((post) => (
                <motion.li
                  key={post.title}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`${post.translation ? "relative" : ""}`}
                >
                  {post.translation && (
                    <Link
                      to={post.translationSlug as string}
                      className="absolute"
                      style={{ top: -15, right: 15, width: 30 }}
                    >
                      <img src={`/img/flag_${post.translation}.svg`} width="100%" alt={post.translation} />
                    </Link>
                  )}
                  <Link
                    to={post.slug}
                    className="my-3 flex flex-col-reverse items-center justify-center rounded-lg p-6 shadow-xl hover:shadow-2xl sm:flex-row sm:justify-between sm:p-9"
                    style={{ transition: "box-shadow 0.3s ease-in-out" }}
                  >
                    <article className="w-full pt-6 sm:w-3/4 sm:pt-0">
                      <h4 className="mb-1 text-lg font-bold sm:text-xl ">{post.title}</h4>
                      <p className="mb-3 text-sm ">{post.date}</p>
                      <p>{post.description}</p>
                    </article>
                    <div className="flex w-full items-center justify-center sm:w-auto">
                      <div className="w-24 sm:w-24 md:w-36">
                        <img
                          className="mx-auto sm:mx-0"
                          src={post.imagePath}
                          width={post.imageWidth}
                          height={post.imageHeight}
                          alt={post.imageAlt}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ))}
      </AnimatePresence>
    </main>
  )
}
