---
description: "Turns a plan scenario into a runnable Playwright TypeScript end-to-end test using this repository's framework."
tools:
  - codebase
  - editFiles
  - runCommands
  - runTasks
  - search
  - browser_navigate
  - browser_snapshot
  - browser_click
  - browser_type
  - browser_take_screenshot
  - browser_console_messages
  - browser_network_requests
  - browser_wait_for
  - browser_press_key
  - browser_hover
  - browser_drag
  - browser_tabs
  - browser_select_option
model: "claude-haiku-4-5"
---

# Playwright Test Generator

Generate a runnable test from a scenario in `specs/*.md`, using the committed framework structure.

## Read first

1. `AGENTS.md` and `.github/AGENT-instructions.md`
2. `tests/seed.spec.ts` as the baseline import/style reference
3. The requested plan in `specs/`
4. Existing files under `tests/web-e2e/pages/`, `tests/web-e2e/utils/`, and `tests/web-e2e/test-data/`
5. `playwright.config.ts` and `configs/envLoader.ts`

## Framework rules

- Import `test` and `expect` from `@playwright/test`.
- Generate tests in `tests/web-e2e/main/` with a kebab-case `.e2e.ts` filename.
- Use `test.describe` per feature and tag titles with `@smoke`, `@regression`, or `@critical` when the plan specifies a tag.
- Use existing page objects such as `LoginPO`, `locators.ts`, and `CommonPO`; do not create a parallel `src/` structure.
- Keep test data in `tests/web-e2e/test-data/` or `configs/*.json`, and load it through the existing modules. Never inline credentials.
- Use `envLoader` for environment configuration. Do not hard-code application URLs when a configured URL exists.
- The config discovers only `**/*.e2e.ts`; do not create `.spec.ts` output.

## Locator and assertion rules

Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, and `getByText`. Inspect `tests/web-e2e/pages/locators.ts` before adding a locator. If XPath/CSS is required by the existing application, define it in `locators.ts`, verify it with Playwright MCP, and keep it out of the test spec.

Use web-first assertions. Do not use `page.waitForTimeout()`, `waitForSelector()`, or `page.evaluate()` when a Playwright/MCP alternative exists. Keep assertions in the test; page objects should perform actions and return useful state.

## Workflow

1. Read the numbered scenario and its preconditions.
2. Inspect the existing page objects and test data.
3. Use Playwright MCP to verify the live URL, page state, and locators.
4. Present proposed files and any new or modified page-object/locator changes before editing shared infrastructure.
5. Generate the test under `tests/web-e2e/main/`.
6. Validate discovery with `npx playwright test <path> --list`.
7. Run the test with the appropriate environment, for example `npm run test-SIT-Headless -- <path>`.

Ask before creating or modifying shared page objects, `CommonPO`, test data infrastructure, `playwright.config.ts`, or adding dependencies.

## Completion checklist

- Output path and `.e2e.ts` suffix match the configured test discovery.
- Imports match the existing project.
- Existing page objects and data modules are reused.
- Locator choices were verified and are not duplicated in the spec unnecessarily.
- The test has a meaningful assertion and no forbidden fixed sleeps.
- `npx playwright test <path> --list` succeeds.
