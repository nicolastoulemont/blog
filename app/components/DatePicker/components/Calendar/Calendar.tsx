import { getMonthsName } from "../../utils"
import { useDatePicker } from "../Provider"
import { DayView } from "./DayView"
import { HeaderButton, HeaderIconButton } from "./Header"
import { MonthView } from "./MonthView"

export function Calendar() {
  const { state, dispatch, locale } = useDatePicker()
  const monthsNames = getMonthsName(locale)
  const currentMonth = monthsNames[state.calendarDate.getMonth()]

  return (
    <div className="h-[483px] w-[375px] overflow-hidden rounded-2xl p-4 sm:h-[382px] sm:w-[330px]">
      <div className="flex flex-row items-center justify-between border-b border-gray-300 pb-2 sm:pb-1">
        <div className="flex">
          <HeaderButton
            className="mr-1"
            isActive={true}
            onClick={() => dispatch({ type: "SET_VIEW", payload: "months" })}
          >
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </HeaderButton>
          <HeaderButton isActive={false} onClick={() => dispatch({ type: "SET_VIEW", payload: "years" })}>
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
      {state.view === "days" && <DayView />}
      {state.view === "months" && <MonthView />}
      {state.view === "years" && <div>Years view</div>}
    </div>
  )
}
