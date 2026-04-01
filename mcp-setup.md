# Playwright MCP Setup Guide
> Windows | TypeScript/Node.js | VS Code + GitHub Copilot

---

## Prerequisites

- **Node.js** (LTS version) — download from [nodejs.org](https://nodejs.org)
- **VS Code** with **GitHub Copilot** extension (free tier works)

Verify Node.js is installed:
```bash
node -v
npm -v
```

---

## How It Works

```
You (chat prompt)
      ↓
GitHub Copilot — Agent Mode   ← the AI client in VS Code
      ↓
Playwright MCP server         ← executes browser actions
      ↓
Real browser (Chromium)
```

> ⚠️ The AI client here is **GitHub Copilot**, not Claude Code.  
> Claude Code is a separate paid product and is NOT required for this setup.

---

## Step 1 — Install Playwright in your framework

Inside your existing project folder:

```bash
npm install @playwright/test
npx playwright install
```

---

## Step 2 — Create the MCP config file

In your project root, create a `.vscode` folder if it doesn't exist.  
Inside it, create a file named `mcp.json`:

```
my-framework/
├── .vscode/
│   └── mcp.json     ← create this
├── tests/
├── playwright.config.ts
└── package.json
```

Add this content to `mcp.json`:

```json
{
  "servers": {
    "playwright-mcp": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "type": "stdio"
    }
  }
}
```

---

## Step 3 — Verify the server is running

1. Press `Ctrl+Shift+P`
2. Type **MCP: List Servers** and press Enter
3. You should see **playwright-mcp** in the list
4. Click **Start** if it isn't running yet

---

## Step 4 — Test it in VS Code

1. Open **GitHub Copilot Chat** (`Ctrl+Shift+I`)
2. Switch to **Agent mode** (dropdown at the bottom of the chat panel)
3. Click **Configure Tools** — confirm **playwright-mcp** appears in the list
4. Try this prompt:

```
Open a browser and go to google.com, then take a screenshot
```

Copilot will use Playwright MCP to launch a real browser and execute the task.

---

## Step 5 — Use it for your test work

Now you can ask Copilot things like:

- *"Write a Playwright test for the login page at localhost:3000"*
- *"My test is failing on this selector — debug it"*
- *"Generate a Page Object Model for this URL"*
- *"Convert this manual test case into a Playwright spec"*

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Playwright not showing in tools list | Check `.vscode/mcp.json` uses `"servers"` not `"mcpServers"` |
| Server shows red dot | Run `npx @playwright/mcp@latest --help` in terminal to verify npx works |
| Tools not visible in Copilot chat | Make sure you are in **Agent mode**, not Ask or Edit mode |
| Changes to mcp.json not picked up | Press `Ctrl+Shift+P` → **Developer: Reload Window** |

---

## Want to use Claude instead of Copilot?

If you prefer Claude as the AI client, use **Claude Desktop** (free to download).  
The `mcp.json` config format is slightly different for Claude Desktop:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Claude Desktop config file location on Windows:
```
%APPDATA%\Claude\claude_desktop_config.json
```

---

*Setup verified for VS Code on Windows with TypeScript/Node.js Playwright framework.*