import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`theme menu supports keyboard selection and persistence at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'Open theme menu' })
    const menu = page.getByRole('menu')
    const light = page.getByRole('menuitemradio', { name: 'Light' })
    const dark = page.getByRole('menuitemradio', { name: 'Dark' })

    await expect(trigger).toBeEnabled()
    await trigger.focus()
    await page.keyboard.press('ArrowDown')
    await expect(menu).toBeVisible()
    await expect(dark).toBeChecked()
    await page.keyboard.press('Home')
    await expect(light).toBeFocused()
    await page.keyboard.press('ArrowDown')
    await expect(dark).toBeFocused()
    await page.keyboard.press('ArrowUp')
    await expect(light).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(menu).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light')

    await page.reload()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    await trigger.click()
    await expect(light).toBeChecked()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(trigger).toBeFocused()

    await page.getByRole('link', { name: 'The Tree', exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Tree')
    await trigger.click()
    await expect(light).toBeChecked()
    await dark.click()
    await expect(menu).toBeHidden()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await trigger.click()
    await expect(dark).toBeChecked()
    await page.mouse.click(10, 100)
    await expect(menu).toBeHidden()
  })
}
