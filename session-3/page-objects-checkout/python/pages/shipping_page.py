"""ShippingPage — the checkout shipping form (7 fields) and the "To Payment" action.

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ShippingPage:
    # --- locators ---
    TITLE = (AppiumBy.ACCESSIBILITY_ID, "Shipping Info")
    TO_PAYMENT = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.Button").description("To Payment")')

    # Field order in the form: 0 Full Name · 1 Address 1 · 2 Address 2 (opt) ·
    # 3 City · 4 State · 5 Zip · 6 Country.
    _FIELD_ORDER = ["fullName", "address1", "address2", "city", "state", "zip", "country"]

    def __init__(self, driver):
        self.driver = driver

    @staticmethod
    def _field(n):
        # UiScrollable.scrollIntoView keeps instance(n) addressable even when the
        # field is below the fold.
        return (
            AppiumBy.ANDROID_UIAUTOMATOR,
            'new UiScrollable(new UiSelector().scrollable(true).instance(0))'
            f'.scrollIntoView(new UiSelector().className("android.widget.EditText").instance({n}))',
        )

    def fill(self, data):
        """Fill all 7 shipping fields from a data dict."""
        WebDriverWait(self.driver, 20).until(EC.visibility_of_element_located(self.TITLE))
        for i, key in enumerate(self._FIELD_ORDER):
            field = WebDriverWait(self.driver, 15).until(
                EC.visibility_of_element_located(self._field(i))
            )
            field.click()
            field.clear()
            value = data.get(key, "")
            if value:
                field.send_keys(value)
            # Hide the keyboard between fields — while it's up Flutter collapses the
            # unfocused EditTexts in the a11y tree, so the next instance(n) lookup
            # could miss. (An action, not a sleep.)
            try:
                self.driver.hide_keyboard()
            except Exception:
                pass

    def to_payment(self):
        """Continue to the review step."""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.TO_PAYMENT)).click()
