import { CalendarButton } from "../../CalendarButton"
import { CalendarUnderline } from "../../CalendarUnderline"
import { isSameDay, isSameMonth } from "date-fns"
import { useDatePicker } from "../../../Provider"
import { useTableNavigation } from "./TableNavigationProvider"
import clsx from "clsx"

interface DayCellProps {
  day: Date
  rowIndex: number
  colIndex: number
}

export function DayCell({ day, rowIndex, colIndex }: DayCellProps) {
  const { state, dispatch } = useDatePicker()
  const { mapRefToMatrix, handleKeyboardNavigation } = useTableNavigation()

  const isSelected = state.value ? isSameDay(day, state.value) : false
  const isWithinCurrentMonth = isSameMonth(state.calendarDate, day)
  const isCurrentDay = isSameDay(new Date(), day)

  const textStyles = {
    muted: "text-slate-400 font-normal",
    regular: "text-slate-700 font-medium",
    selected: "text-white font-medium",
  } as const

  const variant = isSelected ? "selected" : isWithinCurrentMonth ? "regular" : "muted"

  return (
    <td className="h-10 w-10 sm:h-9 sm:w-9">
      <div className="relative flex h-10 w-10 items-center justify-center sm:h-9 sm:w-9">
        <CalendarButton
          ref={(ref) => mapRefToMatrix(ref as HTMLButtonElement, rowIndex, colIndex)}
          onKeyDown={(event) => handleKeyboardNavigation(event, rowIndex, colIndex)}
          isSelected={isSelected}
          onClick={() => dispatch({ type: "SELECT_DAY", payload: day })}
        >
          <span className={clsx("text-base font-medium transition-colors sm:text-sm", textStyles[variant])}>
            {day.getDate()}
          </span>
        </CalendarButton>
        {isCurrentDay && <CalendarUnderline variant="day" />}
      </div>
    </td>
  )
}
