# Project Context: eslint-plugin-playwright-policy

## Repository
- Package name: `eslint-plugin-playwright-policy`
- Module format: ESM (`"type": "module"`)

## Current Goal
Turn this into a publishable ESLint plugin that enforces Playwright selector policy rules.

## Implemented State
- Plugin entrypoint is `index.mjs` and is exported from package root via:
  - `package.json -> exports["."] = "./index.mjs"`
- Flat config is exposed as:
  - `plugin.configs["flat/recommended"]`
- Plugin namespace is:
  - `playwright-policy`
- Recommended config enables all rules at `warn`.

## Rules Included
- `playwright-policy/no-class-attribute-selector`
- `playwright-policy/no-class-dot-selector`
- `playwright-policy/no-class-selector-variable-flow`
- `playwright-policy/no-data-test-id-selector`
- `playwright-policy/no-id-selector`
- `playwright-policy/no-template-class-selector`

## Rule Documentation
Rule docs were added under `docs/` and follow the `brace-style.md` structure blueprint.
- `docs/no-class-attribute-selector.md`
- `docs/no-class-dot-selector.md`
- `docs/no-class-selector-variable-flow.md`
- `docs/no-data-test-id-selector.md`
- `docs/no-id-selector.md`
- `docs/no-template-class-selector.md`

`:::incorrect` / `:::correct` blocks were replaced with standard markdown headings (`### Incorrect`, `### Correct`) for compatibility.

## Package Metadata
`package.json` currently includes:
- `repository` link to GitHub repo
- `homepage` pointing to docs path on GitHub
- `engines.node: ">=20.19"`
- `peerDependencies.eslint: "^9.0.0 || ^10.0.0"`
- `files` allowlist including `index.mjs`, `rules/`, `docs/`, `README.md`, `LICENSE`

## README Updates
- Added npm link near top: `https://www.npmjs.com/package/eslint-plugin-playwright-policy`
- Added `Contributing` section with GitHub repo link.

## Publish Filtering
- `.npmignore` exists (defensive filtering)
- Main publish filtering is via `package.json -> files` allowlist

## Tests and Validation
Test suite:
- `tests/plugin.test.mjs`
- Verifies root package import and rule behavior for all six rules.

Recent validation commands that passed:
- `pnpm test`
- `pnpm lint`
- `npm_config_cache=/tmp/npm-cache npm pack --dry-run`

Dry-run tarball currently contains expected publish artifacts including `docs/*`.

## Known Caveat
`pnpm install` shows peer warnings from `typescript-eslint` with local `eslint@10`. This is a dev-tooling warning and does not block plugin publication.

## Suggested Pre-Publish Checklist
1. Confirm npm auth: `npm whoami`
2. Final package preview: `npm_config_cache=/tmp/npm-cache npm pack --dry-run`
3. Optional publish dry run: `npm publish --dry-run`
