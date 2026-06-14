"""Shared Android locators for the search → checkout assignment.

ONE source of truth — selectors live here, never scattered through the test
(an assignment rule). All read from the demo app's accessibility tree
(Flutter → UiAutomator2): buttons by accessibility id, text fields by
UiAutomator class + instance (the Flutter app exposes no resource-ids).
"""

from appium.webdriver.common.appiumby import AppiumBy

UIA = AppiumBy.ANDROID_UIAUTOMATOR
AID = AppiumBy.ACCESSIBILITY_ID

# ── Login ──
USERNAME = (UIA, 'new UiSelector().className("android.widget.EditText").instance(0)')
PASSWORD = (UIA, 'new UiSelector().className("android.widget.EditText").instance(1)')
LOGIN_BTN = (AID, 'Login')

# ── Catalog landing (home) ──
SHOP_ALL_BTN = (AID, 'Shop All')

# ── Product grid / search results ──
SEARCH_INPUT = (UIA, 'new UiSelector().className("android.widget.EditText")')
FIRST_PRODUCT = (UIA, 'new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)')
# Grid app-bar buttons in order: [back/menu](0) · [sort](1) · [cart](2).
GRID_CART_BTN = (UIA, 'new UiSelector().className("android.widget.Button").instance(2)')

# ── Product detail ──
ADD_TO_CART_BTN = (AID, 'Add to Cart')
ADDED_SNACKBAR = (UIA, 'new UiSelector().descriptionContains("added to cart")')

# ── Cart ──
CART_TITLE = (AID, 'My Cart')
PROCEED_TO_CHECKOUT_BTN = (UIA, 'new UiSelector().className("android.widget.Button").description("Proceed to Checkout")')

# ── Shipping info ──
# 7 EditTexts in DOM order: 0 Full Name · 1 Address 1 · 2 Address 2 (opt) ·
# 3 City · 4 State · 5 Zip · 6 Country. UiScrollable.scrollIntoView keeps
# instance(n) addressable even when the field is below the fold.
SHIPPING_TITLE = (AID, 'Shipping Info')


def ship_field(n):
    return (
        UIA,
        'new UiScrollable(new UiSelector().scrollable(true).instance(0))'
        f'.scrollIntoView(new UiSelector().className("android.widget.EditText").instance({n}))',
    )


TO_PAYMENT_BTN = (UIA, 'new UiSelector().className("android.widget.Button").description("To Payment")')

# ── Review order ──
REVIEW_TITLE = (AID, 'Review Order')
# Place Order can fall below the fold on a long order — scroll it into view first.
PLACE_ORDER_BTN = (
    UIA,
    'new UiScrollable(new UiSelector().scrollable(true))'
    '.scrollIntoView(new UiSelector().className("android.widget.Button").description("Place Order"))',
)

# ── Thank You (the finish line) ──
THANK_YOU_TITLE = (AID, 'Thank You!')
THANK_YOU_BODY = (UIA, 'new UiSelector().descriptionContains("order has been placed successfully")')

# ── Shipping data (kept here so the flow stays data-free) ──
SHIPPING = {
    'fullName': 'Jane Doe',
    'address1': '123 Fashion Street',
    'address2': 'Unit 04-12',
    'city': 'Singapore',
    'state': 'Singapore',
    'zip': '123456',
    'country': 'Singapore',
}
