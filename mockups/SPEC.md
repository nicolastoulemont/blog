# Redesign implementation spec

Port the approved mockups into the Astro site.

Source of truth for visuals: `mockups/home.html`, `mockups/post.html`, `mockups/mockup.css`. Where this spec and the mockup disagree on looks, the mockup wins. Where they disagree on behaviour, this spec wins.

Work in vertical slices. Each slice ends with the site building, `pnpm check` passing, and the relevant tests green before the next slice starts.

## Scope

In scope:

- Design tokens, fonts, light and dark themes.
- Header, footer, page shell with the four-column grid guides.
- Home page: intro band, featured card, topic filters, search, post grid.
- Post page for both locales: hero band, meta row, prose, code blocks, callouts, table of contents, related posts, prev/next pager.
- Restyle of the 404 page and the MDX components used inside posts.
- Tests updated to the new behaviour.

Out of scope:

- New content, an RSS feed, word counts, or share buttons. The mockups deliberately dropped them.
- Redesigning the DatePicker and Accordion demos embedded in two posts. They keep their current internals and only get the new `Container` frame.

## Decisions already made

- Monospace body text. JetBrains Mono for everything, self-hosted through `@fontsource-variable/jetbrains-mono`. No Google Fonts request in production.
- Accent is deep cobalt: `#1e3fa8` in light, `#5b7be0` in dark. One variable, swap later if wanted.
- Drop `@tailwindcss/typography` and `@tailwindcss/forms`. The prose and form styles are bespoke in the mockup and overriding the plugin costs more than writing the rules.
- Keep the existing `.dark` class mechanism. The boot script in `BaseLayout.astro` and the `theme` localStorage key stay. The mockup's `data-theme` attribute is a mockup detail, not a target.
- The theme control becomes a single toggle button. The current two-item menu goes away.
- Post titles come from frontmatter and render in the hero. The `# Title` line and the `<PostIntro>` element at the top of every MDX file are removed, and `PostIntro` is deleted.
- Reading time is computed at build time from the MDX body: words divided by 200, rounded up, minimum 1.

## Slice 1: tokens, fonts, shell

Files: `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/ThemeToggle.astro`, new `src/components/Footer.astro`, `package.json`.

Tokens go into `global.css` under `:root` and `:root.dark`, exposed to Tailwind through `@theme` so utilities like `bg-panel` and `border-line` work. Copy the values from the top of `mockup.css`:

| Token | Purpose |
| --- | --- |
| `--bg` | page background |
| `--panel`, `--panel-2` | card fill, input fill |
| `--fg`, `--fg-muted`, `--fg-faint` | text levels |
| `--line`, `--line-strong` | hairlines, card borders |
| `--accent`, `--accent-ink`, `--accent-soft` | accent, text on accent, tint |
| `--code-bg`, `--code-line`, `--code-fg` | code block chrome |
| `--cat-*` | one colour per category |

Page shell: `BaseLayout` renders `.page > .frame > (Header, slot, Footer)`. `.frame::before` draws the three vertical guides at 25, 50 and 75 percent and is hidden under 56rem. Any cell that holds running text sets `background: var(--bg)` so a guide never crosses a paragraph. The mockup does this for the intro bio and the article column.

Header: brand text "NICOLAS TOULEMONT" in the left cell linking home. GitHub and Twitter links from `SOCIAL_LINKS` plus the theme toggle in a cluster at the right. No "Writing" link, no call to action.

Theme toggle: one `<button aria-label="Toggle theme">` with sun and moon SVGs, one shown per theme via the `.dark` class. Click flips the class and writes `theme` to localStorage.

Footer: copyright line only, right aligned.

Verify: `pnpm build` succeeds, both themes render, no font request leaves the origin.

## Slice 2: home page

Files: `src/pages/index.astro`, `src/components/SearchPosts.tsx`, `src/components/PostCard.tsx`, `src/components/Tag.tsx`, `src/lib/blog-core.ts`, `src/lib/date.ts`, `src/lib/categories.ts`.

Data:

- Add `readingMinutes` to `BlogPostSummary` and `SearchIndexItem`. Compute it in `toBlogSummary` from `entry.body`. Put the word counting in a pure `readingMinutes(body: string)` in `blog-core.ts` so it has a unit test.
- Add `formatMonthYear(date, locale)` to `date.ts` for card dates ("Dec 2022") and keep the long form for the post hero ("Dec 23, 2022" in English, French equivalent).
- Add a `CATEGORY_SLUGS` map in `categories.ts` (`'Data Structures'` to `data`, and so on) so the CSS `data-cat` hook and the filter query stay stable. The colour registry moves to CSS variables; the Tailwind class registry in `CATEGORY_COLOR_VARIANTS` is deleted once nothing imports it.

Layout, top to bottom, all inside `.band` rows with hairline bottoms:

1. Intro band. Left half: the bio paragraph, no bullet, no links. Right half: the featured card for the newest post with a "New" accent tab followed by its category tabs. Featured stats are Published and Reading time plus the arrow cell.
2. Toolbar band. Filter chips on the left: "All" then one chip per category that has at least one post, in registry order, each with its colour square. Search input on the right with a `/` hint.
3. Post grid band. Three columns, two under 68rem, one under 40rem. Each card has category tabs, title, description, and a single stats row with Published, Reading time and the arrow.

`SearchPosts` owns query and category state. A post shows when it matches the selected category (or "All") and the query matches title, description, locale label or a category name. Extract `filterPosts(posts, { query, category })` into `blog-core.ts` as a pure function and test it there. Pressing `/` outside the input focuses it; Escape clears and blurs. Empty state reads "No posts match <query>".

`PostCard` renders the large variant by default and takes `variant="compact"` for the single-row version used on the post page. Both share the tab strip, border and hover behaviour. Cards drop the `ogImage` thumbnail; the image stays in frontmatter for Open Graph only.

Verify: e2e for search, category filter, empty state, and the `/` shortcut. Unit tests for `readingMinutes` and `filterPosts`.

## Slice 3: post page

Files: new `src/layouts/PostLayout.astro` used by both `src/pages/blog/[year]/[slug].astro` and `src/pages/fr/blog/[year]/[slug].astro`, `src/components/TableOfContents.astro`, `src/components/Callout.tsx`, `src/components/Container.tsx`, `src/lib/site.ts`, `astro.config.ts`, every file under `src/content/blog`.

Content migration: a one-off script removes the leading `# Title` heading and the `<PostIntro ... />` line from all 14 MDX files and drops the `PostIntro` import where it becomes unused. Delete `src/components/PostIntro.tsx` and its export.

UI strings need both locales. Add `UI_STRINGS: Record<SiteLocale, {...}>` to `site.ts` covering back link, Published, Reading time, On this page, More on, Previous, Next, and the translation notice.

Hero band, full width: back link to `/`, category tags, `h1` from `title`, `description` as the lede. If a translation exists, a bordered notice under the lede links to it.

Meta row: Published (long date) and Reading time cells, remaining cells empty.

Body band: article spans three columns, rail spans the fourth. Under 56rem the rail is hidden and a `<details>` element at the top of the article holds the same list. The article cell has `background: var(--bg)`.

Prose rules come from the `.prose` block in `mockup.css`: 44rem measure, `h2` with a top hairline and an accent square, square list markers, bordered inline code, tabbed figures, accent links. The `heading-anchor` from `rehype-autolink-headings` stays and is restyled to sit at the right of the heading, visible on hover.

Code blocks: switch the Shiki theme to `material-theme-palenight` so token colours match the mockup, and force the block background to `--code-bg`. Astro puts `data-language` on the `<pre>`; use it in a `::before` pseudo-element for the language tab. A small inline script in `PostLayout` adds a "Copy" button to each `pre` on load, so blocks still render without JavaScript. Line highlighting is not in scope.

Callout: bordered box with an accent left edge and a tab label. The `icon` prop becomes an optional `label` prop, which removes the `react-icons` dependency from the component. Keep the `variant` prop mapped to the category colour variables.

Container: hairline box with `--panel` fill. Same API.

Table of contents: `headings` from `render()` filtered to depth 2 to 4. No "Top" entry. Links carry `data-toc-link`; the active one gets `is-active`, computed on scroll with the same offset logic as today. The mobile floating button, overlay and animation code are deleted with the `<details>` replacement.

Related posts: `getRelatedPosts` unchanged, rendered as compact cards in a single column under "More on <category>". Pager: previous and next by `publishedAt` within the same locale; when there is no next, the right cell links back to `/`.

Verify: e2e for the hero `h1`, the meta row, the active TOC link after scrolling, the mobile `<details>` open and close, related card count for the tree post, no horizontal overflow at 390, 768, 1024 and 1280.

## Slice 4: 404 and cleanup

Restyle `src/pages/404.astro` with the tokens: a bordered panel, plain text, one link home. Remove `surface-card`, the old `.toc-*` rules, and any Tailwind colour classes left in components. Delete `CATEGORY_COLOR_VARIANTS`. Remove `@tailwindcss/typography`, `@tailwindcss/forms`, and `react-icons` if nothing imports it after the Callout change.

Verify: `pnpm check`, `pnpm test`, `pnpm e2e`, `pnpm build`.

## Tests to rewrite in `e2e/blog.spec.ts`

- Theme: click "Toggle theme", expect `html.dark` and the new dark background colour.
- Search: fill the input, expect a matching card visible and a non-matching one hidden.
- Filter: click a category chip, expect only that category's cards.
- Post hero: `h1` text equals the frontmatter title.
- Table of contents: labels have no trailing `#`, and the link for a scrolled-to heading has `is-active`.
- Mobile TOC: at 390px the `<details>` summary opens and closes the list.
- Related posts: compact cards for the tree post, count 4.
- Layout: zero horizontal overflow at each breakpoint.

## Acceptance

- Home and post pages match the mockups at 1280, 768 and 390, in both themes.
- Both locales render the post page with translated UI strings.
- All four commands pass: `pnpm check`, `pnpm test`, `pnpm e2e`, `pnpm build`.
- The final diff contains no leftover mockup-only classes and no unused dependencies.

## Open questions

- "Twitter" or "X" as the link label. The mockup says Twitter.
- Whether French posts want the English date format or `23 déc. 2022`. The spec assumes the locale-native form via `date-fns`.
