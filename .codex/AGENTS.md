# AGENTS.md

## Project Intent
Maintain and publish `eslint-plugin-playwright-policy`, an ESM ESLint plugin enforcing Playwright selector policy.

## Source of Truth
- Entrypoint: `index.mjs`
- Rules: `rules/*.mjs`
- Rule docs: `docs/*.md`
- Tests: `tests/plugin.test.mjs`
- Package metadata: `package.json`

## Plugin API Contract
- Default export is the plugin object.
- Flat config entry: `plugin.configs["flat/recommended"]`.
- Rule namespace: `playwright-policy`.
- Do not introduce deep import requirements for consumers unless explicitly requested.

## Rule Changes
When adding or modifying rules:
1. Update rule implementation in `rules/`.
2. Ensure `meta.docs.description` exists.
3. Wire the rule in `index.mjs` (`rules` map + recommended config).
4. Add/update tests in `tests/plugin.test.mjs`.
5. Add/update docs in `docs/{rule-name}.md`.

## Documentation Conventions
- Use standard markdown headings and fenced code blocks.
- Do not use custom container syntax like `:::incorrect` / `:::correct`.
- Keep README links current for npm, docs, and GitHub.

## Packaging/Publishing
Before publishing, verify:
1. `pnpm test`
2. `pnpm lint`
3. `npm_config_cache=/tmp/npm-cache npm pack --dry-run`

NEVER publish the package, let the user do it.

Publishing expectations:
- ESM only.
- Supported runtime: Node >= 20.19.
- Peer dependency: ESLint ^9 || ^10.
- Published contents controlled by `package.json -> files`.

## Guardrails
- Avoid broad formatting rewrites unless requested.
- Prefer targeted edits.
- Do not commit generated/unnecessary local files.
- Keep examples and docs consistent with actual API exports.
