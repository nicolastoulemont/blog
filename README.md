# nicolastoulemont.dev

Source of my personal engineering blog, a static [Astro](https://astro.build) site deployed on Fly.

## Stack

- Astro with MDX content collections
- React islands for the interactive demos
- Tailwind CSS
- TypeScript

## Writing a post

Posts live in `src/content/blog/<locale>/<year>/<slug>.mdx`. The frontmatter `locale` must match the directory, and dates use `YYYY-MM-DD`. The content schema rejects invalid metadata at build time.

English posts are served at `/blog/<year>/<slug>`, French posts at `/fr/blog/<year>/<slug>`.

Use fenced `mermaid` code blocks for diagrams. Light and dark SVGs render during the build; CSS selects the one matching the blog's theme. Set `accTitle` and `accDescr` in each diagram to give it an accessible name and description. Diagrams share the image figure numbering, with `accTitle` displayed as the caption.

## Commands

Requires Node 24 and pnpm 12 (see `packageManager`).

After `pnpm install`, run `pnpm exec playwright install chromium` before starting the dev server or building. On Linux, use `pnpm exec playwright install --with-deps chromium` to install the browser's system dependencies too.

| Command        | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| `pnpm dev`     | Start the dev server                                   |
| `pnpm build`   | Build the static site into `dist/`                     |
| `pnpm preview` | Serve the built output                                 |
| `pnpm check`   | Astro type and content checks                          |
| `pnpm lint`    | Oxlint                                                 |
| `pnpm fallow`  | Fallow unused-code, duplication, and complexity checks |
| `pnpm format`  | Prettier                                               |
| `pnpm test`    | Vitest unit tests                                      |
| `pnpm e2e`     | Playwright browser tests (local only)                  |

Pushes to `main` run the checks and deploy to Fly.
