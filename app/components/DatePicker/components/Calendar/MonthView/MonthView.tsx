import { isSameMonth } from "date-fns"
import { getMonthsName, handleMonthChange } from "../../../utils"
import { useDatePicker } from "../../Provider"
import { CalendarButton } from "../CalendarButton"
import { CalendarUnderline } from "../CalendarUnderline"

export function MonthView() {
  const { locale, state, dispatch } = useDatePicker()
  const months = getMonthsName(locale, "short")

  const isCurrentMonth = (monthIndex: number) =>
    isSameMonth(new Date(), new Date(new Date().getFullYear(), monthIndex, 1))

  function handleClick(monthIndex: number) {
    const date = handleMonthChange(state.calendarDate, monthIndex)
    dispatch({ type: "SELECT_MONTH_OR_YEAR", payload: date })
  }

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-3 gap-4 px-6 py-14 sm:px-4 sm:py-8">
        {months.map((month, monthIndex) => (
          <div
            key={`month-${monthIndex}`}
            className="relative flex h-[40px] w-[88px] items-center justify-center sm:w-[72px]"
          >
            <CalendarButton onClick={() => handleClick(monthIndex)} isSelected={false}>
              {month}
            </CalendarButton>
            {isCurrentMonth(monthIndex) && <CalendarUnderline variant="other" />}
          </div>
        ))}
      </div>
    </div>
  )
}
