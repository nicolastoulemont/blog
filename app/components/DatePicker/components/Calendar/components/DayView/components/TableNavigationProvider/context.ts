import { createContext, KeyboardEvent, useContext } from 'react'

export interface TableNavigationValues {
  mapRefToMatrix: (ref: HTMLButtonElement, rowIndex: number, colIndex: number) => void
  handleKeyboardNavigation: (
    event: KeyboardEvent<HTMLButtonElement>,
    rowIndex: number,
    colIndex: number
  ) => void
}

export const TableNavigationContext = createContext<TableNavigationValues>({
  mapRefToMatrix: () => {},
  handleKeyboardNavigation: () => {},
})

export const useTableNavigation = () => useContext(TableNavigationContext)
