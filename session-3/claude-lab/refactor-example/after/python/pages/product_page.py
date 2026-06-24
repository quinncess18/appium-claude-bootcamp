"""ProductPage — a single product's detail screen.

Knows the Add to Cart action and the confirmation it produces.

Locators confirmed live via the Appium MCP server against com.taqelah.demo_app.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ProductPage:
    # --- locators ---
    ADD_TO_CART = (AppiumBy.ACCESSIBILITY_ID, "Add to Cart")
    # Snackbar reads "<Product> added to cart" after a successful add.
    CONFIRMATION = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().descriptionContains("added to cart")')
    VIEW_CART = (AppiumBy.ACCESSIBILITY_ID, "VIEW CART")

    def __init__(self, driver):
        self.driver = driver

    def add_to_cart(self):
        """Add the current product to the cart."""
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable(self.ADD_TO_CART)).click()

    def added_to_cart(self, timeout=6):
        """True if the 'added to cart' confirmation appeared (False otherwise)."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.CONFIRMATION))
            return True
        except Exception:
            return False

    def confirmation_text(self):
        """Text of the confirmation snackbar (e.g. 'Little Black Dress added to cart')."""
        return self.driver.find_element(*self.CONFIRMATION).get_attribute("content-desc")
