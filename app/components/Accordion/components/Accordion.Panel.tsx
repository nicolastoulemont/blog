import { motion } from "framer-motion"
import { ComponentProps, forwardRef } from "react"
import clsx from "clsx"

import { useAccordion } from "./Accordion.Provider"

export type AccordionPanelProps = Omit<
  ComponentProps<"div">,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
>

const variants = {
  open: { opacity: 1, height: "auto" },
  closed: { opacity: 0, height: 0 },
}

export const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(function Panel(
  { children, className, ...props },
  ref
) {
  const { isOpen, id } = useAccordion()

  return (
    <motion.div
      ref={ref}
      id={`panel-${id}`}
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}
      role="region"
      aria-hidden={!isOpen}
      className={clsx("overflow-hidden", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
})
