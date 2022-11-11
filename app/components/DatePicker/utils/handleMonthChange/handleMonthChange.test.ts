import { describe, expect, test } from "vitest"
import { handleMonthChange } from "./handleMonthChange"

describe("handleMonthChange", () => {
  test("should handle conflicts due to the difference in number of days between months by returning the previous correct date in the calendar year", () => {
    const dateWithConflict = handleMonthChange(new Date(2022, 2, 30), 1)

    expect(dateWithConflict).toStrictEqual(new Date(2022, 1, 28))

    const dateWithoutConflict = handleMonthChange(new Date(2022, 1, 28), 2)

    expect(dateWithoutConflict).toStrictEqual(new Date(2022, 2, 28))
  })
  test("should handle conflicts due to a bisextil year", () => {
    const dateWithConflict = handleMonthChange(new Date(2020, 2, 30), 1)

    expect(dateWithConflict).toStrictEqual(new Date(2020, 1, 29))
  })
})
