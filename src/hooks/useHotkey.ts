import { useEffect, useEffectEvent } from 'react'
import { isHotkey, type Hotkey } from '~/lib/hotkey'

export function useHotkey(hotkey: Hotkey, handler: () => void) {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!isHotkey(event, hotkey)) return
    event.preventDefault()
    handler()
  })

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])
}
