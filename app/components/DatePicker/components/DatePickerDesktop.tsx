import { Transition } from "@headlessui/react"
import { useRef, useState } from "react"
import { useClickAway } from "react-use"

import { Calendar } from "./Calendar"
import { Input } from "./Input"
import { useDatePicker } from "./Provider"

export function DatePickerDesktop() {
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarInitialRef = useRef<HTMLButtonElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const { label, placeholder } = useDatePicker()
  const [open, setOpen] = useState(false)

  useClickAway(calendarContainerRef, () => closeCalendar())

  function openCalendar() {
    setOpen(true)
    setTimeout(() => calendarInitialRef.current?.focus(), 100)
  }

  function closeCalendar() {
    setOpen(false)
    inputRef.current?.focus()
  }

  function handleEscapeKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.code === "Escape") {
      closeCalendar()
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      openCalendar()
    } else if (open && event.code === "Escape") {
      closeCalendar()
    }
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        onKeyDown={handleInputKeyDown}
        onFocus={() => !open && openCalendar()}
        onClick={() => !open && openCalendar()}
      />
      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div ref={calendarContainerRef} className="absolute z-50 mt-3" onKeyDown={handleEscapeKey}>
          <div className="rounded-2xl shadow-lg">
            <Calendar calendarInitialRef={calendarInitialRef} onClose={closeCalendar} />
          </div>
        </div>
      </Transition>
    </div>
  )
}
