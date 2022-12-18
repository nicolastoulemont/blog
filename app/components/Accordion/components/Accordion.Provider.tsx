import { createContext, useContext, useState } from "react"

import type { AccordionRootProps } from "./Accordion.Root"

interface AccordionContextValues extends Omit<AccordionRootProps, "children"> {
  id: string
  isOpen: boolean
  onToggleChange: () => void
}

export const AccordionContext = createContext<AccordionContextValues | null>(null)

export const useAccordion = () => {
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error("useAccordionContext must be used within a AccordionProvider")
  }

  return context
}

type AccordionProviderProps = AccordionRootProps & { id: string }

export const Provider = ({ children, isOpen: isOpenProps = false, onChange, ...props }: AccordionProviderProps) => {
  const [isOpen, setIsOpen] = useState(isOpenProps)

  const onToggleChange = () => {
    setIsOpen((isOpen) => {
      onChange && onChange(!isOpen)

      return !isOpen
    })
  }

  return <AccordionContext.Provider value={{ ...props, isOpen, onToggleChange }}>{children}</AccordionContext.Provider>
}
