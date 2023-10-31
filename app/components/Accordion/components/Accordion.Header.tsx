import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

import { useAccordion } from './Accordion.Provider'

export type AccordionHeaderProps = ComponentProps<'button'>

export const Header = forwardRef<HTMLButtonElement, AccordionHeaderProps>(function Header(
  { children, className, ...props },
  ref
) {
  const { isOpen, onToggleChange, id } = useAccordion()

  return (
    <h3 className="w-full">
      <button
        ref={ref}
        id={id}
        aria-controls={`panel-${id}`}
        aria-expanded={isOpen}
        onClick={onToggleChange}
        className={clsx(
          'flex w-full flex-grow items-center justify-between rounded-t-2xl p-4 ',
          isOpen && 'border-b border-gray-200',
          !isOpen && 'rounded-b-2xl',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </h3>
  )
})
