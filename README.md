This is the source code for my personal website deployed at `nicolastoulemont.dev`.

It is now a static Astro site with MDX-authored posts, React islands for the interactive demos, and a small client-side search on the homepage.

Post cards render at build time. Homepage search filters that HTML with an Astro script; browsing posts does not require JavaScript. React hydrates only the accordion and datepicker demos, when they approach the viewport.

`BaseLayout.astro` enables Astro's `ClientRouter`, including its default link prefetching. Internal links swap pages without a full document reload; without JavaScript they remain ordinary links. Search, theme controls, and the table of contents initialize on `astro:page-load`. Document/window listeners and pending table-of-contents timers are cleaned up before each swap, and the selected theme carries over to the incoming page.

English and French routes use `src/layouts/PostLayout.astro`. Posts live in `src/content/blog/<locale>/<year>/<slug>.mdx`; frontmatter dates use `YYYY-MM-DD`, and the frontmatter locale must match the directory. The content schema and route mapping reject invalid metadata during the build.

Images currently retain their published `/img/` URLs in `public/img`. They are copied unchanged, so they do not receive Astro image optimization.

## Stack

- Astro
- MDX content collections
- React islands
- Tailwind CSS
- TypeScript

## Commands

- `pnpm dev` starts the Astro dev server.
- `pnpm build` builds the static site into `dist/`.
- `pnpm preview` serves the built output locally.
- `pnpm check` runs Astro's type/content checks.
- `pnpm test` runs the Vitest suite.
- `pnpm e2e` builds the site and runs Playwright against its static preview, including search, navigation without JavaScript, and desktop/mobile demos.
