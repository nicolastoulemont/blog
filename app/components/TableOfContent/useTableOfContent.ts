import { useEffect, useRef, useState } from "react"

function getHTMLElements(elementIds: Array<string>): Array<HTMLElement> {
  return elementIds.map((elementId) => document.getElementById(elementId) as HTMLElement)
}

interface useTableOfContentProps {
  elementIds: Array<string>
  OFFSET_TOP?: number
}

export function useTableOfContent({ elementIds, OFFSET_TOP = 90 }: useTableOfContentProps) {
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    function updateActiveElement() {
      const pageHeight = document.body.scrollHeight
      const scrollPosition = window.scrollY + window.innerHeight
      const elements = getHTMLElements(elementIds)

      // If scrolled at the bottom, early return
      if (scrollPosition >= 0 && pageHeight - scrollPosition <= OFFSET_TOP) {
        setCurrentActiveIndex(elements.length - 1)
        return
      }

      let index = -1
      while (index < elements.length - 1) {
        console.log("here")
        const element = elements[index + 1]
        if (element) {
          const { top } = element.getBoundingClientRect()

          if (top >= OFFSET_TOP) {
            break
          }
          index += 1
        } else {
          console.log(elements)
          throw new Error("Invalid heading id in this page")
        }
      }

      setCurrentActiveIndex(Math.max(index, 0))
    }

    function throttledUpdateActiveElement() {
      if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null
          updateActiveElement()
        }, 100)
      }
    }

    document.addEventListener("scroll", throttledUpdateActiveElement)
    document.addEventListener("resize", throttledUpdateActiveElement)

    updateActiveElement()

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      document.removeEventListener("scroll", throttledUpdateActiveElement)
      document.removeEventListener("resize", throttledUpdateActiveElement)
    }
  }, [])

  return {
    currentActiveIndex,
  }
}
