import { createContext, useContext } from "react"
import type { Actions, State } from "./Provider.types"
import { init } from "./init"
import { DatePickerProps } from "../../DatePicker.types"

export interface DatePickerContextValues extends Omit<DatePickerProps, "label"> {
  state: State
  dispatch: React.Dispatch<Actions>
}

export const DatePickerContext = createContext<DatePickerContextValues>({
  state: init({}),
  dispatch: () => {},
  locale: "en-GB",
  value: undefined,
  onChange: () => {},
})

export const useDatePicker = () => useContext(DatePickerContext)
