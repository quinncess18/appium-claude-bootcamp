"""Cloud Devices lab (Python). The SAME test runs local or cloud.

The driver fixture (conftest.py) switches endpoint + caps on TARGET; this test
never changes. Run local:  pytest        Run cloud:  TARGET=cloud pytest
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

USER = "emma@demoapp.com"
PASS = "10203040"

UIA = AppiumBy.ANDROID_UIAUTOMATOR
AID = AppiumBy.ACCESSIBILITY_ID

USERNAME = (UIA, 'new UiSelector().className("android.widget.EditText").instance(0)')
PASSWORD = (UIA, 'new UiSelector().className("android.widget.EditText").instance(1)')
LOGIN_BTN = (AID, "Login")
HOME_MARKER = (AID, "View All")  # only present on the post-login home screen


def _visible(driver, locator, timeout=20):
    return WebDriverWait(driver, timeout).until(EC.visibility_of_element_located(locator))


def test_valid_login_reaches_home(driver):
    # Wait past the splash until the login form is interactive.
    username = _visible(driver, USERNAME, timeout=25)
    username.click()
    username.send_keys(USER)

    password = _visible(driver, PASSWORD)
    password.click()
    password.send_keys(PASS)

    _visible(driver, LOGIN_BTN).click()

    # Success is the home marker becoming visible — a real, meaningful post-condition.
    home = _visible(driver, HOME_MARKER)
    assert home.is_displayed(), "Expected the post-login home marker (~View All)"
