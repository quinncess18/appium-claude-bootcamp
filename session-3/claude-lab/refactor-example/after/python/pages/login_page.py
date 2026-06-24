"""AFTER — the LoginPage Page Object (what Claude produces from the flat test).

All knowledge of the login screen lives here: its locators and how to drive it.
Tests call `LoginPage(driver).login(...)` / `.reached_home()` in plain language.
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class LoginPage:
    # --- locators: the single source of truth for this screen ---
    USERNAME = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(0)')
    PASSWORD = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(1)')
    LOGIN = (AppiumBy.ACCESSIBILITY_ID, "Login")
    HOME = (AppiumBy.ACCESSIBILITY_ID, "View All")   # only on the post-login home screen

    def __init__(self, driver):
        self.driver = driver

    def wait_until_ready(self):
        """Wait past the splash until the login screen is interactive."""
        return WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(self.USERNAME))

    def login(self, user, password):
        """Fill the form and submit."""
        username = self.wait_until_ready()
        username.click()
        username.send_keys(user)

        pwd = self.driver.find_element(*self.PASSWORD)
        pwd.click()
        pwd.send_keys(password)

        self.driver.find_element(*self.LOGIN).click()

    def reached_home(self, timeout=6):
        """True if the home screen appeared (False for a rejected login)."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.HOME))
            return True
        except Exception:
            return False
