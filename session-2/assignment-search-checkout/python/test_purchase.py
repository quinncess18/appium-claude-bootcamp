"""Session 2 · Assignment — search → checkout (Python / Appium-Python-Client + pytest).

One real end-to-end purchase on the taqelah/demo-app (Flutter):
  log in → Shop All → search "black dress" → open the first result →
  Add to Cart → View Cart → Checkout → fill Shipping → To Payment →
  Review Order → Place Order → assert the "Thank You!" confirmation.

Rules applied (from the assignment):
  • no sleep() — every step syncs on an EXPLICIT condition (WebDriverWait)
  • locators live in a SHARED module (locators.py)
  • we wait past the SPLASH before the first interaction

Prereqs (see ../README.md): emulator booted · Appium on 4723 · demo APK installed.
Run:  pip install -r requirements.txt  &&  pytest -v
"""

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import locators as L

USER = "emma@demoapp.com"
PASS = "10203040"
SEARCH = "black dress"


def _visible(driver, locator, timeout=20):
    """Explicit wait → return the element once it's visible."""
    return WebDriverWait(driver, timeout).until(EC.visibility_of_element_located(locator))


def test_search_to_checkout(driver):
    # ── 1 · Past the splash → log in ──
    username = _visible(driver, L.USERNAME, timeout=25)  # absorbs the splash delay
    username.click()
    username.send_keys(USER)

    password = _visible(driver, L.PASSWORD)
    password.click()
    password.send_keys(PASS)

    _visible(driver, L.LOGIN_BTN).click()

    # ── 2 · Landing → Shop All ──
    _visible(driver, L.SHOP_ALL_BTN).click()

    # ── 3 · Search "black dress" (the grid filters in place as you type) ──
    search = _visible(driver, L.SEARCH_INPUT)
    search.click()
    search.clear()
    search.send_keys(SEARCH)
    try:
        driver.hide_keyboard()
    except Exception:
        pass  # keyboard already down

    # ── 4 · Open the first result (Little Black Dress) ──
    _visible(driver, L.FIRST_PRODUCT).click()

    # ── 5 · Add to Cart → confirm via the snackbar ──
    _visible(driver, L.ADD_TO_CART_BTN, timeout=30).click()
    _visible(driver, L.ADDED_SNACKBAR, timeout=10)

    # ── 6 · View Cart (Detail has no cart icon → back to the grid, tap cart) ──
    driver.back()
    _visible(driver, L.GRID_CART_BTN).click()

    # ── 7 · Cart → Checkout ──
    _visible(driver, L.CART_TITLE)
    _visible(driver, L.PROCEED_TO_CHECKOUT_BTN).click()

    # ── 8 · Shipping info — fill all 7 fields ──
    _visible(driver, L.SHIPPING_TITLE)
    values = [
        L.SHIPPING["fullName"], L.SHIPPING["address1"], L.SHIPPING["address2"],
        L.SHIPPING["city"], L.SHIPPING["state"], L.SHIPPING["zip"], L.SHIPPING["country"],
    ]
    for i, value in enumerate(values):
        field = _visible(driver, L.ship_field(i), timeout=15)
        field.click()
        field.clear()
        if value:
            field.send_keys(value)
        # Hide the keyboard between fields — while it's up Flutter collapses the
        # unfocused EditTexts in the a11y tree, so the next instance(n) lookup
        # could miss. (An action, not a sleep.)
        try:
            driver.hide_keyboard()
        except Exception:
            pass

    _visible(driver, L.TO_PAYMENT_BTN).click()

    # ── 9 · Review Order → Place Order ──
    _visible(driver, L.REVIEW_TITLE)
    _visible(driver, L.PLACE_ORDER_BTN).click()

    # ── 10 · Done — assert the confirmation ──
    title = _visible(driver, L.THANK_YOU_TITLE)
    assert title.is_displayed(), "Expected the 'Thank You!' confirmation after Place Order"
    body = _visible(driver, L.THANK_YOU_BODY)
    assert body.is_displayed(), "Expected the order-placed-successfully message"
