import { expect, test } from '@playwright/test'

test('homepage combines search, topic filters and keyboard shortcuts', async ({
  page,
}) => {
  await page.goto('/')
  const grid = page.locator('[data-post-search]')
  await expect(page.getByRole('link', { name: 'The Tree', exact: true })).toHaveCount(1)
  await expect(page.getByRole('searchbox')).toBeVisible()
  await page.keyboard.press('/')
  await expect(page.getByRole('searchbox')).toBeFocused()
  await page.getByRole('searchbox').fill('graphql')
  await expect(
    grid.getByRole('link', { name: 'GraphQL Typeguards', exact: true }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'React', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('0 posts found.')
  await page.getByRole('button', { name: 'All', exact: true }).click()
  await page.getByRole('searchbox').fill('no such post')
  await expect(page.getByText('No posts match no such post.')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await page.getByRole('button', { name: 'Data Structures', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('4 posts found.')
})

test('posts remain readable and navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  await page.getByRole('link', { name: /GraphQL Typeguards/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'GraphQL Typeguards',
  )
  await context.close()
})

test('accordion demo becomes interactive when scrolled into view', async ({ page }) => {
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
})

for (const width of [1280, 390]) {
  test(`datepicker hydrates and selects a date at ${width}px`, async ({ page }) => {
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
  })
}

test('table of contents labels and tracks the active section', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const links = page.locator('.rail [data-toc-link]')
  const labels = (await links.allTextContents()).map((label) => label.trim())

  expect(labels).toContain('What is a Tree ?')

  await page.evaluate(() => {
    const heading = document.getElementById('get-method')
    if (!(heading instanceof HTMLElement)) throw new Error('Get method heading not found')

    window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 40)
  })

  await expect(
    page.locator('.rail').getByRole('link', { name: 'Get method', exact: true }),
  ).toHaveClass(/is-active/)
})

test('figure tabs link to their figure', async ({ page }) => {
  await page.goto(
    '/blog/2026/shipping-a-2-0-redesigning-10-years-old-product-one-milestone-at-a-time',
  )
  await page.getByRole('link', { name: 'fig. 03', exact: true }).click()
  await expect(page).toHaveURL(/#fig-03$/)
  await expect(
    page.getByRole('figure', {
      name: 'From the first milestone to general availability',
    }),
  ).toBeInViewport()
})

test('reading progress fills as the article scrolls', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')
  const progress = page
    .locator('.rail')
    .getByRole('progressbar', { name: 'Reading progress' })
  await expect(progress).toHaveAttribute('aria-valuenow', '0')

  await page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }),
  )

  await expect(progress).toHaveAttribute('aria-valuenow', '100')
})

test('reading progress stays inside the rail on posts with many sections', async ({
  page,
}) => {
  await page.goto('/blog/2021/retraining-web-development-online')
  const rail = await page.locator('.rail').boundingBox()
  const progress = await page
    .locator('.rail')
    .getByRole('progressbar', { name: 'Reading progress' })
    .evaluate((bar) => ({
      right: bar.getBoundingClientRect().right,
      overflow: bar.scrollWidth - bar.clientWidth,
    }))

  expect(progress.overflow).toBe(0)
  expect(progress.right).toBeLessThanOrEqual(rail!.x + rail!.width)
})

test('mobile contents opens to section links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/blog/2022/the-tree')
  const details = page.locator('details')
  await details.getByText('On this page', { exact: true }).first().click()
  await expect(details).toHaveAttribute('open', '')
  await expect(
    details.getByRole('link', { name: 'Get method', exact: true }),
  ).toBeVisible()
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
