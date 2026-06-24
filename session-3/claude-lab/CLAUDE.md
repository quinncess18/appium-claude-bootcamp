# CLAUDE.md — project context for the bootcamp test suite

> Claude Code loads this file at the start of every session. It's how you tell Claude what
> this project is, the conventions to follow, and the commands to run — so its output matches
> *your* house style instead of generic boilerplate. Keep it short and current.

## What this project is

A mobile UI test suite for **`taqelah/demo-app`** (a Flutter app), automated with **Appium 3.x**
on the **UiAutomator2** driver (Android). Tests are written in **two** stacks:

- **Node** — WebdriverIO v9 + Mocha (`*.e2e.js`, ES modules)
- **Python** — Appium-Python-Client + pytest (`test_*.py`)

## App facts

- App package / activity: `com.taqelah.demo_app` / `.MainActivity`
- Login credentials: `emma@demoapp.com` / `10203040`
- There is a **splash screen** before login — always wait for the username field, never `sleep`.
- Post-login home screen is identified by the accessibility id **`View All`**.

## Conventions (see .claude/rules/test-style.md for the full list)

- **Locators:** prefer accessibility id (`~Name` / `AppiumBy.ACCESSIBILITY_ID`); the two login
  text fields are reached by `UiSelector().className("android.widget.EditText").instance(0|1)`.
- **Waits:** explicit/condition-based only. **Never** `browser.pause` / `time.sleep`.
- **Structure:** screen knowledge belongs in a **Page Object** (`test/pages/` in Node,
  `pages/` in Python) — tests stay thin and read in domain language.
- **Isolation:** each test starts on a fresh login screen (`reloadSession` / function-scoped fixture).

## Driving a real device

This project has an Appium MCP server wired up in [`.mcp.json`](.mcp.json). When it's connected,
you can launch the app, inspect the screen, and read real locators **before** writing a test —
ask to "open the app and list the elements on the login screen."

## Commands

```bash
# Node (from a node/ folder)
npm install
npm test                 # wdio run ./wdio.conf.js

# Python (from a python/ folder)
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
pytest

# Appium + emulator (keep running in their own terminals)
emulator -avd <your-avd>
appium                   # http://127.0.0.1:4723
adb devices              # confirm the emulator is "device", not offline
```

## Guardrails

- Don't invent locators — confirm them against the running app (MCP) or the existing specs.
- Keep credentials in test data, not scattered across specs; never commit secrets/tokens.
- Always review generated tests by running them; a test that never fails is worthless.
