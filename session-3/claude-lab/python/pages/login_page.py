"""LoginPage — all knowledge of the login screen (locators + actions).

Locators confirmed live against com.taqelah.demo_app (look-before-you-script).
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class LoginPage:
    # --- locators ---
    USERNAME = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(0)')
    PASSWORD = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(1)')
    LOGIN = (AppiumBy.ACCESSIBILITY_ID, "Login")
    HOME = (AppiumBy.ACCESSIBILITY_ID, "View All")  # only on the post-login home screen
    # Inline error on a rejected login: content-desc starts "Invalid username or password."
    ERROR = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().descriptionContains("Invalid username or password")')

    def __init__(self, driver):
        self.driver = driver

    def wait_until_ready(self):
        """Wait past the splash until the login screen is interactive."""
        return WebDriverWait(self.driver, 25).until(EC.visibility_of_element_located(self.USERNAME))

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

    def error_shown(self, timeout=10):
        """True if the invalid-credentials error appeared."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.ERROR))
            return True
        except Exception:
            return False

    def on_login_screen(self, timeout=5):
        """True if the username field is visible (still on the login screen)."""
        try:
            WebDriverWait(self.driver, timeout).until(EC.visibility_of_element_located(self.USERNAME))
            return True
        except Exception:
            return False
