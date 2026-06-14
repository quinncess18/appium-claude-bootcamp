# Assignment — Search → Checkout 🛒

The Session 2 capstone: automate **one real end-to-end purchase** on the
[`taqelah/demo-app`](https://github.com/taqelah/demo-app/releases/tag/v1.0.0),
applying everything from today — **explicit waits**, **shared locators**, and
**splash handling** — in **both Node (WebdriverIO) and Python (pytest)**.

## The flow

1. **Log in** (`emma@demoapp.com` / `10203040`)
2. **Shop All** → search **"black dress"**
3. Open the **first result** (*Little Black Dress*)
4. **Add to Cart** → **View Cart** → **Checkout**
5. Fill **Shipping Info** (name, address, city, state, zip, country) → **To Payment**
6. **Review Order** → **Place Order**

✅ **Done when** it asserts the confirmation: **"Thank You!"** + *"Your order has been placed successfully."*

## Rules honored

- 🚫 **No `sleep()`** — every step syncs on an explicit condition (`waitForDisplayed` / `WebDriverWait`).
- 🧩 **Locators in a shared helper** — `node/test/helpers/locators.js` and `python/locators.py`, never scattered in the spec.
- ⏳ **Waits past the splash** before the first interaction.

## Layout

```
assignment-search-checkout/
├── node/                     WebdriverIO + Mocha
│   ├── wdio.conf.js
│   ├── data/shipping.js
│   └── test/
│       ├── helpers/locators.js   shared selectors
│       └── specs/purchase.e2e.js the flow
└── python/                   pytest
    ├── conftest.py               driver fixture
    ├── locators.py               shared selectors + shipping data
    └── test_purchase.py          the flow
```

## Prerequisites

- An Android emulator booted (`adb devices` shows it as `device`)
- Appium running on port 4723 (`appium`)
- The demo app installed: `adb install -r DemoApp-v1.0.0.apk`

> 💡 The demo app's Gesture/scroll behavior is screen-size sensitive — this flow
> was verified on a **Pixel 10 Pro XL** AVD (tall screen), the device the course
> material is calibrated against.

## Run it

```bash
# 🟢 Node (WebdriverIO + Mocha)
cd node
npm install        # first time only
npm test

# 🐍 Python (pytest)
cd python
python -m venv .venv && source .venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
pytest -v
```

## Expected result ✅

```
# Node
 ✓ completes a full purchase and lands on the Thank You screen
1 passing

# Python
test_purchase.py::test_search_to_checkout PASSED
1 passed
```
