import { getYearsRange } from "../../../../utils"
import { useDatePicker } from "../../../Provider"
import { AnimatedViewWrapper } from "../AnimatedViewWrapper"
import { CalendarButton } from "../CalendarButton"
import { CalendarText } from "../CalendarText"
import { CalendarUnderline } from "../CalendarUnderline"

export function YearView() {
  const { state, dispatch, handleSelectYear } = useDatePicker()
  const years = getYearsRange(state.yearRange[0], state.yearRange[1])

  const isCurrentYear = (year: number) => new Date().getFullYear() === year

  const isSelected = (year: number) =>
    state.value ? state.value.getFullYear() === year : false

  return (
    <div className="flex w-full flex-col">
      <AnimatedViewWrapper
        motionKey={state.yearRange[0]}
        slideDir={state.slideDir}
        drag
        onDragLeft={() => dispatch({ type: "YEAR_VIEW_CHANGE", payload: "increment" })}
        onDragRight={() => dispatch({ type: "YEAR_VIEW_CHANGE", payload: "decrement" })}
      >
        <div className="grid grid-cols-3 gap-4 px-6 py-14 sm:px-4 sm:py-8">
          {years.map((year, yearIndex) => (
            <div
              key={`year-${yearIndex}`}
              className="relative flex h-[40px] w-[88px] items-center justify-center sm:w-[72px]"
            >
              <CalendarButton
                onClick={() => handleSelectYear(year)}
                isSelected={isSelected(year)}
                aria-label={String(year)}
              >
                <CalendarText variant={isSelected(year) ? "selected" : "regular"}>
                  {year}
                </CalendarText>
              </CalendarButton>
              {isCurrentYear(year) && <CalendarUnderline variant="other" />}
            </div>
          ))}
        </div>
      </AnimatedViewWrapper>
    </div>
  )
}
