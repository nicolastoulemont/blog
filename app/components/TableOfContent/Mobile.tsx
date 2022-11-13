import { useMemo, useState } from "react"
import { useTableOfContent } from "./useTableOfContent"
import type { TableOfContentProps } from "./types"
import { FiMenu, FiX } from "react-icons/fi"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Dialog } from "@headlessui/react"
import { Link, useNavigate } from "@remix-run/react"
import { CATEGORY_COLOR_VARIANTS } from "~/utils/styles"
import { TableOfContentLinkProps } from "./types"

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
                      <MobileLink
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

const styles = {
  h1: {
    spacing: 0,
    size: "text-lg",
  },
  h2: {
    spacing: 0,
    size: "text-lg",
  },
  h3: {
    spacing: "0.5rem",
    size: "text-base",
  },
  h4: {
    spacing: "1rem",
    size: "text-sm",
  },
  h5: {
    spacing: "1.25rem",
    size: "text-xs",
  },
  h6: {
    spacing: "1.5rem",
    size: "text-[11px]",
  },
} as const

export function MobileLink({ element, activeColor, isActive, isFirst, onClose = () => {} }: TableOfContentLinkProps) {
  const { bg, text, hoverBg, hoverText } = CATEGORY_COLOR_VARIANTS[activeColor]
  const navigate = useNavigate()

  function handleClick() {
    // Headless UI Dialog prevent regular navigation with the link
    navigate(`#${element.id}`)
    onClose()
  }

  return (
    <li className="my-3 flex" style={{ marginLeft: styles[element.type].spacing }}>
      <Link
        className={`${styles[element.type].size} ${isActive ? `${bg} ${text}` : ""} 
        w-full rounded-md p-2 font-medium text-gray-700 dark:text-white ${hoverBg} ${hoverText}`}
        to={`#${element.id}`}
        onClick={handleClick}
        style={{
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "color, background-color",
          transitionDuration: "0.3s",
        }}
      >
        {isFirst ? "Top" : element.content}
      </Link>
    </li>
  )
}
