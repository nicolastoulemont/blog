export type ElementProps = {
  type: 'h2' | 'h3' | 'h4'
  content: string
  id: string
}

export interface TocProps {
  elements: Array<ElementProps>
  activeColor: string
}

export interface TocLinkProps {
  element: ElementProps
  activeColor: string
  isActive: boolean
  isFirst: boolean
  onClose?: () => void
}
