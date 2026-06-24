# Rule — mobile test style

How every test in this project must be written. Claude reads this and follows it when
authoring or refactoring tests. Keep rules concrete and checkable.

## Locators

- **Order of preference:** accessibility id → id → class name → UiAutomator → xpath (last resort).
- Node: `$('~Login')`, `$('android=new UiSelector()...')`. Python: `(AppiumBy.ACCESSIBILITY_ID, "Login")`.
- The two login text fields: `UiSelector().className("android.widget.EditText").instance(0)` (username)
  and `.instance(1)` (password).
- **Never** invent a locator — confirm it against the running app (via the Appium MCP server) or an existing spec.

## Waits

- **Explicit, condition-based waits only.** Wait for a *state* (displayed / enabled / gone / text).
- ❌ Never `browser.pause()` / `await new Promise(setTimeout...)` / `time.sleep()`.
- The app shows a **splash** before login — wait for the username field, don't guess a delay.

## Structure

- Screen knowledge goes in a **Page Object**: `test/pages/*.page.js` (Node), `pages/*_page.py` (Python).
- Specs stay **thin** and read in domain language: `login(user, pass)`, `reachedHome()`.
- No locators or raw `mobile:` calls inside a spec — push them down into the page object/helpers.

## Isolation

- Each test starts on a **fresh** app state: `browser.reloadSession()` (Node `beforeEach`) /
  function-scoped `driver` fixture (pytest). Never depend on the previous test's state or run order.

## Assertions

- Assert a **visible, meaningful** post-condition (e.g. the home marker `~View All` appears).
- A test must be able to **fail** — include at least one negative case (wrong password stays on login).

## Both stacks

- When asked to add a test, provide it for **both** Node (WDIO + Mocha) and Python (pytest)
  unless told otherwise, mirroring the folder layout already in the repo.
