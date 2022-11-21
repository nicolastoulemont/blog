import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"

import { Calendar } from "./Calendar"
import { Input, InputContainer, InputLabel } from "./Input"
import { useDatePicker } from "./Provider"

export function DatePickerMobile() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const calendarInitialRef = useRef<HTMLButtonElement>(null)
  const { dispatch } = useDatePicker()

  function openCalendar() {
    setOpen(true)
  }

  function closeCalendar() {
    dispatch({ type: "RESET_DATEPICKER" })
    setOpen(false)
    inputRef.current?.focus()
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") {
      openCalendar()
    } else if (open && event.code === "Escape") {
      closeCalendar()
    }
  }

  return (
    <>
      <InputContainer>
        <InputLabel />
        <Input onKeyDown={handleInputKeyDown} onClick={() => !open && openCalendar()} />
      </InputContainer>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeCalendar}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div aria-hidden="true" className="fixed inset-0 bg-gray-800 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform items-center justify-center overflow-hidden rounded-t-2xl bg-white pt-3 align-bottom shadow-xl transition-all dark:bg-slate-900 dark:shadow-2xl">
                  <Calendar calendarInitialRef={calendarInitialRef} triggerRef={inputRef} onClose={closeCalendar} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
