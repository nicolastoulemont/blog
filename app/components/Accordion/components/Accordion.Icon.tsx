import { motion } from 'framer-motion'
import { ComponentProps, forwardRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import { useAccordion } from './Accordion.Provider'

export type AccordionIconProps = Omit<
  ComponentProps<'svg'>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
>

const MotionChevronDownIcon = motion(ChevronDownIcon)

export const Icon = forwardRef<SVGSVGElement, AccordionIconProps>(function (
  { className, ...props },
  ref
) {
  const { isOpen } = useAccordion()

  return (
    <MotionChevronDownIcon
      animate={{ rotate: isOpen ? 90 : 0, transition: { duration: 0.3 } }}
      ref={ref}
      className={clsx('h-4 w-4 text-slate-800 dark:text-white', className)}
      {...props}
    />
  )
})
