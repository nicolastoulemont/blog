import { useIsMobile } from "../../utils"
import { useDatePicker } from "../Provider"
import { DayView, Header, MonthView, YearView } from "./components"
import { motion } from "framer-motion"

export interface CalendarProps {
  onClose: () => void
  calendarInitialRef: React.RefObject<HTMLButtonElement>
}

export function Calendar(props: CalendarProps) {
  const { state } = useDatePicker()
  const isMobile = useIsMobile()

  const heights = {
    days: isMobile ? 420 : 386,
    others: isMobile ? 420 : 350,
  }

  return (
    <motion.div
      initial={false}
      animate={{ height: state.view === "days" ? heights.days : heights.others }}
      transition={{ bounce: 0, duration: 0.3, ease: "circOut" }}
      className="w-[360px] overflow-hidden rounded-2xl bg-white p-4 dark:bg-slate-800 sm:w-[330px]"
    >
      <Header calendarInitialRef={props.calendarInitialRef} />
      {state.view === "days" && <DayView onClose={props.onClose} />}
      {state.view === "months" && <MonthView />}
      {state.view === "years" && <YearView />}
    </motion.div>
  )
}
