import { formatDate, getMonthDays, getWeekDaysName } from "../../../../utils"
import { useDatePicker } from "../../../Provider"
import { AnimatedViewWrapper } from "../AnimatedViewWrapper"
import { DayCell, TableNavigationProvider } from "./components"

interface DayViewProps {
  onClose: () => void
}

export function DayView({ onClose }: DayViewProps) {
  const { locale, state, dispatch } = useDatePicker()
  const days = getWeekDaysName(locale, "short")
  const weeks = getMonthDays(state.calendarDate)

  return (
    <div className="h-[calc(100% - 8px)] w-full pt-2">
      <TableNavigationProvider>
        <div className="grid w-full grid-cols-7 gap-2 px-1" aria-hidden>
          {days.map((day) => (
            <div
              key={day}
              aria-hidden
              className="flex h-10 w-10 items-center justify-center text-sm font-normal text-slate-600 sm:h-9 sm:w-9"
            >
              {day}
            </div>
          ))}
        </div>
        <AnimatedViewWrapper
          motionKey={state.calendarDate.getMonth()}
          slideDir={state.slideDir}
          drag
          onDragLeft={() => dispatch({ type: "MONTH_VIEW_CHANGE", payload: "increment" })}
          onDragRight={() => dispatch({ type: "MONTH_VIEW_CHANGE", payload: "decrement" })}
        >
          <table className="table-auto border-separate border-spacing-1">
            <caption className="sr-only">{formatDate(state.calendarDate, locale, { month: "long" })} days</caption>
            <thead
              className="sr-only"
              /** HTML table requires a clean table element only HTML tree hierarchy to apply their styles, 
              /* this prevent us from inserting the AnimatedViewWrapper within the table, between the thead and the tbody
              /* to only animate the movement of the days cells, keep the thead content (which doesn't change) static.
              /* This is a work around, keeping the thead visible to screen reader only and using divs hidden from the screen readers
              /* for the "table header" visible to non screen readers users.
              */
            >
              <tr>
                {days.map((day) => (
                  <th key={day} scope="col">
                    <div>{day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, rowIndex) => (
                <tr key={`week-${rowIndex}`}>
                  {week.map((day, colIndex) => (
                    <DayCell
                      onClose={onClose}
                      key={`${rowIndex}-${colIndex}`}
                      day={day}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedViewWrapper>
      </TableNavigationProvider>
    </div>
  )
}
