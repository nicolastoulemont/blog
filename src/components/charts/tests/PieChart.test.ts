import type { PieSectorDataItem } from 'recharts'
import { describe, expect, it } from 'vitest'
import { sweep } from '../PieChart'

function slice(startAngle: number, endAngle: number, paddingAngle: number) {
  return { startAngle, endAngle, paddingAngle } as PieSectorDataItem
}

describe('sweep', () => {
  it('eases a closing slice’s gap along with its angle', () => {
    // The second slice closes: its gap goes from 2° to 0°, its span from 90° to 0°.
    const items = [
      { status: 'matched', prev: slice(0, 180, 0), next: slice(0, 270, 0) },
      { status: 'matched', prev: slice(182, 272, 2), next: slice(270, 270, 0) },
    ] as const
    const [, closing] = sweep(items, 0.5, 'centric' as never)
    expect(closing.startAngle).toBe(225 + 1)
    expect(closing.endAngle).toBe(225 + 1 + 45)
  })

  it('draws nothing before Recharts has sectors', () => {
    expect(sweep(null, 0.5, 'centric' as never)).toEqual([])
  })
})
