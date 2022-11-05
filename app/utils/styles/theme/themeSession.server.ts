import { createCookieSessionStorage } from "@remix-run/node"

import { isTheme } from "./ThemeProvider"
import type { Theme } from "./ThemeProvider"

// Make use to set the environment variable SESSION_SECRET before running the code
const sessionSecret = process.env.SESSION_SECRET ?? "DEFAULT_SECRET"

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "my_remix_theme",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
})

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"))
  return {
    getTheme: () => {
      const themeValue = session.get("theme")
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  }
}
