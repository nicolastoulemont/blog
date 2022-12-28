import { useIsMobile } from "../../utils"
import { useDatePicker } from "../Provider"
import { DayView, Header, MonthView, YearView } from "./components"
import { motion } from "framer-motion"
import { useRef } from "react"

export interface CalendarProps {
  onClose: () => void
  calendarInitialRef: React.RefObject<HTMLButtonElement>
  triggerRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLInputElement>
}

export function Calendar({ onClose, calendarInitialRef, triggerRef }: CalendarProps) {
  const headerLastBtnRef = useRef<HTMLButtonElement>(null)
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
      className="w-[360px] overflow-hidden rounded-2xl bg-white p-4 dark:bg-slate-900 sm:w-[330px]"
    >
      <Header
        calendarInitialRef={calendarInitialRef}
        headerLastBtnRef={headerLastBtnRef}
      />
      {state.view === "days" && (
        <DayView
          onClose={onClose}
          triggerRef={triggerRef}
          headerLastBtnRef={headerLastBtnRef}
        />
      )}
      {state.view === "months" && <MonthView />}
      {state.view === "years" && <YearView />}
    </motion.div>
  )
}
