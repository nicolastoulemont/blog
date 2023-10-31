import type { ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { DatePicker } from './DatePicker'

const metas: ComponentMeta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
}

export default metas

export const Default = ({}) => {
  const [value, setValue] = useState<Date | undefined>(new Date(2022, 10, 1))

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
