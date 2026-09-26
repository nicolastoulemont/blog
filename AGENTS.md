# AGENTS.md

Personal engineering blog: a static Astro site with MDX posts and React islands for the interactive demos, deployed on Fly. The README covers the stack, post layout, and commands.

## Commands

- Install: `pnpm install`, then `pnpm exec playwright install chromium`
- Check: `pnpm format:check`, `pnpm lint`, `pnpm check`, `pnpm test`, `pnpm fallow`
- Build: `pnpm build`
- Browser tests: `pnpm e2e` (local only, not run in CI)

## Notes

- Components under `src/components/demos/` mirror code printed in blog posts. Keep them in step with the post, including exports nothing imports.

<!-- fallow:setup-hooks:start -->

## Fallow local gate

Before any `git commit` or `git push`, run `fallow audit --format json --quiet --explain --gate-marker agent`. If the verdict is `fail`, fix the reported findings before retrying. Treat JSON runtime errors like `{ "error": true, ... }` as non-blocking.

Audit defaults to `gate=new-only`: only findings introduced by the current changeset affect the verdict. Inherited findings on touched files are reported under `attribution` and annotated with `introduced: false`, but do not block the commit. Set `[audit] gate = "all"` in `fallow.toml` to gate every finding in changed files.

For non-skill agents, treat the task map below as the local onboarding source: run the listed fallow command before destructive edits, before commits, and before pull request handoff.

## Fallow task map

| When the agent is about to...                                     | Run                                                                                                                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delete an "unused" export or file                                 | `fallow dead-code --trace <file>:<export>`                                                                                                              |
| prove a TypeScript symbol's exact consumers before refactoring    | `fallow dead-code --type-aware --symbol-impact <file>:<export-or-class.method>`                                                                         |
| find how one module reaches another                               | `fallow trace --path <from> <to>` (Reports `reachable: false` instead of failing when no import path exists; type-only hops are reported, not skipped.) |
| delete an "unused" dependency                                     | `fallow dead-code --trace-dependency <name>`                                                                                                            |
| commit or open a PR                                               | `fallow audit --base <ref>`                                                                                                                             |
| read a diff before approving it                                   | `fallow review --base <ref> --brief` (orientation, never gates: deterministic and always exit 0, unlike the audit row)                                  |
| prioritize refactoring                                            | `fallow health --hotspots --targets`                                                                                                                    |
| ask who owns code                                                 | `fallow health --ownership`                                                                                                                             |
| check untested-but-reachable code                                 | `fallow health --coverage-gaps`                                                                                                                         |
| consolidate duplication                                           | `fallow dupes --trace dup:<fingerprint>`                                                                                                                |
| find feature flags                                                | `fallow flags`                                                                                                                                          |
| check which architecture rules apply to a file before changing it | `fallow guard <files>`                                                                                                                                  |
| surface security candidates                                       | `fallow security`                                                                                                                                       |
| understand a finding                                              | `fallow explain <issue-type>`                                                                                                                           |
| scope a monorepo                                                  | `--workspace <glob> / --changed-workspaces <ref>` (global flags, prefix any command)                                                                    |

<!-- fallow:setup-hooks:end -->
