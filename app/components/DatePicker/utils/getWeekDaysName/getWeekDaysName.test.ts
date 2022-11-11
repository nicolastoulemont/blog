import { describe, expect, test } from "vitest"
import { getWeekDaysName } from "./getWeekDaysName"

describe("getMonthsName", () => {
  test("should returns months names with given locale and format", () => {
    expect(getWeekDaysName("fr-FR")).toStrictEqual({
      sun: "dimanche",
      mon: "lundi",
      tue: "mardi",
      wed: "mercredi",
      thu: "jeudi",
      fri: "vendredi",
      sat: "samedi",
    })
    expect(getWeekDaysName("en-GB")).toStrictEqual({
      sun: "Sunday",
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
    })
  })
})
