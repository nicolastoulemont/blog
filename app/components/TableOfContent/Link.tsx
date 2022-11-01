import { Link } from "@remix-run/react"
import { CATEGORY_COLOR_VARIANTS } from "~/utils/theme"
import { TableOfContentLinkProps } from "./types"

const styles = {
  h1: {
    spacing: 0,
    size: "text-lg",
  },
  h2: {
    spacing: 0,
    size: "text-lg",
  },
  h3: {
    spacing: "0.5rem",
    size: "text-base",
  },
  h4: {
    spacing: "1rem",
    size: "text-sm",
  },
  h5: {
    spacing: "1.25rem",
    size: "text-xs",
  },
  h6: {
    spacing: "1.5rem",
    size: "text-[11px]",
  },
} as const

export function TableOfContentLink({
  element,
  activeColor,
  isActive,
  isFirst,
  onClose = () => {},
}: TableOfContentLinkProps) {
  const { bg, text } = CATEGORY_COLOR_VARIANTS[activeColor]

  return (
    <li className="flex" style={{ marginLeft: styles[element.type].spacing }}>
      <Link
        className={`${styles[element.type].size} ${
          isActive ? `${bg} ${text}` : ""
        } w-full rounded-md p-2 font-medium text-gray-700 hover:${bg} hover:${text}`}
        to={`#${element.id}`}
        onClick={onClose}
        style={{
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "color, background-color",
          transitionDuration: "0.3s",
        }}
      >
        {isFirst ? "Top" : element.content}
      </Link>
    </li>
  )
}
