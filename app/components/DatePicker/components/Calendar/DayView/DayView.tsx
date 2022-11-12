import { getMonthDays, getWeekDaysName } from "../../../utils"
import { useDatePicker } from "../../Provider"
import { AnimatedViewWrapper } from "../AnimatedViewWrapper"
import { DayCell, TableNavigationProvider } from "./components"

export function DayView() {
  const { locale, state, dispatch } = useDatePicker()
  const days = getWeekDaysName(locale, "short")
  const weeks = getMonthDays(state.calendarDate)

  return (
    <div className="h-[calc(100% - 8px)] w-full pt-2">
      <TableNavigationProvider>
        <table className="table-auto border-separate border-spacing-1">
          <thead>
            <tr className="h-10">
              {days.map((day) => (
                <th key={day} scope="col" className="h-10 w-10 sm:h-9 sm:w-9">
                  <div className="sm-h-9 flex h-10 w-10 items-center justify-center text-sm font-normal text-slate-600 sm:w-9">
                    {day}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <AnimatedViewWrapper
            motionKey={state.calendarDate.getMonth()}
            slideDir={state.slideDir}
            drag
            onDragLeft={() => dispatch({ type: "MONTH_VIEW_CHANGE", payload: "increment" })}
            onDragRight={() => dispatch({ type: "MONTH_VIEW_CHANGE", payload: "decrement" })}
          >
            <div className="-ml-1">
              <tbody>
                {weeks.map((week, rowIndex) => (
                  <tr key={`week-${rowIndex}`}>
                    {week.map((day, colIndex) => (
                      <DayCell key={`${rowIndex}-${colIndex}`} day={day} rowIndex={rowIndex} colIndex={colIndex} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </div>
          </AnimatedViewWrapper>
        </table>
      </TableNavigationProvider>
    </div>
  )
}
