---
description: Author a new Appium test (Node + Python) from a described user flow
argument-hint: <a user flow, e.g. "search for a black dress and add it to the cart">
---

Write a new mobile UI test for the flow: **$ARGUMENTS**

Follow the project rules in `.claude/rules/test-style.md` and the facts in `CLAUDE.md`.

Steps:

1. **Confirm the screens first.** If the Appium MCP server is connected, launch the app
   (`com.taqelah.demo_app`), walk the flow by tapping through it, and read the **real**
   accessibility ids / locators for each element you need. Do **not** guess locators.
2. **Author a Page Object** for any screen that doesn't already have one
   (`test/pages/` in Node, `pages/` in Python) holding the locators + actions.
3. **Write a thin spec** that drives the flow through the page object(s) and asserts a
   meaningful post-condition. Use explicit waits; never `sleep`. Include the negative case
   where it makes sense.
4. **Provide both stacks** — WebdriverIO + Mocha *and* pytest — mirroring the repo layout.
5. **Run it** (`npm test` / `pytest`) and report the result. If it can't reach an element,
   re-inspect with MCP rather than adding waits blindly.
