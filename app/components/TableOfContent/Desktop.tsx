import { useMemo } from "react"
import { useTableOfContent } from "./useTableOfContent"

import type { TableOfContentProps } from "./types"
import { TableOfContentLink } from "./Link"

export function DesktopTableOfContent({ elements = [], activeColor }: TableOfContentProps) {
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const { currentActiveIndex } = useTableOfContent({ elementIds })

  return (
    <aside className="fixed top-20 right-0 hidden w-auto rounded-lg p-6 md:max-w-[300px] lg:block lg:pr-3 2xl:pr-6">
      <p className="mb-2 dark:text-white">On this page</p>
      <nav className="max-h-[80vh] overflow-scroll">
        <ul>
          {elements.map((element, index) => (
            <TableOfContentLink
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
