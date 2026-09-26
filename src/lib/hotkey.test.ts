import { describe, expect, it } from 'vitest'
import { isHotkey } from './hotkey'

function keys(overrides: Partial<Parameters<typeof isHotkey>[0]> = {}) {
  return {
    key: 'k',
    metaKey: true,
    ctrlKey: false,
    altKey: false,
    isComposing: false,
    repeat: false,
    ...overrides,
  }
}

describe('isHotkey', () => {
  it.each([
    ['Cmd+K', keys()],
    ['Ctrl+K', keys({ metaKey: false, ctrlKey: true })],
    ['Cmd+Shift+K', keys({ key: 'K' })],
  ])('matches Mod+K on %s', (_, event) => {
    expect(isHotkey(event, 'Mod+K')).toBe(true)
  })

  it.each([
    ['K alone', keys({ metaKey: false })],
    ['another key', keys({ key: 'j' })],
    ['Cmd+Alt+K', keys({ altKey: true })],
    ['a held key', keys({ repeat: true })],
    ['IME composition', keys({ isComposing: true })],
  ])('ignores %s', (_, event) => {
    expect(isHotkey(event, 'Mod+K')).toBe(false)
  })
})
