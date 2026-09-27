import type { Mark, View } from './selection.utils'

// How charts animate a series out and back in. Recharts matches what it draws
// by index and rebuilds anything removed, so hidden series stay drawn at zero.

// How long a hidden mark takes to leave. Every chart animates on this clock,
// CSS fades included: Figure hands it to the stylesheet as --chart-duration.
export const DURATION = 400

// Every mark animates on the same clock, so exits and entries line up.
export const animation = {
  // Recharts pies wait 400ms by default.
  animationBegin: 0,
  animationDuration: DURATION,
  animationEasing: 'ease-out',
} as const

// A value as Recharts draws it in a pie or radial chart.
export interface Point {
  name: string
  value: number
  fill: string
  stroke: string
}

export function points(marks: Mark[], data: Record<string, number>): Point[] {
  return marks.map(({ key, fill, color }) => ({
    name: key,
    value: data[key],
    fill,
    stroke: color,
  }))
}

// The rows an area, bar or radar chart draws: every series, with the ones not
// shown at zero. Recharts animates a leaving series down to zero, and a
// returning one up from zero in its own place. A hidden series stays drawn at
// zero with no outline: removing it would make Recharts rebuild it on return,
// growing it from the axis instead of from its place in a stack.
export function drawnRows<R extends object>(data: readonly R[], selection: View): R[] {
  const absent = selection.marks.filter(({ key }) => !selection.shows(key))
  if (absent.length === 0) return [...data]
  return data.map((row) => ({
    ...row,
    ...Object.fromEntries(absent.map(({ key }) => [key, 0])),
  }))
}

// The slices a pie draws: every value, with the hidden ones at zero. Recharts
// matches slices by index, so removing one would restart the others' animation.
// A leaving slice keeps its outline while it closes; Recharts still strokes a
// slice at zero, so a hidden one drops it.
export function slices(selection: View, data: Record<string, number>): Point[] {
  return points(selection.marks, data).map((point) => {
    if (selection.hidden(point.name)) return { ...point, value: 0, stroke: 'none' }
    if (selection.leaving(point.name)) return { ...point, value: 0 }
    return point
  })
}
