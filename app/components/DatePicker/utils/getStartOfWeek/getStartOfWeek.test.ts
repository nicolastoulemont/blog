import { describe, test, expect } from "vitest"
import { getStartOfWeek } from "./getStartOfWeek"

describe("getStartOfWeek", () => {
  test("should returns start of week", () => {
    const startOfWeek = getStartOfWeek(new Date(2021, 1, 5))

    expect(startOfWeek.getDay()).toBe(1)
  })
})
