// Mod is Cmd on macOS and Ctrl elsewhere.
export type Hotkey = `Mod+${string}`

type Keys = Pick<
  KeyboardEvent,
  'key' | 'metaKey' | 'ctrlKey' | 'altKey' | 'isComposing' | 'repeat'
>

// Accepts Cmd or Ctrl, with or without Shift. Ignores Alt, held keys, and IME composition.
export function isHotkey(event: Keys, hotkey: Hotkey) {
  return (
    event.key.toLowerCase() === hotkey.slice('Mod+'.length).toLowerCase() &&
    (event.metaKey || event.ctrlKey) &&
    !event.altKey &&
    !event.isComposing &&
    !event.repeat
  )
}
