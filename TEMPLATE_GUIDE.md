# TanStack Template Guide

This template provides a complete TanStack library setup. It starts with a framework-agnostic core, React and Solid adapters, matching devtools packages, docs, examples, CI, and release tooling. Follow these steps to create a new library:

## Search and Replace

Replace the following strings throughout the codebase:

| Find       | Replace With        | Example                                          |
| ---------- | ------------------- | ------------------------------------------------ |
| `template` | `your-library-name` | @tanstack/template → @tanstack/your-library-name |
| `Template` | `YourLibraryName`   | class Template → class YourLibraryName           |
| `TEMPLATE` | `YOUR_LIBRARY_NAME` | TEMPLATE_VAR → YOUR_LIBRARY_NAME_VAR             |

## Files to Update

### 1. Root package.json

- Update repository URL
- Update homepage URL
- Update description
- Update overrides section with your package names
- Update the `size-limit` path and limit for your core package
- Update `copy:readme` if you add or remove packages

### 2. Package package.json files

- Update name, description, keywords
- Update repository directory paths

### 3. Documentation

- Update docs/overview.md with your library's purpose
- Update docs/quick-start.md with real usage examples
- Add guides for your library's features
- Update config.json with your DocSearch credentials

### 4. GitHub Configuration

- Update .github/ISSUE_TEMPLATE/bug_report.yml
- Follow [.github/SECURITY_SETUP.md](./.github/SECURITY_SETUP.md) to configure branch rules, scanner/app access, Actions permissions, and publishing. Repository settings are a separate setup step.
- Update `.github/CODEOWNERS` and import the ruleset starter after the first CI run
- Update workflow files if needed
- Update FUNDING.yml with your sponsor links
- Update .changeset/config.json with your GitHub repository name

### 5. Source Code

- Replace placeholder console.log code with your library's implementation
- Update types in src/types.ts
- Write real tests
- Add framework-specific implementations

### 6. Examples

- Update example apps to demonstrate your library
- Add more examples as needed

### 7. README.md

- Write comprehensive README describing your library
- Add badges, installation instructions, usage examples

### 8. Runtime and Tooling Pins

- Keep `.nvmrc` and `package.json`'s Volta pin aligned so local checks and CI use the same Node.js version.
- Keep the root `engines` aligned with the development tools. Published packages declare their own Node.js 20 minimum.
- Keep pnpm settings in `pnpm-workspace.yaml`; `.npmrc` retains npm publishing configuration.
- Update `pnpm-workspace.yaml` if you add package locations or build dependencies

## Build and Publishing Defaults

Packages target ES2022 and publish ESM with `.d.ts` declarations. Only `dist` and package metadata are included; CommonJS, source files, and source maps are excluded. Preserve explicit tsdown targets and exports when adding packages, including any additional entry points such as `@tanstack/template/types`.

Each package's `test:build` runs strict publint and `scripts/verify-package.ts` against an actual pnpm tarball. PR and release checks run these validations. Full builds and `pnpm test` also enforce the core package's size budget.

## Package Structure

```
template/
├── packages/
│   ├── template/                    # Core library (framework-agnostic)
│   ├── react-template/              # React adapter
│   ├── solid-template/              # Solid adapter
│   ├── template-devtools/           # Base devtools
│   ├── react-template-devtools/     # React devtools
│   └── solid-template-devtools/     # Solid devtools
├── examples/                         # Example applications
├── docs/                            # Documentation
├── scripts/                         # Build and doc scripts
└── .github/                         # CI/CD workflows
```

## Adding More Framework Adapters

This starter template ships only React and Solid adapters. To add a new framework (e.g., Vue):

1. Create `packages/vue-template/` directory
2. Copy structure from `packages/react-template/`
3. Update package.json with vue-specific dependencies
4. Implement Vue-specific primitives
5. Add example in `examples/vue/`
6. Update docs with `framework/vue/adapter.md`
7. Update root package.json overrides
8. Update vitest.workspace.ts
9. Update scripts/generate-docs.ts

## Development Workflow

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build:all

# Run tests
pnpm test:lib

# Run linting
pnpm lint
pnpm lint:all
pnpm test:eslint

# Format code
pnpm format

# Generate documentation
pnpm generate-docs

# Watch mode for development
pnpm watch
```

## Release Process

This repository never releases packages and does not accept changesets. The following process applies only to libraries created from the template. When initializing a library, update the template-only rules in `AGENTS.md`, `CONTRIBUTING.md`, and the pull request template, and set the GitHub Actions repository variable `ENABLE_RELEASES` to `true` after configuring publishing.

The release scaffolding uses Changesets CLI 3, Changesets action 2, and the official GitHub changelog generator. The action uses `version-script`, `publish-script`, `commit-message`, `pr-title`, and `github-token` inputs, plus the `published-packages` output. Private examples are excluded from versioning and tagging.

1. Make changes
2. Run `pnpm changeset` to create a changeset
3. Commit and push
4. Create PR
5. Merge PR
6. GitHub Actions will automatically version and publish

## Questions?

- See CONTRIBUTING.md for contribution guidelines
- Check existing TanStack libraries for patterns
- Refer to Hotkeys or other current TanStack libraries for complete examples
