import { KeyboardEvent, useRef } from 'react'
import { TableNavigationContext } from './context'
import type {
  Matrix,
  TableNavigationProviderProps,
} from './TableNavigationProvider.types'

export function TableNavigationProvider({
  children,
  prevRef,
  afterRef,
}: TableNavigationProviderProps) {
  const matrix = useRef<Matrix>([[]])

  function mapRefToMatrix(ref: HTMLButtonElement, rowIndex: number, colIndex: number) {
    if (!matrix.current[rowIndex]) {
      matrix.current[rowIndex] = []
    }

    matrix.current[rowIndex][colIndex] = ref
  }
  function handleKeyboardNavigation(
    event: KeyboardEvent<HTMLButtonElement>,
    rowIndex: number,
    colIndex: number
  ) {
    event.preventDefault()
    switch (event.code) {
      case 'Tab': {
        if (event.shiftKey) {
          prevRef?.current?.focus()
        } else {
          afterRef?.current?.focus()
        }
        break
      }
      case 'ArrowDown': {
        if (rowIndex + 1 < matrix.current.length) {
          matrix.current[rowIndex + 1][colIndex]?.focus()
        }
        break
      }
      case 'ArrowUp': {
        if (rowIndex > 0) {
          matrix.current[rowIndex - 1][colIndex]?.focus()
        }
        break
      }
      case 'ArrowRight': {
        if (colIndex !== 6) {
          matrix.current[rowIndex][colIndex + 1]?.focus()
        }
        break
      }
      case 'ArrowLeft': {
        if (colIndex !== 0) {
          matrix.current[rowIndex][colIndex - 1]?.focus()
        }
        break
      }
    }
  }

  return (
    <TableNavigationContext.Provider value={{ handleKeyboardNavigation, mapRefToMatrix }}>
      {children}
    </TableNavigationContext.Provider>
  )
}
