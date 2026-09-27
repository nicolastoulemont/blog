import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useState, type PointerEvent } from 'react'
import { useHydrated } from '~/hooks/useHydrated'
import { Dithers } from './Chart'
import { Figure, useValues } from './Figure'
import { PointTooltip } from './Tooltip'
import { DURATION, points, type Point } from './animation.utils'
import { parseRings, type RingsProps } from './contracts.utils'
import { type Mark, type View } from './selection.utils'

// Recharts matches radial bars by index, so it cannot move the remaining rings
// into a hidden ring's place. This chart draws its rings itself and animates
// each one by name with Motion.

// The plot's viewBox: rings run from INNER out to OUTER, GAP apart.
const SIZE = 200
const OUTER = SIZE / 2 - 2
const INNER = OUTER * 0.3
const GAP = 3

// One ring per value, filled clockwise from the top.
export function RadialChart(props: RingsProps) {
  const chart = parseRings('RadialChart', props)
  const { data, unit, max } = chart
  const { selection, frame } = useValues(chart)
  const [hover, setHover] = useState<{ point: Point; x: number; y: number }>()
  const bands = layout(selection)
  const values = points(selection.marks, data)
  // Rings drawn while the chart hydrates are its first render: they sweep in at
  // full width. Rings added later open from where they will sit.
  const hydrated = useHydrated()
  return (
    <Figure {...frame} shape="square">
      <div className="relative h-full" onPointerLeave={() => setHover(undefined)}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full">
          <Dithers marks={selection.marks} />
          {selection.marks.map((mark, order) => {
            const band = bands.get(mark.key)
            if (!band) return null
            const point = values[order]
            const shown = !selection.leaving(mark.key)
            return (
              <Ring
                key={mark.key}
                mark={mark}
                band={band}
                origin={hydrated ? layout(selection, mark.key).get(mark.key)! : band}
                sweep={shown ? (point.value / max) * 360 : 0}
                onHover={(event) => {
                  const box = event.currentTarget.ownerSVGElement!.getBoundingClientRect()
                  setHover({
                    point,
                    x: event.clientX - box.left,
                    y: event.clientY - box.top,
                  })
                }}
              />
            )
          })}
        </svg>
        {hover && (
          <div
            className="pointer-events-none absolute"
            style={{ left: hover.x + 12, top: hover.y + 12 }}
          >
            <PointTooltip point={hover.point} unit={unit} />
          </div>
        )}
      </div>
    </Figure>
  )
}

interface Band {
  inner: number
  outer: number
}

// Each drawn ring's band, from the center out. The open rings share the space;
// a leaving ring, or the `closed` one, gets a zero-width band in the gap
// between its neighbours. A ring that opens or closes from there moves in step
// with the neighbours making or taking its room, so no two rings overlap.
export function layout({ marks, shown, hidden }: View, closed?: string) {
  const open = shown.filter(({ key }) => key !== closed)
  const width = (OUTER - INNER - GAP * (open.length - 1)) / open.length
  const bands = new Map<string, Band>()
  let radius = INNER
  for (const { key } of marks) {
    if (hidden(key)) continue
    if (open.some((mark) => mark.key === key)) {
      bands.set(key, { inner: radius, outer: radius + width })
      radius += width + GAP
    } else {
      const edge = Math.min(Math.max(radius - GAP / 2, INNER), OUTER)
      bands.set(key, { inner: edge, outer: edge })
    }
  }
  return bands
}

interface RingProps {
  mark: Mark
  band: Band
  // The band the ring starts from when it mounts.
  origin: Band
  sweep: number
  onHover: (event: PointerEvent<SVGGElement>) => void
}

// A ring sweeps in from the top when it mounts, opening from its origin band,
// and animates to every new band and sweep after that.
function Ring({ mark, band, origin, sweep, onHover }: RingProps) {
  const still = useReducedMotion()
  const inner = useMotionValue(origin.inner)
  const outer = useMotionValue(origin.outer)
  const angle = useMotionValue(0)

  useEffect(() => {
    const transition = { duration: still ? 0 : DURATION / 1000, ease: 'easeOut' } as const
    const animations = [
      animate(inner, band.inner, transition),
      animate(outer, band.outer, transition),
      animate(angle, sweep, transition),
    ]
    return () => animations.forEach((animation) => animation.stop())
  }, [inner, outer, angle, band.inner, band.outer, sweep, still])

  return (
    <g onPointerMove={onHover}>
      <motion.path d={useSector(inner, outer, 360)} fill="var(--panel-2)" />
      <motion.path
        d={useSector(inner, outer, angle)}
        fill={mark.fill}
        stroke={mark.color}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  )
}

function useSector(
  inner: MotionValue<number>,
  outer: MotionValue<number>,
  angle: MotionValue<number> | number,
) {
  // Motion re-runs the transform whenever a value read inside it changes.
  return useTransform(() =>
    sector(inner.get(), outer.get(), typeof angle === 'number' ? angle : angle.get()),
  )
}

// A ring sector from the top, `angle` degrees clockwise, as an SVG path.
export function sector(inner: number, outer: number, angle: number) {
  // A full turn would start and end on the same point, which SVG arcs skip.
  const turn = Math.min(angle, 359.99)
  if (turn <= 0 || outer <= inner) return ''
  const large = turn > 180 ? 1 : 0
  const [x0, y0] = at(outer, 0)
  const [x1, y1] = at(outer, turn)
  const [x2, y2] = at(inner, turn)
  const [x3, y3] = at(inner, 0)
  return [
    `M${x0} ${y0}`,
    `A${outer} ${outer} 0 ${large} 1 ${x1} ${y1}`,
    `L${x2} ${y2}`,
    `A${inner} ${inner} 0 ${large} 0 ${x3} ${y3}`,
    'Z',
  ].join(' ')
}

function at(radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180
  return [SIZE / 2 + radius * Math.cos(radians), SIZE / 2 + radius * Math.sin(radians)]
}
