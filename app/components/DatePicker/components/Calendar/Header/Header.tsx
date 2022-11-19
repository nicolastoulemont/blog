import { getMonthsName } from "~/components/DatePicker/utils"
import { useDatePicker } from "../../Provider"
import { CalendarProps } from "../Calendar"
import { HeaderButton } from "./HeaderButton"
import { HeaderIconButton } from "./HeaderIconButton"

type HeaderProps = Pick<CalendarProps, "calendarInitialRef">

export function Header(props: HeaderProps) {
  const { state, dispatch, locale } = useDatePicker()
  const monthsNames = getMonthsName(locale)
  const currentMonth = monthsNames[state.calendarDate.getMonth()]
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-300 pb-2 sm:pb-1">
      <div className="flex">
        <HeaderButton
          ref={props.calendarInitialRef}
          className="mr-1"
          isActive={state.view === "months"}
          onClick={() => dispatch({ type: "SET_VIEW", payload: "months" })}
        >
          {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
        </HeaderButton>
        <HeaderButton
          isActive={state.view === "years"}
          onClick={() => dispatch({ type: "SET_VIEW", payload: "years" })}
        >
          {state.calendarDate.getFullYear()}
        </HeaderButton>
      </div>
      <div className="flex">
        <HeaderIconButton
          className="mr-1"
          variant="left"
          disabled={state.view === "months"}
          onClick={() => {
            const type = state.view === "days" ? "MONTH_VIEW_CHANGE" : "YEAR_VIEW_CHANGE"
            dispatch({ type: type, payload: "decrement" })
          }}
        />
        <HeaderIconButton
          variant="right"
          disabled={state.view === "months"}
          onClick={() => {
            const type = state.view === "days" ? "MONTH_VIEW_CHANGE" : "YEAR_VIEW_CHANGE"
            dispatch({ type: type, payload: "increment" })
          }}
        />
      </div>
    </div>
  )
}
