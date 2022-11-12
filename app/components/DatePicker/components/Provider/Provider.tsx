import { useReducer } from "react"
import { reducer } from "./reducer"
import { init } from "./init"
import { DatePickerProviderProps } from "./Provider.types"
import { DatePickerContext } from "./context"

export function DatePickerProvider({ children, ...props }: DatePickerProviderProps) {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, init(props))

  return <DatePickerContext.Provider value={{ state, dispatch, ...props }}>{children}</DatePickerContext.Provider>
}
