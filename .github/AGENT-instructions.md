# Project rules for AI agents

You are working in a Playwright TypeScript automation project.
Follow these rules for every code change.

## Stack

- Playwright 1.56+ with TypeScript
- Node 20+
- Test runner: @playwright/test
- Reporter: Allure + built-in HTML
- CI: GitHub Actions, sharded

## Folder structure

- `src/pages/` — Page Object classes (one file per page)
- `src/fixtures/` — Custom fixtures extending base test
- `src/utils/` — Pure helpers, no test logic
- `tests/` — Spec files, mirror app URL structure
- `tests/data/` — JSON/CSV test data
- `specs/` — Planner output (Markdown plans)

## Coding conventions

- Import test from `src/fixtures/base.ts`, never from `@playwright/test` directly
- Use `test.describe` per feature area
- One logical assertion group per test
- Use `test.step` for readability when a flow has more than 3 actions
- File names: kebab-case (`add-to-cart.spec.ts`)

## Locator priority (STRICT — do not deviate)

1. `getByRole` with accessible name
2. `getByLabel` for form fields
3. `getByTestId` (attribute is `data-test-id`)
4. `getByText` only for genuinely static UI text
5. CSS / XPath — forbidden unless approved in PR

## Page Object contract

- One class per page, extends `BasePage`
- Constructor takes `page: Page` only
- All locators declared as `readonly` in constructor
- Action methods return `Promise<void>` OR the next page object
- No `expect()` calls inside page objects — assertions belong in tests
- No business logic in tests — put it in page objects or helpers

## Assertion rules

- Web-first assertions only (`expect(locator).toBeVisible()`)
- No `page.waitForTimeout` — ever
- No `waitForSelector` — use locator auto-waiting
- Custom timeouts only when justified in a code comment

## When adding a new test

- Mirror the app URL structure inside `tests/`
- Reuse existing page objects — do not create parallel infra
- Load test data from `tests/data/`, not inline
- Tag tests with `@smoke`, `@regression`, or `@critical` as appropriate

## Forbidden

- Do not skip or comment out failing tests to make CI green
- Do not use `page.evaluate` unless there is no MCP tool alternative
- Do not commit `.env`, credentials, `storage-state.json`, or auth tokens
- Do not modify `playwright.config.ts` without asking
- Do not add new npm dependencies without asking
- Do not use `page.pause()` in committed code

## When you (the agent) are unsure

- Ask a clarifying question before generating code
- Prefer a smaller, focused change over a big refactor
- If a required file does not exist, ask before creating it
