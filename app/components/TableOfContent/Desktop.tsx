import { useMemo } from 'react'
import { useTableOfContent } from './useTableOfContent'
import { clsx } from 'clsx'
import type { TableOfContentProps } from './types'
import { Link } from '@remix-run/react'
import { CATEGORY_COLOR_VARIANTS } from '~/utils/styles'
import { TableOfContentLinkProps } from './types'

export function DesktopTableOfContent({
  elements = [],
  activeColor,
}: TableOfContentProps) {
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const { currentActiveIndex } = useTableOfContent({ elementIds })

  return (
    <aside className="fixed right-0 top-20 hidden w-auto rounded-lg p-6 md:max-w-[280px] lg:block lg:pr-3">
      <h2 className="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
        On this page
      </h2>
      <nav className="max-h-[80vh] overflow-scroll">
        <ul>
          {elements.map((element, index) => (
            <DesktopLink
              key={`${element.content}${element.id}${index}`}
              element={element}
              activeColor={activeColor}
              isActive={currentActiveIndex === index}
              isFirst={index === 0}
            />
          ))}
        </ul>
      </nav>
    </aside>
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

export function DesktopLink({
  element,
  activeColor,
  isActive,
  isFirst,
}: TableOfContentLinkProps) {
  const { bg, text, hoverBg, hoverText } = CATEGORY_COLOR_VARIANTS[activeColor]

  return (
    <li className={clsx('ml- my-3 flex list-disc', spacings[element.type])}>
      <Link
        className={clsx(
          'w-full rounded-md p-2 text-xs font-normal text-gray-700 dark:text-white',
          isActive && `${bg} ${text}`,
          hoverBg,
          hoverText
        )}
        to={`#${element.id}`}
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
