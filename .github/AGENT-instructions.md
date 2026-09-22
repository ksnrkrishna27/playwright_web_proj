# Project rules for AI agents

This repository is a Playwright TypeScript automation project. Follow these rules when generating or changing tests.

## Framework layout

- `playwright.config.ts` — Playwright configuration; tests are discovered from `tests/` and must end in `.e2e.ts`.
- `tests/web-e2e/main/` — executable end-to-end test specs.
- `tests/web-e2e/pages/` — page objects and shared locator definitions.
- `tests/web-e2e/utils/` — reusable page utilities such as `CommonPO`.
- `tests/web-e2e/test-data/` — TypeScript test-data modules and environment-specific test data.
- `configs/` — environment JSON files and `envLoader.ts`.
- `specs/` — numbered Markdown plans produced by the planner.
- `prompts/` — generator workflow prompts.
- `artifacts/` — runtime screenshots and other generated artifacts; do not use it for source files.

## Runtime and commands

- Node.js 24+ and Playwright 1.63+ are currently declared in `package.json`.
- Use `ENV=sit` or `ENV=uat`; `configs/envLoader.ts` loads `configs/env.<env>.json`.
- Available scripts are `npm run test-SIT`, `npm run test-SIT-Headless`, and `npm run test-UAT`.
- Run one generated test with `npx playwright test <path> --project=<project>`.
- Test discovery requires the `.e2e.ts` suffix. Do not generate `.spec.ts` files unless `playwright.config.ts` is changed with approval.

## Test conventions

- Import `test` and `expect` from `@playwright/test`, matching the existing tests.
- Put tests under `tests/web-e2e/main/` and use kebab-case names ending in `.e2e.ts`.
- Use `test.describe` per feature and `test.step` for multi-action flows.
- Reuse existing page objects, `locators.ts`, `CommonPO`, and `tests/web-e2e/test-data/` modules.
- Do not put business logic or raw locator details in the spec when they belong in a page object.
- Keep credentials in environment configuration; never expose credentials in generated files or output.

## Locators and waits

- Prefer accessible Playwright locators: `getByRole`, `getByLabel`, `getByPlaceholder`, and `getByText` where appropriate.
- Check existing `tests/web-e2e/pages/locators.ts` before adding a locator.
- If the current application requires an XPath or CSS locator, keep it centralized in `locators.ts` and verify it against the live page before using it.
- Use Playwright auto-waiting and state-based waits. Do not use `page.waitForTimeout()`.
- Do not use `page.evaluate()` unless there is no supported Playwright/MCP alternative.

## Assertions and safety

- Keep assertions in tests, not page objects, wherever practical.
- Preserve the original assertion intent when healing tests; never skip, weaken, or comment out a failing test.
- Do not modify `playwright.config.ts`, add dependencies, or change shared page infrastructure without human approval.
- Do not commit credentials, `.env` files, storage state, or auth tokens.
