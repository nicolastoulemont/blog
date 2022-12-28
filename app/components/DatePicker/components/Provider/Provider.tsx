import { useEffect, useReducer } from "react"
import { reducer } from "./reducer"
import { init } from "./init"
import { DatePickerProviderProps } from "./Provider.types"
import { DatePickerContext } from "./context"
import { handleMonthChange, handleYearChange } from "../../utils"
import { isSameDay } from "date-fns"

export function DatePickerProvider({ children, ...props }: DatePickerProviderProps) {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, init(props))
  const { value, onChange } = props

  useEffect(() => {
    if (value === undefined && state.value) {
      dispatch({ type: "SELECT_DAY", payload: value })
    } else if (!state.value || (value && isSameDay(value, state.value))) {
      dispatch({ type: "SELECT_DAY", payload: value })
    }
  }, [value, state.value])

  function handleSelectDay(date: Date) {
    dispatch({ type: "SELECT_DAY", payload: date })
    onChange(date)
  }

  function handleSelectMonth(monthIndex: number) {
    const date = handleMonthChange(state.calendarDate, monthIndex)
    dispatch({ type: "SELECT_MONTH_OR_YEAR", payload: date })
    if (state.value) {
      onChange(date)
    }
  }

  function handleSelectYear(year: number) {
    const date = handleYearChange(state.calendarDate, year)
    dispatch({ type: "SELECT_MONTH_OR_YEAR", payload: date })
    if (state.value) {
      onChange(date)
    }
  }

  return (
    <DatePickerContext.Provider
      value={{
        state,
        dispatch,
        handleSelectDay,
        handleSelectMonth,
        handleSelectYear,
        ...props,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}
