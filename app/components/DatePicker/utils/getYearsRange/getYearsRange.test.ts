import { describe, expect, test } from "vitest"
import { getYearsRange } from "./getYearsRange"

describe("getYearsRange", () => {
  test("should returns correct years range", () => {
    const range = getYearsRange(2000, 2010)

    expect(range).toStrictEqual([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010])
  })
})
