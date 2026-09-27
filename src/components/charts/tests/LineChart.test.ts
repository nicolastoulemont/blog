import { describe, expect, it } from 'vitest'
import { lineRows as rows } from '../LineChart'
import { view, type Mark, type States } from '../selection.utils'

function marks(...keys: string[]): Mark[] {
  return keys.map((key) => ({ key, label: key, color: key, pattern: key, fill: key }))
}

// lineRows is generic over the index and series keys, which tests spell out.
const lineRows = rows<'release', 'mobile' | 'desktop'>

const data = [
  { release: '1.0', mobile: 2900, desktop: 1400 },
  { release: '1.1', mobile: 2000, desktop: 700 },
]

describe('lineRows', () => {
  it('draws every line as is while all show', () => {
    expect(lineRows(data, view(marks('mobile', 'desktop'), new Map()))).toEqual(data)
  })

  it('scales a hidden line down to the shown lines, keeping its shape', () => {
    const hidden: States = new Map([['mobile', 'hidden']])
    const rows = lineRows(data, view(marks('mobile', 'desktop'), hidden))
    expect(rows.map((row) => row.mobile)).toEqual([1400, (2000 * 1400) / 2900])
    expect(rows.map((row) => row.desktop)).toEqual([1400, 700])
  })

  it('leaves a hidden line alone when it already fits', () => {
    const hidden: States = new Map([['desktop', 'hidden']])
    const rows = lineRows(data, view(marks('mobile', 'desktop'), hidden))
    expect(rows.map((row) => row.desktop)).toEqual([1400, 700])
  })
})
