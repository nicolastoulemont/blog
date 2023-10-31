import { clsx } from 'clsx'
import { useMemo, useState } from 'react'
import { useTableOfContent } from './useTableOfContent'
import type { TableOfContentProps } from './types'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { useNavigate, Link } from '@remix-run/react'
import { CATEGORY_COLOR_VARIANTS } from '~/utils/styles'
import { TableOfContentLinkProps } from './types'

const MotionPanel = motion(Dialog.Panel)

const variants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
  },
}

export function MobileTableOfContent({ elements, activeColor }: TableOfContentProps) {
  const [open, setOpen] = useState(false)
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const { currentActiveIndex } = useTableOfContent({ elementIds })
  const navigate = useNavigate()

  return (
    <>
      <button
        className="fixed bottom-10 right-3 flex rounded-full bg-blue-500 p-3 shadow-lg dark:bg-blue-800 lg:hidden"
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
              className="fixed bottom-0 block w-full rounded-t-xl bg-white shadow-lg dark:bg-slate-900"
            >
              <div className="flex w-full justify-end p-3">
                <button
                  className="flex h-[35px] w-[35px] items-center justify-center"
                  onClick={() => setOpen(false)}
                >
                  <FiX
                    size="1.5rem"
                    className="stroke-slate-700 dark:stroke-white"
                    aria-label="close menu"
                  />
                </button>
              </div>
              <Dialog.Description>
                <nav className="max-h-[70vh] overflow-scroll px-6 pb-6 pt-2">
                  <h2 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
                    On this page
                  </h2>
                  <ul>
                    {elements.map((element, index) => (
                      <MobileLink
                        key={`${element.content}${element.id}${index}`}
                        element={element}
                        activeColor={activeColor}
                        isActive={currentActiveIndex === index}
                        isFirst={index === 0}
                        onClose={() => {
                          // Imperative navigation since the Dialog component
                          // mess up with the normal link based navigation
                          setTimeout(() => navigate(`#${element.id}`), 300)
                          setOpen(false)
                        }}
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

const spacings = {
  h1: 'ml-0',
  h2: 'ml-4',
  h3: 'ml-8',
  h4: 'ml-12',
  h5: 'ml-16',
  h6: 'ml-20',
} as const

export function MobileLink({
  element,
  activeColor,
  isActive,
  isFirst,
  onClose,
}: TableOfContentLinkProps) {
  const { bg, text, hoverBg, hoverText } = CATEGORY_COLOR_VARIANTS[activeColor]

  return (
    <li className={clsx('my-3 flex', spacings[element.type])}>
      <Link
        className={clsx(
          'w-full rounded-md p-2 text-sm font-normal text-gray-700 dark:text-white',
          isActive && `${bg} ${text}`,
          hoverBg,
          hoverText
        )}
        to={`#${element.id}`}
        onClick={onClose}
        style={{
          transitionTimingFunction: 'ease-in-out',
          transitionProperty: 'color, background-color',
          transitionDuration: '0.3s',
        }}
      >
        {isFirst ? 'Top' : element.content}
      </Link>
    </li>
  )
}
