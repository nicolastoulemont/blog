import type { ReactNode } from "react"
import type { PanInfo } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"

import type { State } from "../Provider/Provider.types"
import { useWindowSize } from "react-use"

interface VariantFnParams {
  slideDir: State["slideDir"]
  animationValuesMap: AnimationValuesMap
}

const variants = {
  enter: ({ slideDir, animationValuesMap }: VariantFnParams) => ({
    x: animationValuesMap["enter"][slideDir],
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: ({ slideDir, animationValuesMap }: VariantFnParams) => ({
    x: animationValuesMap["exit"][slideDir],
    opacity: 0,
  }),
}

type AnimationValuesMap = Record<"enter" | "exit", Record<State["slideDir"], number>>

interface AnimateWrapperProps {
  motionKey: number
  children: ReactNode
  slideDir: State["slideDir"]
  drag?: boolean
  onDragRight?: () => void
  onDragLeft?: () => void
}

export function AnimatedViewWrapper({
  children,
  slideDir,
  motionKey,
  drag,
  onDragLeft,
  onDragRight,
}: AnimateWrapperProps) {
  const window = useWindowSize()

  const width = window.width > 500 ? 300 : 400

  const animationValuesMap: AnimationValuesMap = {
    enter: {
      right: width,
      left: -width,
      none: 0,
    },
    exit: {
      right: -width,
      left: width,
      none: 0,
    },
  }

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -75) {
      onDragLeft && onDragLeft()
    } else if (info.offset.x > 75) {
      onDragRight && onDragRight()
    }
  }

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={{ slideDir, animationValuesMap }}>
        <motion.div
          key={`${motionKey}-${slideDir}`}
          style={{ position: "absolute", top: 0, width: "100%" }}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={{ slideDir, animationValuesMap }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          drag={window.width < 500 && drag ? "x" : false}
          dragMomentum={false}
          dragConstraints={{ left: 75, right: 75 }}
          onDragEnd={handleDrag}
          dragSnapToOrigin
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
