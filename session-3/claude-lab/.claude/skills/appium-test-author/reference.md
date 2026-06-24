# Locator & gesture cheat-sheet — demo app

Loaded on demand by the `appium-test-author` skill. Keep it factual and current.

## Locator preference order

1. **accessibility id** — `$('~Login')` (Node) · `(AppiumBy.ACCESSIBILITY_ID, "Login")` (Python)
2. **id**
3. **class name**
4. **UiAutomator** — `$('android=new UiSelector()...')`
5. **xpath** — last resort only

> Never invent a locator. Confirm it against the running app (Appium MCP) or an existing spec.

## Known locators (com.taqelah.demo_app)

| Element | Locator |
|---|---|
| Username field | `UiSelector().className("android.widget.EditText").instance(0)` |
| Password field | `UiSelector().className("android.widget.EditText").instance(1)` |
| Login button | accessibility id `Login` |
| Home marker (post-login) | accessibility id `View All` |

Credentials: `emma@demoapp.com` / `10203040`. There is a **splash** before login — wait for
the username field, never guess a delay.

## Waits (explicit, condition-based)

```js
// Node (WDIO)
await $('~Login').waitForDisplayed({ timeout: 20000 });
```

```python
# Python (Appium + Selenium waits)
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
WebDriverWait(driver, 20).until(EC.element_to_be_clickable(USERNAME))
```

❌ Never `browser.pause()` · `await new Promise(setTimeout...)` · `time.sleep()`.

## Gestures / scrolling

```js
// Node — scroll a target into view via UiScrollable
await $('android=new UiScrollable(new UiSelector().scrollable(true))'
      + '.scrollIntoView(new UiSelector().description("View All"))');
```

```python
# Python — W3C-style tap / scroll via the appium mobile: commands
driver.execute_script("mobile: scrollGesture", {
    "left": 100, "top": 400, "width": 600, "height": 800,
    "direction": "down", "percent": 1.0,
})
```

## Isolation

Each test starts on a **fresh** app state: `browser.reloadSession()` (Node `beforeEach`) /
function-scoped `driver` fixture (pytest). Never depend on the previous test's state.
