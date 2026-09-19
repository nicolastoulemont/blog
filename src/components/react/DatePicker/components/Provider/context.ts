import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'
import type { Actions, State } from './Provider.types'
import type { DatePickerProps } from '../../DatePicker.types'

export interface DatePickerContextValues extends DatePickerProps {
  state: State
  dispatch: Dispatch<Actions>
  handleSelectDay: (date: Date) => void
  handleSelectMonth: (montIndex: number) => void
  handleSelectYear: (year: number) => void
}

export const DatePickerContext = createContext<DatePickerContextValues | null>(null)

export const useDatePicker = () => {
  const context = useContext(DatePickerContext)
  if (!context) {
    throw new Error('useDatePicker must be used within a DatePickerProvider')
  }
  return context
}
