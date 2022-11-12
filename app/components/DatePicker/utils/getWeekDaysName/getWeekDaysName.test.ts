import { describe, expect, test } from "vitest"
import { getWeekDaysName } from "./getWeekDaysName"

describe("getMonthsName", () => {
  test("should returns months names with given locale and format", () => {
    expect(getWeekDaysName("fr-FR")).toStrictEqual([
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
      "dimanche",
    ])
    expect(getWeekDaysName("en-GB")).toStrictEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  })
})
