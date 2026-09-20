import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`post command menu searches and navigates at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/blog/2022/the-tree')
    const trigger = page.getByRole('button', { name: 'Search posts', exact: true })
    await expect(trigger).toBeEnabled()
    await page.keyboard.press('Meta+k')
    const dialog = page.getByRole('dialog', { name: 'Search posts' })
    const input = dialog.getByRole('combobox', { name: 'Search posts' })
    await expect(dialog).toBeVisible()
    await expect(input).toBeFocused()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowUp')
    await expect(
      dialog.getByRole('option', { name: /The compound component pattern/ }),
    ).toHaveAttribute('aria-selected', 'true')
    await input.fill('zzzzzzzzzz')
    await expect(dialog.getByText('No posts found.')).toBeVisible()
    await input.fill('graphql')
    await expect(dialog.getByRole('option', { name: /GraphQL Typeguards/ })).toBeVisible()
    await input.fill('the queue')
    await expect(dialog.getByRole('option', { name: /^The Queue / })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/blog\/2020\/the-queue$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Queue')
    await expect(trigger).toBeEnabled()
    await trigger.click()
    await expect(input).toHaveValue('')
    await expect(dialog.getByRole('option', { name: /^The Tree/ })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
    await page.keyboard.press('Control+k')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Close search' }).click()
    await expect(trigger).toBeFocused()
  })
}
