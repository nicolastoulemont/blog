import { useMemo, useState } from "react"
import { useTableOfContent } from "./useTableOfContent"
import type { TableOfContentProps } from "./types"
import { TableOfContentLink } from "./Link"
import { FiMenu, FiX } from "react-icons/fi"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, AnimatePresence } from "framer-motion"

const MotionOverlay = motion(Dialog.Overlay)
const MotionContent = motion(Dialog.Content)

const variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
  },
}

export function MobileTableOfContent({ elements, activeColor }: TableOfContentProps) {
  const [open, setOpen] = useState(false)
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const { currentActiveIndex } = useTableOfContent({ elementIds })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-10 right-3 flex rounded-full bg-blue-500 p-3 shadow-lg lg:hidden">
          <FiMenu color="white" aria-label="open menu" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        <Dialog.Portal>
          <MotionOverlay
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 h-screen w-screen bg-gray-800"
          />

          <MotionContent
            key="content"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 block w-full rounded-t-xl bg-white"
          >
            <Dialog.Close className="flex w-full justify-end">
              <button className="flex h-[35px] w-[35px] items-center justify-center">
                <FiX size="1.5rem" className="stroke-slate-700" aria-label="close menu" />
              </button>
            </Dialog.Close>
            <Dialog.Description asChild>
              <nav className="max-h-[70vh] overflow-scroll px-6 pb-6 pt-2">
                <ul>
                  {elements.map((element, index) => (
                    <TableOfContentLink
                      key={`${element.content}${element.id}${index}`}
                      element={element}
                      activeColor={activeColor}
                      isActive={currentActiveIndex === index}
                      isFirst={index === 0}
                      onClose={() => setOpen(false)}
                    />
                  ))}
                </ul>
              </nav>
            </Dialog.Description>
          </MotionContent>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  )
}
