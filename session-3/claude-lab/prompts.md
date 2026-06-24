# Demo prompts 🤖

Copy-paste prompts for the live session. Run Claude Code **from the `claude-lab/` folder** so
it picks up `CLAUDE.md`, `.mcp.json` and `.claude/`. Each block is one thing to try.

---

## 0 · Warm-up — does Claude know the project?

```
What is this project, what app does it test, and what conventions should you follow?
```
> Claude should answer from `CLAUDE.md` + `.claude/rules/test-style.md` — proof the context loaded.

---

## 1 · MCP — drive the real device

```
Using the appium MCP server, launch the demo app and list the elements on the login screen
with their accessibility ids. Don't write a test yet — just report what's actually there.
```

```
Now type emma@demoapp.com / 10203040 and tap Login. Tell me what screen we land on and the
accessibility id that proves we're logged in.
```
> First confirm `appium` and an emulator are running, and that the `appium` MCP tools show up
> (in Claude Code: `/mcp`). This is "look before you script."

---

## 2 · Author a test from a flow

```
/new-test  search for "black dress", open the first result, and add it to the cart
```
> The `/new-test` slash command (`.claude/commands/new-test.md`) drives the whole recipe:
> inspect via MCP → page object → thin spec → both stacks → run it.

---

## 3 · Refactor the flat spec into a Page Object

```
Look at refactor-example/before/node and refactor-example/before/python. Following
.claude/rules/test-style.md, refactor each into a Page Object: move the login screen's
locators and actions into a LoginPage, and make the specs thin. Keep behaviour identical,
then run both and show me the result.
```
> Compare what Claude produces to `refactor-example/after/` — that folder is the answer key.

---

## 4 · Hunt a flaky test

```
Use the flaky-hunter agent to run refactor-example/after/python/test_login.py 10 times and
tell me if it's flaky and why.
```

```
Here's a test that fails ~1 run in 5 <paste or point to it>. Find the root cause and propose
the smallest fix. Don't apply it yet.
```
> The `flaky-hunter` sub-agent (`.claude/agents/flaky-hunter.md`) reruns in a loop, reports a
> pass rate, and names the root cause (usually a `sleep` masquerading as a wait).

---

## 5 · Guardrail check (talk about it)

```
You don't need to run this — just tell me: what would you refuse to do here based on
.claude/settings.json, and why?
```
> Surfaces the permissions model: allowed test commands + MCP, ask-before-`git push`, never read `.env`.
