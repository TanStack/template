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

## Security defaults

Preserve the Zizmor and provenance checks, SHA-pinned actions, scoped workflow
permissions, `persist-credentials: false`, and dependency install policies. Never
bypass a security check or broaden a policy exception to make CI pass. Review
exact dependency exceptions and keep TypeScript pinned during routine updates.

Keep `.github/CODEOWNERS` and `.github/SECURITY_SETUP.md` current when adding build
or release configuration. Repository settings and GitHub App installations require
separate setup; committed configuration alone does not enforce branch protection.
