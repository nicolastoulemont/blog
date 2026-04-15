export type CategoryColor =
  | 'blue'
  | 'cyan'
  | 'gray'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'yellow'

export type CategoryName =
  | 'Animations'
  | 'Architecture'
  | 'Career'
  | 'Data Structures'
  | 'General'
  | 'GraphQL'
  | 'React'

export const CATEGORY_COLOR_REGISTRY: Record<CategoryName, CategoryColor> = {
  'Data Structures': 'cyan',
  React: 'red',
  Animations: 'orange',
  GraphQL: 'pink',
  Career: 'blue',
  Architecture: 'purple',
  General: 'green',
}

export const CATEGORY_COLOR_VARIANTS: Record<
  CategoryColor,
  {
    bg: string
    hoverBg: string
    text: string
    hoverText: string
    stroke: string
    border: string
  }
> = {
  cyan: {
    bg: 'bg-cyan-200/70 dark:bg-cyan-300/15',
    hoverBg: 'hover:bg-cyan-200 dark:hover:bg-cyan-300/20',
    text: 'text-cyan-950 dark:text-cyan-100',
    hoverText: 'hover:text-cyan-950 dark:hover:text-cyan-100',
    stroke: 'stroke-cyan-950 dark:stroke-cyan-100',
    border: 'border-cyan-300/70 dark:border-cyan-300/30',
  },
  red: {
    bg: 'bg-rose-200/70 dark:bg-rose-300/15',
    hoverBg: 'hover:bg-rose-200 dark:hover:bg-rose-300/20',
    text: 'text-rose-950 dark:text-rose-100',
    hoverText: 'hover:text-rose-950 dark:hover:text-rose-100',
    stroke: 'stroke-rose-950 dark:stroke-rose-100',
    border: 'border-rose-300/70 dark:border-rose-300/30',
  },
  orange: {
    bg: 'bg-orange-200/70 dark:bg-orange-300/15',
    hoverBg: 'hover:bg-orange-200 dark:hover:bg-orange-300/20',
    text: 'text-orange-950 dark:text-orange-100',
    hoverText: 'hover:text-orange-950 dark:hover:text-orange-100',
    stroke: 'stroke-orange-950 dark:stroke-orange-100',
    border: 'border-orange-300/70 dark:border-orange-300/30',
  },
  yellow: {
    bg: 'bg-yellow-200/70 dark:bg-yellow-300/15',
    hoverBg: 'hover:bg-yellow-200 dark:hover:bg-yellow-300/20',
    text: 'text-yellow-950 dark:text-yellow-100',
    hoverText: 'hover:text-yellow-950 dark:hover:text-yellow-100',
    stroke: 'stroke-yellow-950 dark:stroke-yellow-100',
    border: 'border-yellow-300/70 dark:border-yellow-300/30',
  },
  pink: {
    bg: 'bg-pink-200/70 dark:bg-pink-300/15',
    hoverBg: 'hover:bg-pink-200 dark:hover:bg-pink-300/20',
    text: 'text-pink-950 dark:text-pink-100',
    hoverText: 'hover:text-pink-950 dark:hover:text-pink-100',
    stroke: 'stroke-pink-950 dark:stroke-pink-100',
    border: 'border-pink-300/70 dark:border-pink-300/30',
  },
  blue: {
    bg: 'bg-sky-200/70 dark:bg-sky-300/15',
    hoverBg: 'hover:bg-sky-200 dark:hover:bg-sky-300/20',
    text: 'text-sky-950 dark:text-sky-100',
    hoverText: 'hover:text-sky-950 dark:hover:text-sky-100',
    stroke: 'stroke-sky-950 dark:stroke-sky-100',
    border: 'border-sky-300/70 dark:border-sky-300/30',
  },
  purple: {
    bg: 'bg-violet-200/70 dark:bg-violet-300/15',
    hoverBg: 'hover:bg-violet-200 dark:hover:bg-violet-300/20',
    text: 'text-violet-950 dark:text-violet-100',
    hoverText: 'hover:text-violet-950 dark:hover:text-violet-100',
    stroke: 'stroke-violet-950 dark:stroke-violet-100',
    border: 'border-violet-300/70 dark:border-violet-300/30',
  },
  green: {
    bg: 'bg-emerald-200/70 dark:bg-emerald-300/15',
    hoverBg: 'hover:bg-emerald-200 dark:hover:bg-emerald-300/20',
    text: 'text-emerald-950 dark:text-emerald-100',
    hoverText: 'hover:text-emerald-950 dark:hover:text-emerald-100',
    stroke: 'stroke-emerald-950 dark:stroke-emerald-100',
    border: 'border-emerald-300/70 dark:border-emerald-300/30',
  },
  gray: {
    bg: 'bg-slate-200/80 dark:bg-slate-200/10',
    hoverBg: 'hover:bg-slate-200 dark:hover:bg-slate-200/20',
    text: 'text-slate-900 dark:text-slate-100',
    hoverText: 'hover:text-slate-900 dark:hover:text-slate-100',
    stroke: 'stroke-slate-900 dark:stroke-slate-100',
    border: 'border-slate-300/70 dark:border-slate-400/20',
  },
}
