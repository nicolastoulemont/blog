import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [width, setWidth] = useState(() => {
    return typeof window === 'undefined' ? 1024 : window.innerWidth
  })

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width < 640
}
