import React from 'react'
import { formatDate, getMonthDays, getWeekDaysName } from '../../../../utils'
import { useDatePicker } from '../../../Provider'
import type { CalendarProps } from '../../Calendar'
import { AnimatedViewWrapper } from '../AnimatedViewWrapper'
import { DayCell, TableNavigationProvider } from './components'

interface DayViewProps extends Pick<CalendarProps, 'onClose' | 'triggerRef'> {
  headerLastBtnRef: React.RefObject<HTMLButtonElement | null>
}

export function DayView({ onClose, headerLastBtnRef, triggerRef }: DayViewProps) {
  const { locale, state, dispatch } = useDatePicker()
  const days = getWeekDaysName(locale, 'short')
  const weeks = getMonthDays(state.calendarDate)

  return (
    <div className="h-[calc(100% - 8px)] w-full pt-2">
      <TableNavigationProvider prevRef={headerLastBtnRef} afterRef={triggerRef}>
        <div className="grid w-full grid-cols-7 gap-2 px-1" aria-hidden>
          {days.map((day) => (
            <div
              key={day}
              aria-hidden
              className="flex h-10 w-10 items-center justify-center text-sm font-normal text-slate-600 sm:h-9 sm:w-9 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>
        <AnimatedViewWrapper
          motionKey={state.calendarDate.getMonth()}
          slideDir={state.slideDir}
          drag
          onDragLeft={() => dispatch({ type: 'DAY_VIEW_CHANGE', payload: 'increment' })}
          onDragRight={() => dispatch({ type: 'DAY_VIEW_CHANGE', payload: 'decrement' })}
        >
          <table className="table-auto border-separate border-spacing-1">
            <caption className="sr-only">
              {formatDate(state.calendarDate, locale, { month: 'long' })} days
            </caption>
            <thead
              className="sr-only"
              /** HTML tables require a clean table-only element hierarchy to apply their styles.
              /* This prevents us from inserting the AnimatedViewWrapper within the table, between the thead and the tbody,
              /* to only animate the movement of the day cells and keep the thead content (which doesn't change) static.
              /* This is a workaround: the thead stays visible to screen readers only, and divs hidden from screen readers
              /* provide the "table header" for sighted users.
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
