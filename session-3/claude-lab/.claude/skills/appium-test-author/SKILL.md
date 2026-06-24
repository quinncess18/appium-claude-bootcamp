---
name: appium-test-author
description: >-
  How this project authors and runs Appium UI tests for the demo app
  (com.taqelah.demo_app). Use when writing, refactoring, or debugging a mobile
  UI test, or generating one from a described user flow. Covers locator
  strategy, explicit waits, Page Objects, and running both the Node (WDIO) and
  Python (pytest) stacks.
allowed-tools: Bash, Read, Write, Edit
---

# Authoring Appium tests for the demo app

Follow this whenever you write or change a test. The full conventions live in
`.claude/rules/test-style.md`; the app facts live in `CLAUDE.md`. This skill is the
quick playbook plus a locator/gesture cheat-sheet in `@reference.md`.

## The recipe (always, in order)

1. **Look before you script.** If the Appium MCP server is connected, launch
   `com.taqelah.demo_app`, walk the flow, and read the **real** accessibility ids.
   Never invent a locator — confirm it on the running app or in an existing spec.
2. **Page Object first.** Screen knowledge (locators + actions) goes in a Page Object
   (`test/pages/*.page.js` in Node, `pages/*_page.py` in Python). Specs stay thin and
   read in domain language: `login(user, pass)` → `reachedHome()`.
3. **Explicit waits only.** Wait for a *state* (displayed / enabled / gone). Never
   `browser.pause()` / `time.sleep()` — the no-sleep hook will reject it anyway.
4. **Both stacks.** Provide the test for **Node (WDIO + Mocha)** and **Python (pytest)**,
   mirroring the repo layout, unless told otherwise.
5. **Run it and report.** `npm test` / `pytest`. If an element can't be reached,
   re-inspect via MCP rather than padding with waits. Include at least one negative case.

## Locators & gestures

See `@reference.md` for the locator preference order, the demo app's known locators
(login fields, Login button, the `View All` home marker), and gesture/scroll syntax for
both stacks.
