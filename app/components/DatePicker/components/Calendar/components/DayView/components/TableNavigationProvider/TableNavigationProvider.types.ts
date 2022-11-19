import { ReactNode, RefObject } from "react"

export type Matrix = HTMLButtonElement[][] | null[][]

export interface TableNavigationProviderProps {
  children: ReactNode
  prevRef?: RefObject<HTMLButtonElement>
  afterRef?: RefObject<HTMLButtonElement>
}
