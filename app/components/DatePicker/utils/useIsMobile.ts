import { useWindowSize } from "react-use"

export function useIsMobile() {
  const { width } = useWindowSize()
  // Match tailwind sm breakpoint
  return width < 640
}
