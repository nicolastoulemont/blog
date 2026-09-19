import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`post command menu searches and navigates at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/blog/2022/the-tree')
    const trigger = page.getByRole('button', { name: 'Search posts', exact: true })
    await expect(trigger).toBeEnabled()
    const origin = await page.evaluate(() => performance.timeOrigin)
    await page.keyboard.press('Meta+k')
    const dialog = page.getByRole('dialog', { name: 'Search posts' })
    const input = dialog.getByRole('combobox', { name: 'Search posts' })
    await expect(dialog).toBeVisible()
    await expect(input).toBeFocused()
    await expect(dialog.getByRole('option', { name: /^The Tree/ })).toHaveCount(0)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowUp')
    await expect(
      dialog.getByRole('option', { name: /The compound component pattern/ }),
    ).toHaveAttribute('aria-selected', 'true')
    await input.fill('zzzzzzzzzz')
    await expect(dialog.getByText('No posts found.')).toBeVisible()
    await input.fill('graphql')
    await expect(dialog.getByRole('option', { name: /GraphQL Typeguards/ })).toBeVisible()
    await expect(dialog.getByRole('option', { name: /^The Tree/ })).toBeHidden()
    await input.fill('the queue')
    await expect(dialog.getByRole('option', { name: /^The Queue / })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/blog\/2020\/the-queue$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Queue')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    expect(await page.evaluate(() => performance.timeOrigin)).toBe(origin)
    await expect(trigger).toBeEnabled()
    await trigger.click()
    await expect(input).toHaveValue('')
    await expect(dialog.getByRole('option', { name: /^The Queue / })).toHaveCount(0)
    await expect(dialog.getByRole('option', { name: /^The Tree/ })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await page.keyboard.press('Control+k')
    await expect(dialog).toBeVisible()
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBe(0)
    await dialog.getByRole('button', { name: 'Close search' }).click()
    await expect(dialog).toHaveCount(0)
    expect(errors).toEqual([])
  })
}

test('command search excludes French articles and language labels', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')
  await page.getByRole('button', { name: 'Search posts', exact: true }).click()
  await expect(
    page.getByRole('option').filter({ hasText: /English|Français/ }),
  ).toHaveCount(0)
  await expect(
    page.getByRole('option', { name: /Reconversion dans une carrière/ }),
  ).toHaveCount(0)
  await page.getByRole('combobox').fill('reconversion')
  await expect(page.getByText('No posts found.')).toBeVisible()
  await page.goto('/fr/blog/2021/retraining-web-development-online')
  await page.getByRole('button', { name: 'Rechercher un article' }).click()
  const dialog = page.getByRole('dialog', { name: 'Rechercher un article' })
  await expect(dialog.getByRole('combobox')).toBeFocused()
  await dialog.getByRole('combobox').fill('zzzzz')
  await expect(dialog.getByText('Aucun article trouvé.')).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('link', { name: 'Nicolas Toulemont', exact: true }).click()
  await expect(page.getByRole('searchbox')).toBeVisible()
  await page.keyboard.press('Meta+k')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})
