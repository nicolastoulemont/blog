import { formatDate, getMonthsName } from '../../../../utils'
import { useDatePicker } from '../../../Provider'
import { CalendarProps } from '../../Calendar'
import { HeaderButton } from './HeaderButton'
import { HeaderIconButton } from './HeaderIconButton'

type HeaderProps = Pick<CalendarProps, 'calendarInitialRef'> & {
  headerLastBtnRef: React.RefObject<HTMLButtonElement>
}

export function Header({ calendarInitialRef, headerLastBtnRef }: HeaderProps) {
  const { state, dispatch, locale } = useDatePicker()
  const monthsNames = getMonthsName(locale)
  const currentMonthRaw = monthsNames[state.calendarDate.getMonth()]

  const nextYearRangeLabel = `Years from ${state.yearRange[0] + 12} to ${
    state.yearRange[1] + 12
  }`
  const previousYearRangeLabel = `Years from ${state.yearRange[0] - 12} to ${
    state.yearRange[1] - 12
  }`

  const previousMonthLabel = `Show ${formatDate(
    new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1),
    locale,
    { month: 'long' }
  )}`
  const nextMonthLabel = `Show ${formatDate(
    new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1),
    locale,
    { month: 'long' }
  )}`

  const currentMonth = currentMonthRaw.charAt(0).toUpperCase() + currentMonthRaw.slice(1)
  const currentYear = state.calendarDate.getFullYear()

  function handleViewNavigation(direction: 'increment' | 'decrement') {
    const type = state.view === 'days' ? 'DAY_VIEW_CHANGE' : 'YEAR_VIEW_CHANGE'
    dispatch({ type: type, payload: direction })
  }

  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-300 pb-3">
      <div className="flex">
        <HeaderButton
          ref={calendarInitialRef}
          className="mr-1"
          isActive={state.view === 'months'}
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'months' })}
          aria-label={`Current month: ${currentMonth}, click to show months panel`}
        >
          {currentMonth}
        </HeaderButton>
        <HeaderButton
          isActive={state.view === 'years'}
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'years' })}
          aria-label={`Current year: ${currentYear}, click to show years panel`}
        >
          {currentYear}
        </HeaderButton>
      </div>
      <div className="flex">
        <HeaderIconButton
          className="mr-1"
          variant="left"
          aria-label={state.view === 'days' ? previousMonthLabel : previousYearRangeLabel}
          disabled={state.view === 'months'}
          onClick={() => handleViewNavigation('decrement')}
        />
        <HeaderIconButton
          variant="right"
          disabled={state.view === 'months'}
          aria-label={state.view === 'days' ? nextMonthLabel : nextYearRangeLabel}
          onClick={() => handleViewNavigation('increment')}
          ref={headerLastBtnRef}
        />
      </div>
    </div>
  )
}
