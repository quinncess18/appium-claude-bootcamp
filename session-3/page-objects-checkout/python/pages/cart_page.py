"""CartPage — the "My Cart" screen. Confirms the cart loaded and starts checkout.

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CartPage:
    # --- locators ---
    TITLE = (AppiumBy.ACCESSIBILITY_ID, "My Cart")
    PROCEED_TO_CHECKOUT = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.Button").description("Proceed to Checkout")')

    def __init__(self, driver):
        self.driver = driver

    def wait_loaded(self):
        """Wait until the cart screen is shown."""
        WebDriverWait(self.driver, 20).until(EC.visibility_of_element_located(self.TITLE))

    def checkout(self):
        """Confirm the cart loaded, then proceed to checkout."""
        self.wait_loaded()
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.PROCEED_TO_CHECKOUT)).click()
