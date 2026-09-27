import * as Recharts from 'recharts'
import type { PieProps } from 'recharts'
import { Dithers } from './Chart'
import { Figure, useValues } from './Figure'
import { ValueTooltip } from './Tooltip'
import { animation, slices } from './animation.utils'
import { parseValues, type ValuesProps } from './contracts.utils'

// Values that are parts of one whole.
export function PieChart(props: ValuesProps) {
  const chart = parseValues('PieChart', props)
  const { data, unit } = chart
  const { selection, frame } = useValues(chart)
  return (
    <Figure {...frame} shape="square">
      <Recharts.PieChart responsive style={{ height: '100%' }}>
        <Dithers marks={selection.marks} />
        <Recharts.Tooltip content={<ValueTooltip unit={unit} />} />
        <Recharts.Pie
          data={slices(selection, data)}
          dataKey="value"
          {...animation}
          animationInterpolateFn={sweep}
          innerRadius="55%"
          outerRadius="95%"
          strokeWidth={2}
          paddingAngle={2}
        />
      </Recharts.PieChart>
    </Figure>
  )
}

// Recharts eases each slice's angle but sets its padding at once, and a slice
// at zero gets none: a leaving slice's gap snapped shut on the first frame and
// a returning one's popped open. This eases the padding along with the angle.
export const sweep: NonNullable<PieProps['animationInterpolateFn']> = (items, time) => {
  if (items == null) return []
  const first = items.find((item) => item.status !== 'removed')
  let angle = first?.next.startAngle ?? 0
  return items.flatMap((item, index) => {
    if (item.status === 'removed') return []
    const { next } = item
    const prev = item.status === 'matched' ? item.prev : undefined
    const padding =
      index > 0 ? ease(prev?.paddingAngle ?? 0, next.paddingAngle ?? 0, time) : 0
    const span = ease(
      prev ? prev.endAngle - prev.startAngle : 0,
      next.endAngle - next.startAngle,
      time,
    )
    const slice = {
      ...next,
      startAngle: angle + padding,
      endAngle: angle + padding + span,
    }
    angle = slice.endAngle
    return [slice]
  })
}

function ease(from: number, to: number, time: number) {
  return from + (to - from) * time
}
