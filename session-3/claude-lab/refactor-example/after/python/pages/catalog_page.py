"""CatalogPage — the "All Dresses" product catalog reached from the home screen.

Owns the search box, the result grid and the empty-state marker. Tests call
open / search / open_first_result in plain language, never raw selectors.

Locators confirmed live via the Appium MCP server against com.taqelah.demo_app.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CatalogPage:
    # --- locators: the single source of truth for this screen ---
    SHOP_ALL = (AppiumBy.ACCESSIBILITY_ID, "Shop All")
    SEARCH = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(0)')
    # Product cards are clickable images; the first one is the first search hit.
    FIRST_RESULT = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)')
    NO_RESULTS = (AppiumBy.ACCESSIBILITY_ID, "No dresses found")

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        """From the home screen, open the catalog and wait until search is ready."""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.SHOP_ALL)).click()
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.SEARCH))

    def search(self, query):
        """Type a query. Focus first — the list filters reactively on text change."""
        field = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable(self.SEARCH))
        field.click()
        field.send_keys(query)

    def first_result_name(self):
        """Product name of the first result (content-desc is 'Name\\n$price')."""
        el = WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(self.FIRST_RESULT))
        return el.get_attribute("content-desc").split("\n")[0].strip()

    def open_first_result(self):
        """Open the first search result's detail screen."""
        WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable(self.FIRST_RESULT)).click()

    def no_results_shown(self, timeout=6):
        """True if the empty-state appeared (False otherwise)."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.NO_RESULTS))
            return True
        except Exception:
            return False

    def has_results(self, timeout=4):
        """True if at least one product card is visible."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.FIRST_RESULT))
            return True
        except Exception:
            return False
