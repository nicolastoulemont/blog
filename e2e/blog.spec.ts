import { expect, test } from '@playwright/test'

test('homepage combines search, topic filters and keyboard shortcuts', async ({
  page,
}) => {
  await page.goto('/')
  const grid = page.locator('[data-post-search]')
  await expect(page.getByRole('link', { name: 'The Tree', exact: true })).toHaveCount(1)
  await expect(
    grid.getByRole('link', { name: /Reconversion dans une carrière/ }),
  ).toHaveCount(0)
  await expect(page.getByRole('searchbox')).toBeVisible()
  await page.keyboard.press('/')
  await expect(page.getByRole('searchbox')).toBeFocused()
  await page.getByRole('searchbox').fill('graphql')
  await expect(
    grid.getByRole('link', { name: 'GraphQL Typeguards', exact: true }),
  ).toBeVisible()
  await expect(grid.getByRole('link', { name: 'The Tree', exact: true })).toBeHidden()
  await page.getByRole('button', { name: 'React', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('0 posts found.')
  await page.getByRole('button', { name: 'All', exact: true }).click()
  await page.getByRole('searchbox').fill('no such post')
  await expect(page.getByText('No posts match no such post.')).toBeVisible()
  await page.getByRole('searchbox').fill('  FRANCAIS  ')
  await expect(
    grid.getByRole('link', { name: /Reconversion dans une carrière/ }),
  ).toHaveCount(0)
  await expect(page.getByRole('status')).toHaveText('0 posts found.')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await expect(page.getByRole('searchbox')).not.toBeFocused()
  await page.getByRole('button', { name: 'Data Structures', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('4 posts found.')
  await expect(grid.getByRole('link', { name: 'The Tree', exact: true })).toHaveCount(0)
  await expect(
    grid.getByRole('link', { name: 'GraphQL Typeguards', exact: true }),
  ).toBeHidden()
})

test('posts remain readable and navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('searchbox')).toBeHidden()
  await page.getByRole('link', { name: /GraphQL Typeguards/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'GraphQL Typeguards',
  )
  await context.close()
})

test('accordion demo becomes interactive when scrolled into view', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page
    .getByRole('link', { name: 'The compound component pattern', exact: true })
    .click()
  const toggle = page.getByRole('button', { name: 'Other posts that might interest you' })
  await toggle.scrollIntoViewIfNeeded()
  await page
    .locator('astro-island[ssr]')
    .filter({ has: toggle })
    .waitFor({ state: 'detached' })
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(
    page.getByRole('link', { name: /How to build a datepicker/ }).first(),
  ).toBeVisible()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(errors).toEqual([])
})

for (const width of [1280, 390]) {
  test(`datepicker hydrates and selects a date at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.setViewportSize({ width, height: 800 })
    await page.clock.setFixedTime(new Date('2030-06-15T12:00:00Z'))
    if (width === 390) {
      await page.goto('/')
      await page
        .getByRole('link', {
          name: 'How to build a datepicker from scratch',
          exact: true,
        })
        .click()
    } else {
      await page.goto('/blog/2022/how-to-build-datepicker')
    }
    const input = page.getByLabel('Your birthday', { exact: true })
    await input.scrollIntoViewIfNeeded()
    await page
      .locator('astro-island[ssr]')
      .filter({ has: input })
      .waitFor({ state: 'detached' })
    await expect(input).toHaveValue('')
    await input.click()
    await page.getByRole('button', { name: '6/20/2030', exact: true }).click()
    await expect(input).toHaveValue('Thursday, 20 June 2030')
    expect(errors).toEqual([])
  })
}

test('english posts render at cleaned urls', async ({ page }) => {
  await page.goto('/blog/2022/how-to-build-datepicker')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'How to build a datepicker from scratch',
  )
  await expect(
    page.locator('.rail').getByRole('heading', { name: 'On this page' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: /More on/ })).toBeVisible()
})

test('fenced code keeps syntax highlighting styles', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const code = page.locator('pre').first().locator('code')

  await expect(code).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(code).toHaveCSS('padding', '0px')
})

test('table of contents labels and tracks the active section', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const links = page.locator('.rail [data-toc-link]')
  const labels = (await links.allTextContents()).map((label) => label.trim())

  expect(labels).toHaveLength(11)
  expect(labels).not.toContain('Top')
  expect(labels).toContain('What is a Tree ?')
  expect(labels.every((label) => !label.endsWith('#'))).toBe(true)

  await page.evaluate(() => {
    const heading = document.getElementById('get-method')
    if (!(heading instanceof HTMLElement)) throw new Error('Get method heading not found')

    window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 40)
  })

  await expect(
    page.locator('.rail').getByRole('link', { name: 'Get method', exact: true }),
  ).toHaveClass(/is-active/)
})

for (const width of [390, 768, 1024, 1280]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`pages fit at ${width}px in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.emulateMedia({ colorScheme: theme })
      for (const path of [
        '/',
        '/blog/2022/the-tree',
        '/fr/blog/2021/retraining-web-development-online',
      ]) {
        await page.goto(path)
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
        ).toBe(0)
      }
    })
  }
}

test('mobile contents opens and closes natively', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/blog/2022/the-tree')
  const details = page.locator('details')
  await details.getByText('On this page', { exact: true }).first().click()
  await expect(details).toHaveAttribute('open', '')
  await expect(
    details.getByRole('link', { name: 'Get method', exact: true }),
  ).toBeVisible()
  await details.locator('summary').click()
  await expect(details).not.toHaveAttribute('open')
})

test('hero metadata, adjacent posts and copy use the article content', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/blog/2022/the-tree')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Tree')
  await expect(page.locator('.meta-row')).toContainText('Dec 23, 2022')
  await expect(page.locator('.meta-row')).toContainText('Reading time')
  await expect(
    page.getByRole('navigation', { name: 'Adjacent posts' }).getByRole('link').first(),
  ).toHaveAttribute('href', '/blog/2022/compound-component-pattern')
  const code = page.locator('pre code').first()
  const expected = await code.textContent()
  await page.getByRole('button', { name: 'Copy', exact: true }).first().click()
  await expect(
    page.getByRole('button', { name: 'Copy', exact: true }).first(),
  ).toHaveText('Copied')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected)
})

test('related posts show the full vertical list', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const section = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'More on Data Structures' }),
  })
  const cards = section.locator(':scope > div > a')

  await expect(cards).toHaveCount(4)

  const positions = await cards.evaluateAll((elements) => {
    return elements.map((element) => {
      const { x, y } = element.getBoundingClientRect()
      return { x, y }
    })
  })

  expect(positions.every(({ x }) => x === positions[0]?.x)).toBe(true)
  expect(
    positions.every(({ y }, index) => index === 0 || y > positions[index - 1].y),
  ).toBe(true)
})

test('french posts render at localized urls', async ({ page }) => {
  await page.goto('/fr/blog/2021/retraining-web-development-online')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Reconversion dans une carrière de développeur web',
  )
  await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute(
    'href',
    '/blog/2021/retraining-web-development-online',
  )
})

test('legacy locale-prefixed english urls redirect', async ({ page }) => {
  await page.goto('/blog/en/2022/the-tree')
  await expect(page).toHaveURL(/\/blog\/2022\/the-tree\/?$/)
})
