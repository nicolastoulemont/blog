import { expect, test } from '@playwright/test'

test('cards prefetch and navigate without replacing the document', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('searchbox')).toBeVisible()
  const timeOrigin = await page.evaluate(() => performance.timeOrigin)
  const documents: string[] = []
  page.on('request', (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      documents.push(request.url())
    }
  })

  await page.getByRole('button', { name: 'Toggle theme' }).click()
  const prefetched = page.waitForResponse(
    (response) =>
      new URL(response.url()).pathname === '/blog/2022/the-tree' &&
      response.request().resourceType() !== 'document',
  )
  await page.getByRole('link', { name: 'The Tree', exact: true }).hover()
  expect((await prefetched).ok()).toBe(true)
  await page.getByRole('link', { name: 'The Tree', exact: true }).click()
  await expect(page).toHaveURL(/\/blog\/2022\/the-tree$/)
  await expect(page).toHaveTitle('The Tree | Nicolas Toulemont')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://nicolastoulemont.dev/blog/2022/the-tree',
  )
  await expect(page.locator('html')).toHaveClass(/dark/)

  await page.getByRole('link', { name: 'Get method', exact: true }).click()
  await expect(page.getByRole('link', { name: 'Get method', exact: true })).toHaveClass(
    /is-active/,
  )
  await page.getByRole('link', { name: 'Nicolas Toulemont', exact: true }).click()
  await page.getByRole('searchbox').fill('graphql')
  await expect(
    page.getByRole('link', { name: 'GraphQL Typeguards', exact: true }),
  ).toBeVisible()
  await expect(
    page
      .locator('[data-post-search]')
      .getByRole('link', { name: 'The Tree', exact: true }),
  ).toBeHidden()

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('The Tree')
  await page.goForward()
  await expect(page.getByRole('searchbox')).toBeVisible()
  await page.getByRole('button', { name: 'Toggle theme' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin)
  expect(documents).toEqual([])
  expect(errors).toEqual([])
})

test('mobile contents and search work across repeated article and home visits', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/blog/2022/the-tree')
  for (let visit = 0; visit < 2; visit++) {
    await page.locator('summary').click()
    await page.getByRole('link', { name: 'Get method', exact: true }).click()
    await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/)
    await page.getByRole('link', { name: 'Nicolas Toulemont', exact: true }).click()
    await page.getByRole('searchbox').fill('the tree')
    await expect(page.getByRole('status')).toHaveText('0 posts found.')
    await expect(
      page
        .locator('[data-post-search]')
        .getByRole('link', { name: 'The Tree', exact: true }),
    ).toHaveCount(0)
    await page.getByRole('link', { name: 'The Tree', exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Tree')
  }
})
