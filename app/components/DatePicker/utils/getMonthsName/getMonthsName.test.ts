import { describe, expect, test } from "vitest"
import { getMonthsName } from "./getMonthsName"

describe("getMonthsName", () => {
  test("should returns months names with given locale and format", () => {
    expect(getMonthsName("fr-FR")).toStrictEqual([
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ])
    expect(getMonthsName("en-GB")).toStrictEqual([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ])
  })
})
