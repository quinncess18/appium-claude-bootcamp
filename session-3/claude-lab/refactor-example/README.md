# Refactor example — flat spec → Page Object 🧩

A **before/after** pair you'll recreate live by asking Claude to do the refactor for you.
Same two login cases, same green result — only the **structure** changes.

```
refactor-example/
├── before/      flat login spec — locators + flow + asserts all in one file
│   ├── node/    WebdriverIO + Mocha
│   └── python/  pytest
└── after/       Page Object — screen knowledge lives in a LoginPage class
    ├── node/    test/pages/login.page.js  +  slim test/specs/login.e2e.js
    └── python/  pages/login_page.py       +  slim test_login.py
```

## The point

| | Before | After |
|---|--------|-------|
| Locators | copy-pasted into every test | one place — the page object |
| A test reads like | selectors + waits + clicks | `login(user, pass)` → `reachedHome()` |
| New screen change | edit every test | edit one page object |

## Run either side (same result ✅)

Prereqs: emulator booted · `appium` running · demo APK installed (see the lab README).

```bash
# Node — before, then after
cd before/node && npm install && npm test
cd ../../after/node && npm install && npm test

# Python — before, then after
cd before/python  && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pytest
cd ../../after/python && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && pytest
```

> 🤖 **Don't hand-write `after/` — let Claude.** Open Claude in `claude-lab/`, point it at
> `before/`, and use the refactor prompt in [`../prompts.md`](../prompts.md). What it generates
> should look like `after/`. This folder is the answer key.
