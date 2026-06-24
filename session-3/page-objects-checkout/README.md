# Page Objects — Search → Checkout 🧩

**Session 3 homework #2** — *"refactor one of your Session 2 tests into a Page Object."*

This takes the Session 2 **search → checkout** capstone (one flat spec with all
selectors inline) and refactors it into the **Page Object Model**: one class per
screen, locators + actions together, so the spec reads like the user's story and
a UI change is fixed in **one** place.

## The flow (unchanged)

> log in → **Shop All** → search **"black dress"** → open the first result →
> **Add to Cart** → **View Cart** → **Checkout** → fill **Shipping** → **To Payment** →
> **Review Order** → **Place Order** → assert **"Thank You!"**

## Before vs after

| Flat capstone (Session 2) | Page Objects (this) |
| --- | --- |
| every selector inline in `purchase.e2e.js` | selectors live in `pages/*` |
| `await (await $(L.loginBtn)).click()` | `await LoginPage.login(user, pass)` |
| locator change → edit the spec | locator change → edit one page class |
| reads like Appium calls | reads like the user's intent |

The spec is now just the story:

```js
await LoginPage.login(USER, PASS)
await CatalogPage.open()
await CatalogPage.search('black dress')
await CatalogPage.openFirstResult()
await ProductPage.addToCart()
await ProductPage.backToGrid()
await CatalogPage.openCart()
await CartPage.checkout()
await ShippingPage.fill(shipping)
await ShippingPage.toPayment()
await ReviewPage.placeOrder()
expect(await ThankYouPage.isConfirmed()).toBe(true)
```

## Layout

```
page-objects-checkout/
├── node/                         WebdriverIO + Mocha
│   ├── wdio.conf.js
│   └── test/
│       ├── data/shipping.js
│       ├── pages/                login · catalog · product · cart · shipping · review · thankyou
│       └── specs/purchase.e2e.js
└── python/                       pytest (instantiated-with-driver page objects)
    ├── conftest.py · data.py
    ├── pages/                     login · catalog · product · cart · shipping · review · thankyou
    └── test_purchase.py
```

> Same conventions as the mentor's `page-objects-lab`: **Node** page objects are
> singletons (`export default new LoginPage()`); **Python** classes take the
> `driver` in their constructor. One screen → one class.

## Prerequisites

- An Android emulator booted (`adb devices` shows it as `device`) — verified on a **Pixel 10 Pro XL** AVD
- Appium running on `4723`
- The demo app installed (`adb install -r DemoApp-v1.0.0.apk`)

Each test **clears the app's data** first (`mobile: clearApp` + `activateApp`) so it
starts on a fresh login screen — the demo app otherwise stays logged in across sessions.

## Run it

```bash
# 🟢 Node (WebdriverIO + Mocha)
cd node && npm install && npm test

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
test_purchase.py::test_completes_full_purchase PASSED
1 passed
```
