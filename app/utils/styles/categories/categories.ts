import type { CategoryNames, ColorNames } from "./categories.types"

export const CATEGORY_COLOR_REGISTRY: Record<CategoryNames, ColorNames> = {
  "Data Structures": "cyan",
  React: "red",
  Animations: "orange",
  GraphQL: "pink",
  Career: "blue",
  Architecture: "purple",
  General: "green",
}

export const CATEGORY_COLOR_VARIANTS = {
  cyan: {
    bg: "bg-cyan-200",
    text: "text-cyan-900",
    stroke: "stroke-cyan-900",
  },
  red: {
    bg: "bg-red-200",
    text: "text-red-900",
    stroke: "stroke-red-900",
  },
  orange: {
    bg: "bg-orange-200",
    text: "text-orange-900",
    stroke: "stroke-orange-900",
  },
  yellow: {
    bg: "bg-yellow-200",
    text: "text-yellow-900",
    stroke: "stroke-yellow-900",
  },
  pink: {
    bg: "bg-pink-200",
    text: "text-pink-900",
    stroke: "stroke-pink-900",
  },
  blue: {
    bg: "bg-blue-200",
    text: "text-blue-900",
    stroke: "stroke-blue-900",
  },
  purple: {
    bg: "bg-purple-200",
    text: "text-purple-900",
    stroke: "stroke-purple-900",
  },
  green: {
    bg: "bg-green-200",
    text: "text-green-900",
    stroke: "stroke-green-900",
  },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-900",
    stroke: "stroke-gray-900",
  },
} as const
