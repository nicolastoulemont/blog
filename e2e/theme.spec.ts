import { expect, test } from '@playwright/test'

for (const width of [1280, 390]) {
  test(`theme toggle supports keyboard selection and persistence at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Toggle theme' })
    const html = page.locator('html')
    const body = page.locator('body')
    await expect(html).toHaveClass(/dark/)
    // Compare against the dark background instead of pinning palette values.
    const dark = await body.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    )
    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(html).not.toHaveClass(/dark/)
    await expect(body).not.toHaveCSS('background-color', dark)
    await page.reload()
    await expect(html).not.toHaveClass(/dark/)
    await expect(body).not.toHaveCSS('background-color', dark)
    await toggle.click()
    await expect(html).toHaveClass(/dark/)
    await expect(body).toHaveCSS('background-color', dark)
  })
}
