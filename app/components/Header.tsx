import { NavLink } from "@remix-run/react"
import { FiGithub, FiTwitter } from "react-icons/fi"

export function Header() {
  const transition = "background-color 0.3s ease-in-out"

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-center bg-white shadow-lg">
      <nav className="flex w-full max-w-6xl items-center justify-between py-2 px-6 sm:px-12">
        <NavLink to="/" className="flex items-center justify-center">
          <img src="/img/site-logo.svg" alt="home page" className="w-11" />
        </NavLink>
        <ul className="flex space-x-2">
          <li>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blue-200"
              href="https://twitter.com/n_toulemont"
              target="_blank"
              rel="noopener"
              aria-label="twitter profile"
              style={{ transition }}
            >
              <FiTwitter size="1rem" className="stroke-blue-900" />
            </a>
          </li>
          <li>
            <a
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-violet-200"
              href="https://github.com/nicolastoulemont"
              target="_blank"
              rel="noopener"
              aria-label="github profile"
              style={{ transition }}
            >
              <FiGithub size="1rem" className="stroke-violet-900" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
