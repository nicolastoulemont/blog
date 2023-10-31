import { getEndOfWeek } from './getEndOfWeek'

describe('getEndOfWeek', () => {
  test('should returns end of the week', () => {
    const endOfWeek = getEndOfWeek(new Date(2021, 1, 1))

    expect(endOfWeek.getDay()).toBe(0)
  })
})
