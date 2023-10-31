import { Link, useCatch } from '@remix-run/react'

// Catch all route
export const loader = () => {
  throw new Response('Not Found', {
    status: 404,
    statusText: "Oops didn't find the requested ressources",
  })
}

export default function CatchAll() {
  return <div>Catch all route</div>
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <main className="mx-auto block h-[calc(100vh-56px)] w-full max-w-6xl px-6 sm:px-12">
      <section className="flex flex-col space-y-6 text-center sm:mt-12">
        <img src="/img/404.png" className="mx-auto w-36" />
        <h1 className=" mx-auto text-3xl font-bold text-slate-800 dark:text-white sm:mt-12 sm:text-5xl">
          {caught.status}
        </h1>
        <p className="text-center text-lg font-bold text-slate-600 dark:text-white">
          {caught.statusText}
        </p>

        <Link to="/" className="font-bold text-blue-500 underline underline-offset-2">
          Go Back
        </Link>
      </section>
    </main>
  )
}
