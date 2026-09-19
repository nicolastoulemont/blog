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
  await expect(page.getByRole('heading', { name: /From the same categories?/ })).toBeVisible()
})

test('fenced code keeps syntax highlighting styles', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const code = page.locator('pre').first().locator('code')

  await expect(code).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(code).toHaveCSS('padding', '0px')
})

test('table of contents labels and tracks the active section', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const links = page.locator('[data-toc-link]')
  const labels = await links.allTextContents()

  expect(labels).toHaveLength(12)
  expect(labels[0]).toBe('Top')
  expect(labels).toContain('What is a Tree ?')
  expect(labels.every((label) => !label.trim().endsWith('#'))).toBe(true)

  await page.evaluate(() => {
    const heading = document.getElementById('get-method')
    if (!(heading instanceof HTMLElement)) throw new Error('Get method heading not found')

    window.scrollTo(0, heading.getBoundingClientRect().top + window.scrollY - 40)
  })

  await expect(page.getByRole('link', { name: 'Get method', exact: true })).toHaveClass(
    /bg-cyan-200/
  )
})

test('blog layout makes room for the table of contents responsively', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto('/blog/2022/the-tree')

  const desktopLayout = await page.evaluate(() => {
    const article = document.querySelector('article')?.getBoundingClientRect()
    const toc = document.querySelector('[data-toc-root]')?.getBoundingClientRect()

    return {
      articleRight: article?.right ?? 0,
      tocLeft: toc?.left ?? 0,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }
  })

  expect(desktopLayout.overflow).toBe(0)
  expect(desktopLayout.articleRight - desktopLayout.tocLeft).toBeLessThanOrEqual(4)

  await page.setViewportSize({ width: 768, height: 768 })
  await page.reload()

  const mobileLayout = await page.evaluate(() => ({
    articleRight: document.querySelector('article')?.getBoundingClientRect().right ?? 0,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    tocToggle: getComputedStyle(document.querySelector('[data-toc-toggle]')!).display,
  }))

  expect(mobileLayout.overflow).toBe(0)
  expect(mobileLayout.articleRight).toBeLessThanOrEqual(768)
  expect(mobileLayout.tocToggle).toBe('flex')

  const tocPanel = page.locator('[data-toc-panel]')
  await page.getByRole('button', { name: 'Open table of contents' }).click()
  await expect
    .poll(() => tocPanel.evaluate((panel) => panel.getAnimations().length))
    .toBeGreaterThan(0)
  await expect(page.getByRole('button', { name: 'Close table of contents' })).toBeVisible()
  await page.getByRole('button', { name: 'Close table of contents' }).click()
  await expect
    .poll(() => tocPanel.evaluate((panel) => panel.getAnimations().length))
    .toBeGreaterThan(0)
  await expect(page.getByRole('button', { name: 'Close table of contents' })).toBeHidden()
})

test('related posts show the full vertical list', async ({ page }) => {
  await page.goto('/blog/2022/the-tree')

  const section = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'From the same category' }),
  })
  const cards = section.locator(':scope > div > a')

  await expect(cards).toHaveCount(4)

  const positions = await cards.evaluateAll((elements) => {
    return elements.map((element) => {
      const { x, y } = element.getBoundingClientRect()
      return { x, y }
    })
  })

  expect(positions.every(({ x }) => x === positions[0]?.x)).toBe(true)
  expect(positions.every(({ y }, index) => index === 0 || y > positions[index - 1].y)).toBe(true)
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
