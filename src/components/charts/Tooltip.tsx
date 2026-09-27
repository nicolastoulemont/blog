import type { CSSProperties } from 'react'
import type { TooltipContentProps } from 'recharts'
import { type Point } from './animation.utils'
import { type Unit } from './contracts.utils'
import { format } from './format.utils'
import { type Mark } from './selection.utils'

type TooltipProps = Partial<TooltipContentProps> & { unit?: Unit }

// The hovered row: its index label, then one line per series. Recharts reports
// each series by its dataKey, which is the mark's key.
export function Tooltip({
  active,
  payload,
  label,
  marks,
  unit,
}: TooltipProps & { marks: Mark[] }) {
  if (!active || !payload?.length) return null
  const colors = new Map(marks.map(({ key, color }) => [key, color]))
  return (
    <div className="chart-tooltip">
      <p>{label}</p>
      <dl>
        {payload.map((entry) => {
          const color = colors.get(String(entry.dataKey))
          // A series still leaving the plot is no longer in `marks`.
          if (!color) return null
          return (
            <Value
              key={String(entry.dataKey)}
              name={String(entry.name)}
              color={color}
              value={format(Number(entry.value), unit)}
            />
          )
        })}
      </dl>
    </div>
  )
}

// The hovered value of a pie or radial chart, read off the point useValues made.
export function ValueTooltip({ active, payload, unit }: TooltipProps) {
  const [entry] = payload ?? []
  if (!active || !entry) return null
  return <PointTooltip point={entry.payload as Point} unit={unit} />
}

export function PointTooltip({ point, unit }: { point: Point; unit?: Unit }) {
  return (
    <div className="chart-tooltip">
      <dl>
        <Value name={point.name} color={point.stroke} value={format(point.value, unit)} />
      </dl>
    </div>
  )
}

function Value({ name, color, value }: { name: string; color?: string; value: string }) {
  return (
    <div className="contents">
      <dt className="tag" style={{ '--cat': color } as CSSProperties}>
        {name}
      </dt>
      <dd>{value}</dd>
    </div>
  )
}
