import { Link, useNavigate } from "@remix-run/react"
import { CATEGORY_COLOR_VARIANTS } from "~/utils/styles"
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
  const { bg, text, hoverBg, hoverText } = CATEGORY_COLOR_VARIANTS[activeColor]
  const navigate = useNavigate()

  function handleClick() {
    // Headless UI Dialog prevent regular navigation with the link
    navigate(`#${element.id}`)
    onClose()
  }

  return (
    <li className="my-3 flex" style={{ marginLeft: styles[element.type].spacing }}>
      <Link
        className={`${styles[element.type].size} ${isActive ? `${bg} ${text}` : ""} 
        w-full rounded-md p-2 font-medium text-gray-700 dark:text-white ${hoverBg} ${hoverText}`}
        to={`#${element.id}`}
        onClick={handleClick}
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
