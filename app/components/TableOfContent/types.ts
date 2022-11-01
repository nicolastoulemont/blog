import { HeadingType } from "~/utils/files/headingId.server"
import { ColorNames } from "~/utils/theme"

export type ElementProps = {
  type: HeadingType
  content: string
  id: string
}

export interface TableOfContentProps {
  elements: ElementProps[]
  activeColor: ColorNames
}

export interface TableOfContentLinkProps {
  element: ElementProps
  activeColor: ColorNames
  isActive: boolean
  isFirst: boolean
  onClose?: () => void
}
