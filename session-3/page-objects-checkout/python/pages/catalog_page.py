"""CatalogPage — the product catalog/grid reached from the home screen.

Owns the "Shop All" entry, the search box, the result grid, and the grid's
cart icon.

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CatalogPage:
    # --- locators: the single source of truth for this screen ---
    SHOP_ALL = (AppiumBy.ACCESSIBILITY_ID, "Shop All")
    SEARCH = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText")')
    # Product cards are clickable images; the first one is the first search hit.
    FIRST_RESULT = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)')
    # Grid app-bar buttons in order: [back/menu](0) · [sort](1) · [cart](2).
    CART_ICON = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.Button").instance(2)')

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        """From the home screen, open the catalog and wait until search is ready."""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.SHOP_ALL)).click()
        WebDriverWait(self.driver, 20).until(EC.visibility_of_element_located(self.SEARCH))

    def search(self, query):
        """Type a query. Focus first — the grid filters reactively as you type."""
        field = WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.SEARCH))
        field.click()
        field.clear()
        field.send_keys(query)
        try:
            self.driver.hide_keyboard()
        except Exception:
            pass  # keyboard already down

    def open_first_result(self):
        """Open the first search result's detail screen."""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.FIRST_RESULT)).click()

    def open_cart(self):
        """Tap the grid's cart icon to open the cart."""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.CART_ICON)).click()
