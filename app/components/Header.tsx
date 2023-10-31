import { NavLink } from '@remix-run/react'
import { FiGithub, FiTwitter } from 'react-icons/fi'
import { ThemeToggle } from '../routes/theme/save'
export function Header() {
  const transition = 'background-color 0.3s ease-in-out'

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-center bg-white  shadow-lg dark:bg-slate-800">
      <nav className="flex w-full max-w-6xl items-center justify-between px-6 py-2 md:px-12">
        <NavLink to="/" className="flex items-center justify-center">
          <img src="/img/site-logo.svg" alt="home page" className="w-11" />
        </NavLink>
        <div className="flex space-x-3">
          <ul className="flex space-x-1">
            <li>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-slate-600"
                href="https://twitter.com/n_toulemont"
                target="_blank"
                rel="noopener"
                aria-label="twitter profile"
                style={{ transition }}
              >
                <FiTwitter size="1rem" className="stroke-blue-900 dark:stroke-white" />
              </a>
            </li>
            <li>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-violet-200 dark:hover:bg-slate-600"
                href="https://github.com/nicolastoulemont"
                target="_blank"
                rel="noopener"
                aria-label="github profile"
                style={{ transition }}
              >
                <FiGithub size="1rem" className="stroke-violet-900 dark:stroke-white" />
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
