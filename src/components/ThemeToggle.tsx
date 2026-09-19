import { Menu } from '@base-ui/react/menu'
import { useEffect, useState } from 'react'
import { FiCheck, FiMenu, FiMoon, FiSun } from 'react-icons/fi'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  function changeTheme(value: unknown) {
    if (value !== 'light' && value !== 'dark') return

    document.documentElement.classList.toggle('dark', value === 'dark')
    document.documentElement.style.colorScheme = value
    localStorage.setItem('theme', value)
    setTheme(value)
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        disabled={theme === null}
        aria-label="Open theme menu"
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-800 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-white dark:hover:bg-slate-600"
      >
        <FiMenu size="1.3rem" aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={8} className="z-50">
          <Menu.Popup className="min-w-36 rounded-lg bg-white p-2 shadow-lg outline-none dark:bg-slate-800">
            <Menu.RadioGroup value={theme} onValueChange={changeTheme} aria-label="Theme">
              {(
                [
                  { value: 'light', label: 'Light', Icon: FiSun },
                  { value: 'dark', label: 'Dark', Icon: FiMoon },
                ] as const
              ).map(({ value, label, Icon }) => (
                <Menu.RadioItem
                  key={value}
                  value={value}
                  closeOnClick
                  className="flex cursor-default items-center gap-3 rounded px-2 py-1 text-slate-800 outline-none data-highlighted:bg-gray-100 dark:text-white dark:data-highlighted:bg-slate-600"
                >
                  <Icon size="1.2rem" aria-hidden="true" />
                  {label}
                  <span className="ml-auto w-4">
                    <Menu.RadioItemIndicator>
                      <FiCheck aria-hidden="true" />
                    </Menu.RadioItemIndicator>
                  </span>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
