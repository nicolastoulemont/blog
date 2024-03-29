import { Actions, State } from './Provider.types'

export const ACTIONS_RECORD = {
  SET_VIEW: 'SET_VIEW',
  DAY_VIEW_CHANGE: 'DAY_VIEW_CHANGE',
  YEAR_VIEW_CHANGE: 'YEAR_VIEW_CHANGE',
  SELECT_DAY: 'SELECT_DAY',
  SELECT_MONTH_OR_YEAR: 'SELECT_MONTH_OR_YEAR',
  RESET_DATEPICKER: 'RESET_DATEPICKER',
} as const

export function reducer(state: State, action: Actions): State {
  const { type } = action

  switch (type) {
    case ACTIONS_RECORD.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      }
    case ACTIONS_RECORD.DAY_VIEW_CHANGE: {
      const updatedDate = new Date(state.calendarDate)
      const monthIndex = state.calendarDate.getMonth()

      if (action.payload === 'increment') {
        updatedDate.setMonth(monthIndex + 1)
      } else {
        updatedDate.setMonth(monthIndex - 1)
      }

      return {
        ...state,
        slideDir: action.payload === 'increment' ? 'right' : 'left',
        calendarDate: updatedDate,
      }
    }
    case ACTIONS_RECORD.YEAR_VIEW_CHANGE: {
      const [start, end] = state.yearRange

      if (action.payload === 'increment') {
        return {
          ...state,
          slideDir: 'right',
          yearRange: [start + 12, end + 12],
        }
      } else {
        return {
          ...state,
          slideDir: 'left',
          yearRange: [start - 12, end - 12],
        }
      }
    }
    case ACTIONS_RECORD.SELECT_DAY: {
      return {
        ...state,
        value: action.payload,
        calendarDate: action.payload ? action.payload : state.calendarDate,
      }
    }
    case ACTIONS_RECORD.SELECT_MONTH_OR_YEAR: {
      return {
        ...state,
        ...(state.value && {
          value: action.payload,
        }),
        view: 'days',
        slideDir: 'none',
        calendarDate: action.payload,
      }
    }
    case ACTIONS_RECORD.RESET_DATEPICKER: {
      return {
        ...state,
        view: 'days',
        slideDir: 'none',
        calendarDate: state.value ? state.value : new Date(),
      }
    }
    default:
      return state
  }
}
