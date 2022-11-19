import { ReactNode } from "react"
import { DatePickerProps } from "../../DatePicker.types"
import { ACTIONS_RECORD } from "./reducer"

export interface DatePickerProviderProps extends DatePickerProps {
  children: ReactNode
}

export type Views = "days" | "months" | "years"

type ViewChange = "increment" | "decrement"

export type SlideDirection = "left" | "right" | "none"

export type State = {
  value: Date | undefined
  calendarDate: Date
  view: Views
  slideDir: SlideDirection
  yearRange: [number, number]
}

export type ActionType<K extends keyof typeof ACTIONS_RECORD> = typeof ACTIONS_RECORD[K]
export type Action<T> = Extract<Actions, T>

export type Actions =
  | { type: ActionType<"SET_VIEW">; payload: Views }
  | { type: ActionType<"MONTH_VIEW_CHANGE">; payload: ViewChange }
  | { type: ActionType<"YEAR_VIEW_CHANGE">; payload: ViewChange }
  | { type: ActionType<"SELECT_DAY">; payload: Date | undefined }
  | { type: ActionType<"SELECT_MONTH_OR_YEAR">; payload: Date }
  | { type: ActionType<"RESET_DATEPICKER"> }
