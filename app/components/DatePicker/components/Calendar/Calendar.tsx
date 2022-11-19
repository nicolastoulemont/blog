import { useIsMobile } from "../../utils"
import { useDatePicker } from "../Provider"
import { DayView } from "./DayView"
import { Header } from "./Header"
import { MonthView } from "./MonthView"
import { YearView } from "./YearView"
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
      className="w-[360px] overflow-hidden rounded-2xl bg-white p-4 sm:w-[330px]"
    >
      <Header {...props} />
      {state.view === "days" && <DayView {...props} />}
      {state.view === "months" && <MonthView />}
      {state.view === "years" && <YearView />}
    </motion.div>
  )
}
