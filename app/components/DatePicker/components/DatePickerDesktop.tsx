import { useEffect, useRef } from "react"
import { Calendar } from "./Calendar"
import { Input, InputContainer, InputLabel } from "./Input"
import { useDatePicker } from "./Provider"
import { Popover, Transition } from "@headlessui/react"

export function DatePickerDesktop() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const calendarInitialRef = useRef<HTMLButtonElement>(null)
  const { dispatch } = useDatePicker()

  return (
    <Popover className="relative">
      {({ open, close }) => {
        useEffect(() => {
          if (!open) {
            dispatch({ type: "RESET_DATEPICKER" })
          }
        }, [open])

        return (
          <>
            <InputContainer>
              <InputLabel />
              <Popover.Button ref={btnRef} className="w-[300px]" aria-label="Datepicker">
                <Input tabIndex={-1} />
              </Popover.Button>
            </InputContainer>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute z-50 mt-3 rounded-2xl shadow-xl dark:shadow-2xl">
                <Calendar
                  calendarInitialRef={calendarInitialRef}
                  triggerRef={btnRef}
                  onClose={() => close(btnRef)}
                />
              </Popover.Panel>
            </Transition>
          </>
        )
      }}
    </Popover>
  )
}
