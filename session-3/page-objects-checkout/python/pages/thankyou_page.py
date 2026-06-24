"""ThankYouPage — the order-confirmation screen (the finish line).

Locators carried over verified from the Session 2 search->checkout capstone.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class ThankYouPage:
    # --- locators ---
    TITLE = (AppiumBy.ACCESSIBILITY_ID, "Thank You!")
    BODY = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().descriptionContains("order has been placed successfully")')

    def __init__(self, driver):
        self.driver = driver

    def is_confirmed(self, timeout=20):
        """Wait for the confirmation; True when both the title and the message are shown."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.TITLE))
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.BODY))
            return True
        except Exception:
            return False
