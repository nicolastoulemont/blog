import { useLoaderData, Form, useSearchParams, useSubmit } from '@remix-run/react'
import * as Posts from '~/utils/files'
import { Request } from '@remix-run/node'
import { Card } from '~/components'

export const loader = ({ request }: { request: Request }) => {
  const urlSearchParams = new URLSearchParams(request.url.split('?')[1])
  const params = Object.fromEntries(urlSearchParams.entries())

  if (!params.search || params.search === '') {
    return Posts.getAll('en')
  } else {
    return Posts.search(params.search)
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()
  const submit = useSubmit()

  const params = Object.fromEntries(searchParams)

  return (
    <main className="mx-auto min-h-full w-full max-w-6xl px-6 pb-6 md:px-12">
      <section>
        <h1 className="my-6 text-center text-3xl font-bold text-slate-800 dark:text-white sm:mt-12 sm:text-5xl md:text-left">
          Hi, I'm Nicolas Toulemont
        </h1>
        <p className="mb:9 text-center text-lg font-bold text-slate-600 dark:text-white sm:text-2xl md:mb-12 md:text-left">
          I'm a french full stack software engineer. I mainly use and enjoy Typescript,
          Node, React and GraphQL at the moment.
        </p>
      </section>
      <Form method="get" className="py-6">
        <label htmlFor="search">
          <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-white  sm:text-3xl">
            Posts
          </h2>
        </label>
        <input
          id="search"
          name="search"
          type="text"
          className="w-full rounded-lg bg-white text-slate-800 placeholder:text-slate-800 dark:border-black dark:bg-slate-900 dark:text-white dark:placeholder:text-white"
          placeholder="Search posts"
          onChange={(e) => submit(e.currentTarget.form)}
          {...(params.search && params.search !== '' && { defaultValue: params.search })}
        />
      </Form>
      <div
        aria-hidden
        className="mb-6 w-full rounded bg-slate-200 dark:bg-slate-900"
        style={{ height: 2 }}
      />

      <ul className="grid w-full grid-cols-1 gap-2 pb-10 md:grid-cols-2 md:gap-4">
        {data.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </ul>
    </main>
  )
}
