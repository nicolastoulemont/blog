import type { CategoryNames, ColorNames } from './categories.types'

export const CATEGORY_COLOR_REGISTRY: Record<CategoryNames, ColorNames> = {
  'Data Structures': 'cyan',
  React: 'red',
  Animations: 'orange',
  GraphQL: 'pink',
  Career: 'blue',
  Architecture: 'purple',
  General: 'green',
}

export const CATEGORY_COLOR_VARIANTS = {
  cyan: {
    bg: 'bg-cyan-200 dark:bg-cyan-200/20',
    hoverBg: 'hover:bg-cyan-200 dark:hover:bg-cyan-200/20',
    text: 'text-cyan-900 dark:text-cyan-200',
    hoverText: 'hover:text-cyan-900 dark:hover:text-cyan-200',
    stroke: 'stroke-cyan-900 dark:stroke-cyan-200',
  },
  red: {
    bg: 'bg-red-200 dark:bg-red-200/20',
    hoverBg: 'hover:bg-red-200 dark:hover:bg-red-200/20',
    text: 'text-red-900 dark:text-red-200',
    hoverText: 'hover:text-red-900 dark:hover:text-red-200',
    stroke: 'stroke-red-900 dark:stroke-red-200',
  },
  orange: {
    bg: 'bg-orange-200 dark:bg-orange-200/20',
    hoverBg: 'hover:bg-orange-200 dark:hover:bg-orange-200/20',
    text: 'text-orange-900 dark:text-orange-200',
    hoverText: 'hover:text-orange-900 dark:hover:text-orange-200',
    stroke: 'stroke-orange-900 dark:stroke-orange-200',
  },
  yellow: {
    bg: 'bg-yellow-200 dark:bg-yellow-200/20',
    hoverBg: 'hover:bg-yellow-200 dark:hover:bg-yellow-200/20',
    text: 'text-yellow-900 dark:text-yellow-200',
    hoverText: 'hover:text-yellow-900 dark:hover:text-yellow-200',
    stroke: 'stroke-yellow-900 dark:stroke-yellow-200',
  },
  pink: {
    bg: 'bg-pink-200 dark:bg-pink-200/20',
    hoverBg: 'hover:bg-pink-200 dark:hover:bg-pink-200/20',
    text: 'text-pink-900 dark:text-pink-200',
    hoverText: 'hover:text-pink-900 dark:hover:text-pink-200',
    stroke: 'stroke-pink-900 dark:stroke-pink-200',
  },
  blue: {
    bg: 'bg-blue-200 dark:bg-blue-200/20',
    hoverBg: 'hover:bg-blue-200 dark:hover:bg-blue-200/20',
    text: 'text-blue-900 dark:text-blue-200',
    hoverText: 'hover:text-blue-900 dark:hover:text-blue-200',
    stroke: 'stroke-blue-900 dark:stroke-blue-200',
  },
  purple: {
    bg: 'bg-purple-200 dark:bg-purple-200/20',
    hoverBg: 'hover:bg-purple-200 dark:hover:bg-purple-200/20',
    text: 'text-purple-900 dark:text-purple-200',
    hoverText: 'hover:text-purple-900 dark:hover:text-purple-200',
    stroke: 'stroke-purple-900 dark:stroke-purple-200',
  },
  green: {
    bg: 'bg-green-200 dark:bg-green-200/20',
    hoverBg: 'hover:bg-green-200 dark:hover:bg-green-200/20',
    text: 'text-green-900 dark:text-green-200',
    hoverText: 'hover:text-green-900 dark:hover:text-green-200',
    stroke: 'stroke-green-900 dark:stroke-green-200',
  },
  gray: {
    bg: 'bg-gray-100 dark:bg-gray-100/20',
    hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-100/20',
    text: 'text-gray-900 dark:text-gray-200',
    hoverText: 'hover:text-gray-900 dark:hover:text-gray-200',
    stroke: 'stroke-gray-900 dark:stroke-gray-200',
  },
} as const
