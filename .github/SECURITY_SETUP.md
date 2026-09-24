# Security setup for new libraries

A GitHub template copies repository files. Treat the following repository settings, app installations, and publishing configuration as a separate setup step. Committing these files does not activate branch protection or enable GitHub security products.

## Controls included in the scaffold

| Control                          | Configuration                                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GitHub Actions security analysis | `workflows/zizmor.yml`: PR and main-branch scans, annotations, SHA-pinned action, no write permissions or repository secrets                                             |
| Dependency provenance            | `workflows/pr.yml`: fail on provenance downgrades                                                                                                                        |
| Dependency install policy        | `pnpm-workspace.yaml`: 24-hour minimum release age, provenance trust policy, blocked exotic subdependencies, explicit install-script allowlist                           |
| Dependency updates               | `renovate.json`: action digest pinning, manual review for action updates, npm release-age delay, lockfile maintenance; TypeScript remains an intentional pin             |
| Sensitive-file ownership         | `CODEOWNERS`: workflows, dependency manifests/lockfile, build configs, scripts, and agent instructions                                                                   |
| Token access                     | Read-only workflow defaults; write/OIDC permissions scoped to the jobs that need them; checkout credentials are not persisted; Nx tokens are limited to test/build steps |
| Package contents                 | Strict publint and checks against real tarballs reject unpublished exports, source files, source maps, CommonJS, and unresolved workspace dependencies                   |
| Review and formatting            | CodeRabbit reads contribution/agent guidance; autofix regenerates docs and formatting; `.gitattributes` normalizes line endings                                          |
| Local secrets                    | `.gitignore` excludes `.env` and `.env.*`, with explicit exceptions for example files; keep real credentials out of examples too                                         |
| Release activation               | `workflows/release.yml` requires `ENABLE_RELEASES=true` and never cancels an in-progress release in favor of a newer run                                                 |

Zizmor's `advanced-security: false` reports findings as CI annotations and fails the check without requiring GitHub code-scanning upload permissions. It does not disable the scan. Zizmor checks workflow security; it does not replace application code scanning or secret scanning.

## Required GitHub setup

1. **Ownership and branch rules.** Update `CODEOWNERS` to a team with write access to the new repository. After the initial CI run creates the checks, import `rulesets/protected-branches.json` in **Settings → Rules → Rulesets**. This starter blocks deletion and force pushes, requires pull requests/code-owner review and resolved conversations, and requires `Test`, `Run zizmor`, and `Provenance`. Check the exact check names and bind their expected GitHub App source where available. Review automation-specific bypass requirements explicitly; the starter intentionally has no inherited app IDs or bypass actors. GitHub does not load this JSON file automatically.
2. **Actions permissions.** Set the default `GITHUB_TOKEN` permissions to read-only, require full-SHA action pinning, and require approval for workflows from outside contributors. Allow only the actions needed by the project. Never execute pull-request code under `pull_request_target` with privileged credentials. Enable Actions-created pull requests only if the new library's release automation needs it.
3. **Security features.** Enable secret scanning and push protection, the dependency graph, and Dependabot alerts. Enable CodeQL default setup for JavaScript/TypeScript or verify the equivalent organization-managed workflow and its results. Coordinate dependency remediation with Renovate before enabling overlapping Dependabot security-update PRs. These settings must be checked in the new repository; a scanner's configuration file or a copied badge is not evidence that it is active.
4. **Private reporting.** Enable private vulnerability reporting and add a `SECURITY.md` with the project's verified private reporting channel and support policy. Do not invent an email address or direct vulnerability details to public issues. Verify the reporting link before documenting it.
5. **GitHub Apps.** Install or grant repository access to Renovate, Socket, autofix.ci, and CodeRabbit as appropriate. Verify each app's checks appear on a test PR; copied config cannot install an app. Keep security dependency analysis independent of optional AI review.
6. **Nx Cloud.** Replace the copied Nx Cloud workspace ID and configure tokens for the new repository. Use a read-only cache token for untrusted PR builds and restrict write tokens to trusted branches. If using distributed execution, configure its agents separately; the template does not copy Table's infrastructure.
7. **Publishing, for a new library only.** Configure npm trusted publishing for each package's repository, workflow, and any protected GitHub environment. Use OIDC/provenance rather than a long-lived npm token. Review who can change the workflow and environment. Only then enable `ENABLE_RELEASES`. The TanStack Template repository itself never releases packages, adds changesets, or enables publishing.

Inspect the effective repository rules, not only legacy branch-protection settings: the reference repositories use rulesets. CODEOWNERS alone requests review; it does not require approval until a ruleset or branch protection enables that requirement.

## Keeping the baseline current

When updating Table, Hotkeys, or Pacer's build/security tooling, compare the template's workflows, action pins, dependency policies, ownership rules, and this setup guide. Keep exceptions limited to exact reviewed packages/versions; do not disable a policy to make an upgrade install.

Run Zizmor against `.github/workflows`, validate Renovate configuration, run the normal package checks, and verify the actual PR checks. After configuring GitHub settings, verify branch rules, enabled scanners, and app results separately.

References: [GitHub templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository), [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), [Renovate action pinning](https://docs.renovatebot.com/modules/manager/github-actions/).
