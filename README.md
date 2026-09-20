This is the source code for my personal website deployed at `nicolastoulemont.dev`.

It is now a static Astro site with MDX-authored posts, React islands for interactive demos, and a small client-side search on the homepage.

Post cards render at build time. Homepage search filters that HTML with an Astro script; browsing posts does not require JavaScript. Topic filters and search work together, with `/` to focus search and Escape to clear it. The theme button uses an Astro script. The accordion and datepicker demos hydrate when they approach the viewport.

`BaseLayout.astro` enables Astro's `ClientRouter`, including its default link prefetching. Internal links swap pages without a full document reload; without JavaScript they remain ordinary links. Search and the table of contents initialize on `astro:page-load`; the theme button and code-copy buttons initialize on each page. Document/window listeners and pending table-of-contents animation frames are cleaned up before each swap, and the selected theme carries over to the incoming page.

English and French routes use `src/layouts/PostLayout.astro`. Posts live in `src/content/blog/<locale>/<year>/<slug>.mdx`; frontmatter dates use `YYYY-MM-DD`, and the frontmatter locale must match the directory. The content schema and route mapping reject invalid metadata during the build.

Images currently retain their published `/img/` URLs in `public/img`. They are copied unchanged, so they do not receive Astro image optimization.

Astro 7 uses the explicit `unified()` Markdown processor from `@astrojs/markdown-remark` to retain the heading-link plugins. HTML compression retains HTML whitespace rules with `compressHTML: true`.

Use Node 24 (see `.node-version`) and pnpm 12.3.4 (pinned in `package.json`). CI and the Docker build use the same Node major and pnpm version. TypeScript remains on 6.0.3 because `@astrojs/check` requires the JavaScript compiler API missing from TypeScript 7. Track support in [Astro's TypeScript 7 discussion](https://github.com/withastro/roadmap/discussions/1321).

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
- `pnpm lint` generates Astro types and runs Oxlint correctness and type-aware rules for JavaScript, TypeScript, and React.
- `pnpm lint:fix` applies safe lint fixes.
- `pnpm format` formats the project with Prettier.
- `pnpm format:check` checks formatting without writing files.
- `pnpm check` runs Astro's type/content checks.
- `pnpm test` runs the Vitest suite.
- `pnpm e2e` runs the browser suite against both the built static preview and a fresh development server, including search, navigation without JavaScript, and desktop/mobile demos.

Playwright sets `BLOG_E2E=1` for its development server to disable Astro's dev toolbar and use a separate Vite cache in `node_modules/.vite-e2e`. Builds and regular development use separate caches (`.vite-build` and `.vite-dev`) so building while the dev server runs cannot replace its React runtime with production dependencies. Vite prebundles the React islands' dependencies up front to avoid invalidating loaded chunks when another island hydrates. Console-error assertions remain enabled, and regular `pnpm dev` sessions keep the toolbar.

Prettier remains the formatter, with the Astro and Tailwind plugins configured in `prettier.config.js`. Oxlint does not lint Astro templates; `pnpm check` continues to check Astro files.

Pull requests and pushes to `main` run formatting, lint, Astro checks, unit tests, and a production build. Only successful pushes to `main` deploy to Fly. Browser tests remain a local command.

## Design

The UI follows the approved blueprint mockups in [PR #22](https://github.com/nicolastoulemont/blog/pull/22). Tailwind utilities handle layouts and components; `global.css` defines theme tokens, grid guides, article typography, and the contents rail. JetBrains Mono is bundled locally through Fontsource. Light and dark themes keep the `theme` localStorage key and `.dark` root class.

Post titles and metadata come from frontmatter. Reading time is the MDX body's word count divided by 200, rounded up to at least one minute. Cards use published dates; adjacent posts are ordered by publication date within their locale. Mobile contents use a native disclosure, so article navigation still works without JavaScript.

On post pages, the search button or Cmd+K / Ctrl+K opens a command menu built from shadcn’s Base UI command composition (`cmdk` and Base UI Dialog). It searches all other published English posts by title, description, or topic. Arrow keys select a result, Enter opens it through Astro navigation, and Escape closes the menu.
