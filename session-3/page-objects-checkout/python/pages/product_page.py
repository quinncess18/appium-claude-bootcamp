"""ProductPage — a single product's detail screen.

Knows Add to Cart, the confirmation it produces, and how to get back to the grid
(the detail screen has no cart icon, so checkout returns via the grid).

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ProductPage:
    # --- locators ---
    ADD_TO_CART = (AppiumBy.ACCESSIBILITY_ID, "Add to Cart")
    # Snackbar reads "<Product> added to cart" after a successful add.
    CONFIRMATION = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().descriptionContains("added to cart")')

    def __init__(self, driver):
        self.driver = driver

    def add_to_cart(self):
        """Add the current product to the cart."""
        WebDriverWait(self.driver, 30).until(EC.element_to_be_clickable(self.ADD_TO_CART)).click()

    def added_to_cart(self, timeout=10):
        """True if the 'added to cart' confirmation appeared (False otherwise)."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.CONFIRMATION))
            return True
        except Exception:
            return False

    def back_to_grid(self):
        """Detail has no cart icon → go back to the grid to reach the cart."""
        self.driver.back()
