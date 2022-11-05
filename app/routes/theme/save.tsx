import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { FiMenu, FiMoon, FiSun } from "react-icons/fi"

import { getThemeSession, isTheme, Theme, Themed, useTheme } from "~/utils/styles"

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get("theme")

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    })
  }

  themeSession.setTheme(theme)
  return json({ success: true }, { headers: { "Set-Cookie": await themeSession.commit() } })
}

export const loader: LoaderFunction = () => redirect("/", { status: 404 })

export function ThemeToggle() {
  const [theme, setTheme] = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-600">
          <FiMenu size="1.3rem" className="stroke:slate-800 dark:stroke-white" aria-label="open theme menu" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          className="z-20 w-32 space-y-2 rounded-lg bg-white p-3 shadow-lg dark:bg-slate-800"
        >
          <DropdownMenu.Item>
            <button
              className="flex items-center justify-start py-1 dark:text-white"
              onClick={() => setTheme(Theme.LIGHT)}
            >
              <FiSun size="1.2rem" className="stroke:slate-800 mr-6 dark:stroke-white" /> Light
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <button
              className="flex items-center justify-start py-1 dark:text-white"
              onClick={() => setTheme(Theme.DARK)}
            >
              <FiMoon size="1.2rem" className="stroke:slate-800 mr-6 dark:stroke-white" /> Dark
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
