import * as Recharts from 'recharts'
import { Dithers, Square, tick } from './Chart'
import { Figure, useSeries } from './Figure'
import { Tooltip } from './Tooltip'
import { animation, drawnRows } from './animation.utils'
import { parseSeries, type SeriesProps } from './contracts.utils'

// `index` names the spokes.
export function RadarChart<I extends string, S extends string>(props: SeriesProps<I, S>) {
  const chart = parseSeries('RadarChart', props)
  const { data, index, unit } = chart
  const { selection, frame } = useSeries(chart)
  return (
    <Figure {...frame} shape="square">
      <Recharts.RadarChart
        data={drawnRows(data, selection)}
        responsive
        style={{ height: '100%' }}
        outerRadius="65%"
      >
        <Dithers marks={selection.marks} />
        <Recharts.PolarGrid stroke="var(--line)" strokeDasharray="1 3" />
        <Recharts.PolarAngleAxis dataKey={index} tick={tick} />
        <Recharts.Tooltip
          content={<Tooltip marks={selection.shown} unit={unit} />}
          cursor={false}
        />
        {selection.marks.map(({ key, label, color, fill }) => (
          <Recharts.Radar
            key={key}
            {...animation}
            dataKey={key}
            name={label}
            stroke={selection.hidden(key) ? 'none' : color}
            strokeWidth={2}
            fill={fill}
            fillOpacity={1}
            activeDot={selection.shows(key) ? Square : false}
          />
        ))}
      </Recharts.RadarChart>
    </Figure>
  )
}
