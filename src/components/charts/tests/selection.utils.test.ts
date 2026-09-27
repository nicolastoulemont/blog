import { describe, expect, it } from 'vitest'
import { select, settle, view, type Mark, type States } from '../selection.utils'

// A mark per key, colored after it.
function marks(...keys: string[]): Mark[] {
  return keys.map((key) => ({ key, label: key, color: key, pattern: key, fill: key }))
}

describe('selection', () => {
  const none: States = new Map()

  it('lets a hidden mark leave before it hides', () => {
    const states = select(none, 'css', { visible: false, still: false })
    expect(states.get('css')).toBe('leaving')
    expect(settle(states).get('css')).toBe('hidden')
  })

  it('hides at once when motion is reduced', () => {
    expect(select(none, 'css', { visible: false, still: true }).get('css')).toBe('hidden')
  })

  it('shows a mark again from any state', () => {
    const hidden: States = new Map([['css', 'hidden']])
    expect(select(hidden, 'css', { visible: true, still: false }).has('css')).toBe(false)
  })

  it('lists only the marks that show', () => {
    const states: States = new Map([
      ['b', 'leaving'],
      ['c', 'hidden'],
    ])
    expect(view(marks('a', 'b', 'c'), states).shown.map(({ key }) => key)).toEqual(['a'])
  })
})
