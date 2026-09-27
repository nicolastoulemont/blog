import { useId } from 'react'
import * as Recharts from 'recharts'
import { Tooltip } from './Tooltip'
import type { Unit } from './contracts.utils'
import { format } from './format.utils'
import type { Mark } from './selection.utils'

// Marks take colors in a fixed order, so a series keeps its color across charts.
// The props parsers cap the count at the palette's size.
export function useMarks(labels: Record<string, string>): Mark[] {
  // useId is unique per chart, but not safe inside url(#id) as is.
  const id = useId().replace(/[^\w-]/g, '')
  return Object.entries(labels).map(([key, label], order) => ({
    key,
    label,
    color: `var(--chart-${order + 1})`,
    pattern: `${id}-${order}`,
    fill: `url(#${id}-${order})`,
  }))
}

export const tick = { fontSize: '0.65rem' }

interface AxesProps {
  index: string
  unit?: Unit
  marks: Mark[]
  // What marks the hovered row: a rule for lines and areas, a band for bars.
  cursor: 'rule' | 'band'
}

// The dotted grid, axes and tooltip shared by the area, bar and line charts.
export function Axes({ index, unit, marks, cursor }: AxesProps) {
  return (
    <>
      <Recharts.CartesianGrid
        vertical={false}
        stroke="var(--line)"
        strokeDasharray="1 3"
      />
      <Recharts.XAxis
        dataKey={index}
        tick={tick}
        tickLine={false}
        stroke="var(--line-strong)"
      />
      <Recharts.YAxis
        tick={tick}
        tickLine={false}
        tickFormatter={(value: number) => format(value, unit)}
        axisLine={false}
        width="auto"
      />
      <Recharts.Tooltip
        content={<Tooltip marks={marks} unit={unit} />}
        cursor={
          cursor === 'rule'
            ? { stroke: 'var(--line-strong)' }
            : { fill: 'var(--panel-2)' }
        }
      />
    </>
  )
}

// The reading progress bar's dither, as one SVG pattern per mark: 2px dots on
// a 3px diagonal grid. Odd marks take the other diagonal, so two overlapping
// fills interleave.
export function Dithers({ marks }: { marks: Mark[] }) {
  return (
    <defs>
      {marks.map(({ pattern, color }, order) => (
        <pattern
          key={pattern}
          id={pattern}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d={order % 2 ? 'M3 0h2v2H3zM0 3h2v2H0z' : 'M0 0h2v2H0zM3 3h2v2H3z'}
            fill={color}
          />
        </pattern>
      ))}
    </defs>
  )
}

interface DotProps {
  cx?: number
  cy?: number
  fill?: string
}

// The blog's ▪ bullet as the hovered point, ringed with the panel color.
export function Square({ cx = 0, cy = 0, fill }: DotProps) {
  return (
    <rect
      x={cx - 4}
      y={cy - 4}
      width="8"
      height="8"
      fill={fill}
      stroke="var(--panel)"
      strokeWidth="2"
    />
  )
}
