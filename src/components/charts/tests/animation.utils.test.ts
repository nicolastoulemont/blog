import { describe, expect, it } from 'vitest'
import { drawnRows, slices } from '../animation.utils'
import { view, type Mark, type States } from '../selection.utils'

// A mark per key, colored after it.
function marks(...keys: string[]): Mark[] {
  return keys.map((key) => ({ key, label: key, color: key, pattern: key, fill: key }))
}

describe('drawn data', () => {
  const states: States = new Map([
    ['b', 'leaving'],
    ['c', 'hidden'],
  ])
  const selection = view(marks('a', 'b', 'c'), states)

  it('draws every series, with the ones not shown at zero', () => {
    expect(drawnRows([{ week: 'W1', a: 1, b: 2, c: 3 }], selection)).toEqual([
      { week: 'W1', a: 1, b: 0, c: 0 },
    ])
  })

  it('closes leaving slices with their outline and hidden ones without', () => {
    expect(slices(selection, { a: 1, b: 2, c: 3 })).toEqual([
      { name: 'a', value: 1, fill: 'a', stroke: 'a' },
      { name: 'b', value: 0, fill: 'b', stroke: 'b' },
      { name: 'c', value: 0, fill: 'c', stroke: 'none' },
    ])
  })
})
