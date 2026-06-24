"""ReviewPage — the "Review Order" screen and the final Place Order action.

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ReviewPage:
    # --- locators ---
    TITLE = (AppiumBy.ACCESSIBILITY_ID, "Review Order")
    # Place Order can fall below the fold on a long order — scroll it into view first.
    PLACE_ORDER = (
        AppiumBy.ANDROID_UIAUTOMATOR,
        'new UiScrollable(new UiSelector().scrollable(true))'
        '.scrollIntoView(new UiSelector().className("android.widget.Button").description("Place Order"))',
    )

    def __init__(self, driver):
        self.driver = driver

    def place_order(self):
        """Confirm the review screen, then place the order."""
        WebDriverWait(self.driver, 20).until(EC.visibility_of_element_located(self.TITLE))
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.PLACE_ORDER)).click()
