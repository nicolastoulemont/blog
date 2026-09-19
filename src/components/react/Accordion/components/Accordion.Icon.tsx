import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import clsx from 'clsx'
import { forwardRef } from 'react'
import type { ComponentProps } from 'react'

import { useAccordion } from './Accordion.Provider'

export type AccordionIconProps = Omit<
  ComponentProps<'span'>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
>

export const Icon = forwardRef<HTMLSpanElement, AccordionIconProps>(function (
  { className, ...props },
  ref
) {
  const { isOpen } = useAccordion()

  return (
    <motion.span
      animate={{ rotate: isOpen ? 90 : 0, transition: { duration: 0.3 } }}
      ref={ref}
      className={clsx('inline-flex', className)}
      {...props}
    >
      <HiChevronDown className="h-4 w-4 text-slate-800 dark:text-white" />
    </motion.span>
  )
})
