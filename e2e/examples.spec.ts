import { expect, test } from '@playwright/test'

test('examples never ship', async ({ page }, { project }) => {
  test.skip(project.name !== 'chromium', 'Examples only render in dev')
  const response = await page.goto('/examples')
  expect(response?.status()).toBe(404)
})

test('examples list each component page', async ({ page }, { project }) => {
  test.skip(project.name !== 'chromium-dev', 'Examples only render in dev')
  await page.goto('/examples')
  await page
    .getByRole('navigation', { name: 'Examples' })
    .getByRole('link', { name: 'Callouts', exact: true })
    .click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Callouts')
  await expect(
    page.getByRole('complementary').filter({ hasText: 'A warning flags' }),
  ).toContainText('Warning')
})

test('copying a diff copies the code after the change', async ({ page, context }, {
  project,
}) => {
  test.skip(project.name !== 'chromium-dev', 'Examples only render in dev')
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/examples/code-blocks')
  const diff = page.locator('pre[data-title="isType.ts"]')
  await diff.getByRole('button', { name: 'Copy', exact: true }).click()
  await expect(diff.getByRole('button', { name: 'Copy', exact: true })).toHaveText(
    'Copied',
  )
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    [
      'function isType<Result extends GraphQLResult>(',
      '  result: Result,',
      '  typenames: Array<ValueOfTypename<Result>>,',
      ') {',
      '  return typenames.includes(result.__typename)',
      '}',
    ].join('\n'),
  )
})

test('tabs switch code blocks by click and arrow keys', async ({ page }, { project }) => {
  test.skip(project.name !== 'chromium-dev', 'Examples only render in dev')
  await page.goto('/examples/tabs')
  const npm = page.getByRole('tab', { name: 'npm', exact: true })
  await npm.click()
  await expect(npm).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel').first()).toHaveText(/npm install zod/)
  await npm.press('ArrowRight')
  const yarn = page.getByRole('tab', { name: 'yarn', exact: true })
  await expect(yarn).toBeFocused()
  await expect(page.getByRole('tabpanel').first()).toHaveText(/yarn add zod/)
  await yarn.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'pnpm', exact: true })).toBeFocused()
})

test('tabs show every code block without JavaScript', async ({ browser }, {
  project,
}) => {
  test.skip(project.name !== 'chromium-dev', 'Examples only render in dev')
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/examples/tabs')
  await expect(page.getByRole('tablist', { includeHidden: true })).toHaveCount(2)
  await expect(page.getByRole('tablist')).toHaveCount(0)
  for (const command of ['pnpm add zod', 'npm install zod', 'yarn add zod']) {
    await expect(page.getByText(command, { exact: true })).toBeVisible()
  }
  await context.close()
})
