import { describe, expect, test } from "vitest"
import { getMonthsName } from "./getMonthsName"

describe("getMonthsName", () => {
  test("should returns months names with given locale and format", () => {
    expect(getMonthsName("fr-FR")).toStrictEqual([
      { index: 0, name: "janvier" },
      { index: 1, name: "février" },
      { index: 2, name: "mars" },
      { index: 3, name: "avril" },
      { index: 4, name: "mai" },
      { index: 5, name: "juin" },
      { index: 6, name: "juillet" },
      { index: 7, name: "août" },
      { index: 8, name: "septembre" },
      { index: 9, name: "octobre" },
      { index: 10, name: "novembre" },
      { index: 11, name: "décembre" },
    ])
    expect(getMonthsName("en-GB")).toStrictEqual([
      { index: 0, name: "January" },
      { index: 1, name: "February" },
      { index: 2, name: "March" },
      { index: 3, name: "April" },
      { index: 4, name: "May" },
      { index: 5, name: "June" },
      { index: 6, name: "July" },
      { index: 7, name: "August" },
      { index: 8, name: "September" },
      { index: 9, name: "October" },
      { index: 10, name: "November" },
      { index: 11, name: "December" },
    ])
  })
})
