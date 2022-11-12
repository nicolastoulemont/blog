import { getYearsRange, handleYearChange } from "../../../utils"
import { useDatePicker } from "../../Provider"
import { CalendarButton } from "../CalendarButton"
import { CalendarText } from "../CalendarText"
import { CalendarUnderline } from "../CalendarUnderline"

export function YearView() {
  const { state, dispatch } = useDatePicker()
  const years = getYearsRange(state.yearRange[0], state.yearRange[1])

  function handleClick(year: number) {
    const date = handleYearChange(state.calendarDate, year)
    dispatch({ type: "SELECT_MONTH_OR_YEAR", payload: date })
  }

  const isCurrentYear = (year: number) => new Date().getFullYear() === year

  const isSelected = (year: number) => (state.value ? state.value.getFullYear() === year : false)

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-3 gap-4 px-6 py-14 sm:px-4 sm:py-8">
        {years.map((year, yearIndex) => (
          <div
            key={`year-${yearIndex}`}
            className="relative flex h-[40px] w-[88px] items-center justify-center sm:w-[72px]"
          >
            <CalendarButton onClick={() => handleClick(year)} isSelected={isSelected(year)}>
              <CalendarText variant={isSelected(year) ? "selected" : "regular"}>{year}</CalendarText>
            </CalendarButton>
            {isCurrentYear(year) && <CalendarUnderline variant="other" />}
          </div>
        ))}
      </div>
    </div>
  )
}
