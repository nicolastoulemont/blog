import { getMonthDays, getWeekDaysName } from "../../../utils"
import { useDatePicker } from "../../Provider"
import { DayCell, TableNavigationProvider } from "./components"

export function DayView() {
  const { locale, state } = useDatePicker()
  const days = getWeekDaysName(locale, "short")
  const weeks = getMonthDays(state.calendarDate)

  return (
    <div className="pt-2">
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
          <tbody>
            {weeks.map((week, rowIndex) => (
              <tr>
                {week.map((day, colIndex) => (
                  <DayCell key={`${rowIndex}-${colIndex}`} day={day} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableNavigationProvider>
    </div>
  )
}
