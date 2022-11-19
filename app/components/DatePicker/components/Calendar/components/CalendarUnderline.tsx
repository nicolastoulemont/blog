import React from "react"
import clsx from "clsx"

interface CalendarUnderlineProps {
  variant: "day" | "other"
}

export function CalendarUnderline({ variant }: CalendarUnderlineProps) {
  return (
    <div
      aria-hidden
      className={clsx(
        "absolute z-0 rounded-lg bg-blue-200",
        variant === "day" ? "bottom-1 h-[3px] w-4 sm:h-[2px] sm:w-3" : "bottom-[6px] h-[3px] w-4 sm:bottom-[7.5px]"
      )}
    />
  )
}
