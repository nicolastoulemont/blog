import { getMonthDays } from "./getMonthDays"

describe("getMonthDays", () => {
  test("should returns all month days for given date and enough days to display 6 weeks", () => {
    // Feb 2021 only has 26 days (4 weeks)
    const monthDays = getMonthDays(new Date(2021, 1, 2))

    expect(monthDays).toHaveLength(6)

    expect(monthDays[0][1]).toStrictEqual(new Date(2021, 1, 2))
    expect(monthDays[0][2]).toStrictEqual(new Date(2021, 1, 3))
    expect(monthDays[1][0]).toStrictEqual(new Date(2021, 1, 8))
    expect(monthDays[2][0]).toStrictEqual(new Date(2021, 1, 15))
    expect(monthDays[monthDays.length - 1][monthDays[0].length - 1]).toStrictEqual(new Date(2021, 2, 14))
  })
  test("should returns outside days for given month", () => {
    // April 2021 has outside days in the beginning and end of month
    const monthDays = getMonthDays(new Date(2021, 3, 2))

    expect(monthDays).toHaveLength(6)
    expect(monthDays[0][0]).toStrictEqual(new Date(2021, 2, 29))
    expect(monthDays[0][1]).toStrictEqual(new Date(2021, 2, 30))
    expect(monthDays[monthDays.length - 1][monthDays[0].length - 1]).toStrictEqual(new Date(2021, 4, 9))
  })
})
