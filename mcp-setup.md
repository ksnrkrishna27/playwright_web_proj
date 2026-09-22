# Playwright MCP setup for this project

This repository already contains the VS Code MCP configuration in `.vscode/mcp.json`.

## Prerequisites

- Node.js 24+
- npm dependencies installed with `npm ci` or `npm install`
- Playwright browsers installed with `npx playwright install`
- VS Code with an MCP-capable agent client

Verify the local installation:

```bash
node -v
npm -v
npx playwright --version
```

## Project configuration

The configured Playwright MCP server is:

```json
{
  "servers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

The MCP server explores the live application and validates browser interactions. It does not replace `playwright.config.ts`, which controls generated test discovery and execution.

## Verify MCP in VS Code

1. Open the repository in VS Code.
2. Open the MCP/server tools view and confirm `playwright-test` is available.
3. Start the server if the client does not start it automatically.
4. Ask the agent to navigate to the configured SIT/UAT URL and take an accessibility snapshot.

Use only the configured environment. `configs/envLoader.ts` selects `configs/env.sit.json` by default and `configs/env.uat.json` when `ENV=uat`.

## Spec generator flow

Use the planner prompt to create a numbered plan in `specs/`, then use the generator prompt to create a test in `tests/web-e2e/main/`. Generated files must use the `.e2e.ts` suffix because that is the `testMatch` configured in `playwright.config.ts`.

Validate a generated test with:

```bash
npx playwright test tests/web-e2e/main/<feature>.e2e.ts --list
ENV=sit npx playwright test tests/web-e2e/main/<feature>.e2e.ts
```

On Windows PowerShell, use `$env:ENV="sit"` before the command or the existing `npm run test-SIT-Headless` script.

## Troubleshooting

| Problem | Action |
|---|---|
| MCP server is not visible | Reload VS Code and check `.vscode/mcp.json`. |
| `npx` cannot start the server | Run `npx playwright run-test-mcp-server --help`. |
| Generated test is not discovered | Confirm the path is under `tests/` and the file ends in `.e2e.ts`. |
| Wrong environment is loaded | Set `ENV=sit` or `ENV=uat` before starting the test. |
