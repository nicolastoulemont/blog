import { getMonthsName, useIsMobile } from "../../utils"
import { useDatePicker } from "../Provider"
import { DayView } from "./DayView"
import { HeaderButton, HeaderIconButton } from "./Header"
import { MonthView } from "./MonthView"
import { YearView } from "./YearView"
import { motion } from "framer-motion"

interface CalendarProps {
  onClose: () => void
  calendarInitialRef: React.RefObject<HTMLButtonElement>
}

export function Calendar(props: CalendarProps) {
  const { state, dispatch, locale } = useDatePicker()
  const isMobile = useIsMobile()
  const monthsNames = getMonthsName(locale)
  const currentMonth = monthsNames[state.calendarDate.getMonth()]

  const heights = {
    days: isMobile ? 420 : 386,
    others: isMobile ? 420 : 350,
  }

  return (
    <motion.div
      initial={false}
      animate={{ height: state.view === "days" ? heights.days : heights.others }}
      transition={{ bounce: 0, duration: 0.3, ease: "circOut" }}
      className="w-[360px] overflow-hidden rounded-2xl bg-white p-4 sm:w-[330px]"
    >
      <div className="flex flex-row items-center justify-between border-b border-gray-300 pb-2 sm:pb-1">
        <div className="flex">
          <HeaderButton
            ref={props.calendarInitialRef}
            className="mr-1"
            isActive={state.view === "months"}
            onClick={() => dispatch({ type: "SET_VIEW", payload: "months" })}
          >
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </HeaderButton>
          <HeaderButton
            isActive={state.view === "years"}
            onClick={() => dispatch({ type: "SET_VIEW", payload: "years" })}
          >
            {state.calendarDate.getFullYear()}
          </HeaderButton>
        </div>
        <div className="flex">
          <HeaderIconButton
            className="mr-1"
            variant="left"
            disabled={state.view === "months"}
            onClick={() => {
              const type = state.view === "days" ? "MONTH_VIEW_CHANGE" : "YEAR_VIEW_CHANGE"
              dispatch({ type: type, payload: "decrement" })
            }}
          />
          <HeaderIconButton
            variant="right"
            disabled={state.view === "months"}
            onClick={() => {
              const type = state.view === "days" ? "MONTH_VIEW_CHANGE" : "YEAR_VIEW_CHANGE"
              dispatch({ type: type, payload: "increment" })
            }}
          />
        </div>
      </div>
      {state.view === "days" && <DayView {...props} />}
      {state.view === "months" && <MonthView />}
      {state.view === "years" && <YearView />}
    </motion.div>
  )
}
