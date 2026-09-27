// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { BarChart, PieChart } from '..'

afterEach(cleanup)

function bars(filterable = true) {
  return createElement(BarChart<'route', 'js' | 'css'>, {
    title: 'Bundle size',
    unit: 'kB',
    filterable,
    index: 'route',
    series: { js: 'JavaScript', css: 'CSS' },
    data: [{ route: '/blog', js: 38, css: 8 }],
  })
}

async function open(title: string) {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: `Filter ${title}` }))
  return user
}

describe('chart filter', () => {
  it('hides and shows a series', async () => {
    render(bars())
    const user = await open('Bundle size')
    const css = await screen.findByRole('menuitemcheckbox', { name: 'CSS' })

    await user.click(css)
    expect(css).toHaveProperty('ariaChecked', 'false')
    expect(screen.queryByRole('columnheader', { name: 'CSS' })).toBeNull()

    await user.click(css)
    expect(css).toHaveProperty('ariaChecked', 'true')
    expect(screen.getByRole('columnheader', { name: 'CSS' })).toBeTruthy()
  })

  it('keeps the last shown series', async () => {
    render(bars())
    const user = await open('Bundle size')
    await user.click(await screen.findByRole('menuitemcheckbox', { name: 'CSS' }))
    const js = screen.getByRole('menuitemcheckbox', { name: 'JavaScript' })

    expect(js).toHaveProperty('ariaDisabled', 'true')
    await user.click(js)
    expect(screen.getByRole('columnheader', { name: 'JavaScript' })).toBeTruthy()
  })

  it('hides a pie value', async () => {
    render(
      createElement(PieChart, {
        title: 'Readers',
        filterable: true,
        data: { Search: 48, Direct: 27 },
      }),
    )
    const user = await open('Readers')
    await user.click(await screen.findByRole('menuitemcheckbox', { name: 'Search' }))
    expect(screen.queryByRole('rowheader', { name: 'Search' })).toBeNull()
    expect(screen.getByRole('rowheader', { name: 'Direct' })).toBeTruthy()
  })

  it('stays out of charts that are not filterable', () => {
    render(bars(false))
    expect(screen.queryByRole('button', { name: /Filter/ })).toBeNull()
  })
})
