# Project rules for AI agents

You are working in a Playwright TypeScript automation project. Follow these rules for every code change.

## Stack

- Playwright 1.63+ with TypeScript
- Node.js 24+
- Test runner: `@playwright/test`
- Test discovery: `tests/**/*.e2e.ts`
- Reports: Playwright HTML reporter
- CI: GitHub Actions

## Folder structure

- `tests/web-e2e/main/` — executable end-to-end tests
- `tests/web-e2e/pages/` — page objects and shared locators
- `tests/web-e2e/utils/` — reusable page utilities
- `tests/web-e2e/test-data/` — TypeScript test-data modules
- `configs/` — environment JSON files and `envLoader.ts`
- `specs/` — planner output (Markdown plans)
- `prompts/` — generator workflow prompts
- `artifacts/` — runtime screenshots and generated artifacts

## Coding conventions

- Import `test` and `expect` from `@playwright/test`, matching the existing tests.
- Place generated tests in `tests/web-e2e/main/` with kebab-case names ending in `.e2e.ts`.
- Use `test.describe` per feature area and `test.step` for flows with more than three actions.
- Reuse existing page objects, `locators.ts`, `CommonPO`, and test-data modules.
- Keep business logic in page objects or helpers, not in the spec.

## Locator priority

Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, and `getByText`. Check `tests/web-e2e/pages/locators.ts` before adding a locator. If XPath or CSS is required by the application, centralize it in `locators.ts` and verify it through Playwright MCP.

## Assertions and waits

- Use web-first assertions in tests.
- Do not use `page.waitForTimeout()` or `waitForSelector()`.
- Use Playwright auto-waiting or state-based waits.
- Do not put `expect()` calls in page objects unless an existing project pattern requires it.

## Environment and safety

- `ENV=sit` or `ENV=uat` selects `configs/env.<env>.json` through `configs/envLoader.ts`.
- Never commit credentials, `.env` files, storage state, or auth tokens.
- Do not modify `playwright.config.ts`, shared page infrastructure, or add npm dependencies without approval.
- Do not skip, fixme, weaken, or comment out failing tests.
