import { expect, test } from '@playwright/test'

test('homepage search and theme toggle work', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Writing about')
  await page.getByLabel('Toggle theme').click()
  await expect(page.locator('html')).toHaveClass(/dark/)

  await page.getByLabel('Search all posts').fill('graphql')
  await expect(page.getByRole('link', { name: /GraphQL Typeguards/i })).toBeVisible()
})

test('english posts render at cleaned urls', async ({ page }) => {
  await page.goto('/blog/2022/how-to-build-datepicker')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'How to build a datepicker from scratch'
  )
  await expect(page.getByRole('heading', { name: 'On this page' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Related posts' })).toBeVisible()
})

test('french posts render at localized urls', async ({ page }) => {
  await page.goto('/fr/blog/2021/retraining-web-development-online')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Reconversion dans une carrière de développeur web'
  )
  await expect(page.getByRole('link', { name: 'ici', exact: true })).toHaveAttribute(
    'href',
    '/blog/2021/retraining-web-development-online'
  )
})

test('legacy locale-prefixed english urls redirect', async ({ page }) => {
  await page.goto('/blog/en/2022/the-tree')
  await expect(page).toHaveURL(/\/blog\/2022\/the-tree\/?$/)
})
