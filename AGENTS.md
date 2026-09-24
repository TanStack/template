# Agent Instructions

Read and follow [CONTRIBUTING.md](./CONTRIBUTING.md) before changing this repository.
Keep changes focused, verify generated code, and follow the pull request template.

Use the Node.js version in `.nvmrc` for checks. Keep TypeScript at `6.0.3`
during routine dependency updates.

## Template-only repository

This repository does not release or publish packages. Never add changesets or bump
package versions for changes here. Changesets and release workflows are scaffolding
for libraries created from this template; keep them current without triggering a
release. Update this rule when initializing a real library from the template.

Package scaffolding builds ES2022 ESM with declarations, without source files or source maps.
Run `pnpm test` to verify builds, tests, and packed package contents before committing.
