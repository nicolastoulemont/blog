import type { LinksFunction, MetaFunction } from "@remix-run/node"
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react"

import { Header } from "~/components"
import styles from "./tailwind.css"

import { useSystemTheme } from "./utils/theme"

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  useSystemTheme()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-800">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  const ERRORS_IMGS: Record<number, string> = {
    404: "/img/404.png",
  }

  const src = ERRORS_IMGS[caught.status]

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="text-ren min-h-screen bg-white dark:bg-slate-800">
        <Header />
        <main className="mx-auto block h-[calc(100vh-56px)] w-full max-w-6xl px-6 sm:px-12">
          <section className="mt-3 flex flex-col text-center sm:mt-12">
            {src && <img src={src} className="mx-auto w-36" />}
            <h1 className="my-6 mx-auto text-3xl font-bold text-slate-800  sm:mt-12 sm:text-5xl">
              {caught.status} {caught.statusText}
            </h1>
            {caught.data && <p>{caught.data}</p>}
            <Link to="/" className="font-bold text-blue-500">
              Go Back
            </Link>
          </section>
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
