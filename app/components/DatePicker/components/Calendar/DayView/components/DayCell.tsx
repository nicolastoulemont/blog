import { CalendarButton } from "../../CalendarButton"
import { CalendarUnderline } from "../../CalendarUnderline"
import { isSameDay, isSameMonth } from "date-fns"
import { useDatePicker } from "../../../Provider"
import { useTableNavigation } from "./TableNavigationProvider"
import { CalendarText } from "../../CalendarText"

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
          <CalendarText variant={variant}>{day.getDate()}</CalendarText>
        </CalendarButton>
        {isCurrentDay && <CalendarUnderline variant="day" />}
      </div>
    </td>
  )
}