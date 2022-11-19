import { isSameMonth } from "date-fns"
import { getMonthsName } from "../../../utils"
import { useDatePicker } from "../../Provider"
import { AnimatedViewWrapper } from "../AnimatedViewWrapper"
import { CalendarButton } from "../CalendarButton"
import { CalendarText } from "../CalendarText"
import { CalendarUnderline } from "../CalendarUnderline"

export function MonthView() {
  const { locale, state, handleSelectMonth } = useDatePicker()
  const months = getMonthsName(locale, "short")

  const isCurrentMonth = (monthIndex: number) =>
    isSameMonth(new Date(), new Date(new Date().getFullYear(), monthIndex, 1))

  const isSelected = (monthIndex: number) => {
    const monthAsDate = new Date(state.calendarDate.getFullYear(), monthIndex, 1)
    return state.value ? isSameMonth(state.value, monthAsDate) : false
  }

  return (
    <div className="flex w-full flex-col">
      <AnimatedViewWrapper motionKey={state.calendarDate.getFullYear()} slideDir={state.slideDir}>
        <div className="grid grid-cols-3 gap-4 px-6 py-14 sm:px-4 sm:py-8">
          {months.map((month, monthIndex) => (
            <div
              key={`month-${monthIndex}`}
              className="relative flex h-[40px] w-[88px] items-center justify-center sm:w-[72px]"
            >
              <CalendarButton onClick={() => handleSelectMonth(monthIndex)} isSelected={isSelected(monthIndex)}>
                <CalendarText variant={isSelected(monthIndex) ? "selected" : "regular"}>{month}</CalendarText>
              </CalendarButton>
              {isCurrentMonth(monthIndex) && <CalendarUnderline variant="other" />}
            </div>
          ))}
        </div>
      </AnimatedViewWrapper>
    </div>
  )
}
