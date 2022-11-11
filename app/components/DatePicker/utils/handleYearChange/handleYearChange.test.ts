import { describe, expect, test } from "vitest"
import { handleYearChange } from "./handleYearChange"

describe("handleYearChange", () => {
  test("should handle bisextil year change conflicts", () => {
    const dateWithConflict = handleYearChange(new Date(2020, 1, 29), 2021)

    expect(dateWithConflict).toStrictEqual(new Date(2021, 1, 28))

    const dateWithoutConflict = handleYearChange(new Date(2022, 0, 28), 2021)

    expect(dateWithoutConflict).toStrictEqual(new Date(2021, 0, 28))
  })
})
