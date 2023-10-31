import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { DatePicker } from '../DatePicker'

function Case({ initialDate = new Date(2022, 10, 1) }) {
  const [value, setValue] = useState<Date | undefined>(initialDate)

  return (
    <div className="flex flex-col">
      <div className="w-[300px]">
        <DatePicker
          label="Your birthday"
          placeholder="Pick a date"
          locale="en-GB"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="mt-6 h-[62px] w-[300px]">
        <h2 className="mb-2 text-sm font-medium">Inner value</h2>
        <p>{value ? value.toLocaleDateString() : ''}</p>
      </div>
      <div>
        <button
          className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white"
          onClick={() => setValue(undefined)}
        >
          Reset datepicker
        </button>
      </div>
    </div>
  )
}

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useReducedMotion: () => true,
}))

describe('DatePicker', () => {
  test('should be able to select a different year', async () => {
    render(<Case />)

    userEvent.click(screen.getByLabelText('Datepicker'))

    await waitFor(() => {
      expect(screen.getByLabelText('Current year: 2022, click to show years panel'))
    })

    userEvent.click(
      screen.getByLabelText('Current year: 2022, click to show years panel')
    )

    await waitFor(() => {
      expect(screen.getByText('2023')).toBeDefined()
    })

    userEvent.click(screen.getByText('2023'))

    await waitFor(() => {
      // @ts-expect-error toHaveValue type
      expect(screen.getByRole('textbox')).toHaveValue('Wednesday, 1 November 2023')
    })
  })
  test('should be able to select a different month', async () => {
    render(<Case />)

    userEvent.click(screen.getByLabelText('Datepicker'))

    await waitFor(() => {
      expect(screen.getByLabelText('Current month: November, click to show months panel'))
    })

    userEvent.click(
      screen.getByLabelText('Current month: November, click to show months panel')
    )

    await waitFor(() => {
      expect(screen.getByText('Dec')).toBeDefined()
    })

    userEvent.click(screen.getByText('Dec'))

    await waitFor(() => {
      // @ts-expect-error toHaveValue type
      expect(screen.getByRole('textbox')).toHaveValue('Thursday, 1 December 2022')
    })
  })
  test('should be able to handle date conflicts and bisextil years edge cases on year change', async () => {
    const bisextilDay = new Date(2020, 1, 29)

    render(<Case initialDate={bisextilDay} />)

    userEvent.click(screen.getByLabelText('Datepicker'))

    await waitFor(() => {
      expect(screen.getByLabelText('Current year: 2020, click to show years panel'))
    })

    userEvent.click(
      screen.getByLabelText('Current year: 2020, click to show years panel')
    )

    await waitFor(() => {
      expect(screen.getByText('2021')).toBeDefined()
    })

    userEvent.click(screen.getByText('2021'))

    await waitFor(() => {
      // @ts-expect-error toHaveValue type
      expect(screen.getByRole('textbox')).toHaveValue('Sunday, 28 February 2021')
    })
  })
  test('should be able to handle date conflicts and bisextil years edge cases on month change', async () => {
    render(<Case initialDate={new Date(2020, 2, 30)} />)

    userEvent.click(screen.getByLabelText('Datepicker'))

    await waitFor(() => {
      expect(screen.getByLabelText('Current month: March, click to show months panel'))
    })

    userEvent.click(
      screen.getByLabelText('Current month: March, click to show months panel')
    )

    await waitFor(() => {
      expect(screen.getByText('Feb')).toBeDefined()
    })

    userEvent.click(screen.getByText('Feb'))

    await waitFor(() => {
      // @ts-expect-error toHaveValue type
      expect(screen.getByRole('textbox')).toHaveValue('Saturday, 29 February 2020')
    })
  })
})
