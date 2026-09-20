import { expect, test } from '@playwright/test'

test('cards prefetch and support back and forward navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('searchbox')).toBeVisible()
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

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('The Tree')
  await page.goForward()
  await expect(page.getByRole('searchbox')).toBeVisible()
})
