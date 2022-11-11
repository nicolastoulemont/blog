import { useMemo, useState } from "react"
import { useTableOfContent } from "./useTableOfContent"
import type { TableOfContentProps } from "./types"
import { TableOfContentLink } from "./Link"
import { FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Dialog } from "@headlessui/react"

const MotionPanel = motion(Dialog.Panel)

const variants: Variants = {
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
    <>
      <button
        className="fixed bottom-10 right-3 flex rounded-full bg-blue-500 p-3 shadow-lg lg:hidden"
        onClick={() => setOpen(true)}
      >
        <FiMenu color="white" aria-label="open menu" />
      </button>
      <AnimatePresence>
        {open && (
          <Dialog static as={motion.div} open={open} onClose={() => setOpen(false)}>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
              className="fixed inset-0 h-screen w-screen bg-gray-800"
            />
            <MotionPanel
              key="content"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 block w-full rounded-t-xl bg-white"
            >
              <div className="flex w-full justify-end">
                <button className="flex h-[35px] w-[35px] items-center justify-center" onClick={() => setOpen(false)}>
                  <FiX size="1.5rem" className="stroke-slate-700" aria-label="close menu" />
                </button>
              </div>
              <Dialog.Description>
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
            </MotionPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
