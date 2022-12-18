import { ReactNode, useId, forwardRef } from "react"
import type { ComponentProps } from "react"
import clsx from "clsx"

import { Provider } from "./Accordion.Provider"

type WrapperDivProps = Omit<ComponentProps<"div">, "onChange">

export interface AccordionRootProps extends WrapperDivProps {
  children: ReactNode
  isOpen?: boolean
  onChange?: (isOpen: boolean) => void
}

export const Root = forwardRef<HTMLDivElement, AccordionRootProps>(function Root(
  { children, isOpen, onChange, className, ...props },
  ref
) {
  const id = useId()

  return (
    <Provider isOpen={isOpen} onChange={onChange} id={id}>
      <div
        ref={ref}
        {...props}
        className={clsx(
          "rounded-2xl border border-solid border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md",
          className
        )}
      >
        {children}
      </div>
    </Provider>
  )
})
