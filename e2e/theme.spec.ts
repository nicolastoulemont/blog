import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`theme toggle supports keyboard selection and persistence at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle theme' })
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(19, 19, 19)')
    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(217, 217, 214)')
    await page.reload()
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(217, 217, 214)')
    await toggle.click()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
}
