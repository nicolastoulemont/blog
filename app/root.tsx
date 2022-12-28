import type { LinksFunction, MetaFunction, Request } from "@remix-run/node"
import { Header } from "~/components"
import styles from "./tailwind.css"
import {
  getThemeSession,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "./utils/styles"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react"

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  title: "Nicolas Toulemont engineering blog",
  description: "Web development content about React, Typescript, GraphQL, Node",
  canonical: "https://nicolastoulemont.dev",
  viewport: "width=device-width,initial-scale=1",
  charset: "utf-8",
  "og:type": "website",
  "og:locale": "en-US",
  "og:url": "https://nicolastoulemont.dev",
  "og:title": "Nicolas Toulemont engineering blog",
  "og:site_name": "Nicolas Toulemont engineering blog",
  "og:description": "Web development content about React, Typescript, GraphQL, Node",
  "twitter:site": "@n_toulemont",
  "twitter:creator": "@n_toulemont",
  "twitter:card": "summary_large_image",
})

export const loader = async ({ request }: { request: Request }) => {
  const themeSession = await getThemeSession(request)

  return {
    theme: themeSession.getTheme(),
  }
}

function Document() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={theme ?? ""}>
      <head>
        <Meta />
        <Links />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-800">
        <Header />
        <Outlet />
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <Document />
    </ThemeProvider>
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
