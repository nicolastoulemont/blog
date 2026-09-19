import type { ReactNode, RefObject } from 'react'

export type Matrix = HTMLButtonElement[][] | null[][]

export interface TableNavigationProviderProps {
  children: ReactNode
  prevRef?: RefObject<HTMLButtonElement | null>
  afterRef?: RefObject<HTMLButtonElement | null> | RefObject<HTMLInputElement | null>
}
