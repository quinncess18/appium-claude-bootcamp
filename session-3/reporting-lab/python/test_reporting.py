"""Reporting lab (Python) — one green result and one red one for the report demo.

Both cases log in successfully; the second FAILS on a deliberate assertion, which makes the
conftest hook save fail-<name>.png. Run:
    pytest --html=report.html --self-contained-html
"""

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

USERNAME = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(0)')
PASSWORD = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(1)')
LOGIN = (AppiumBy.ACCESSIBILITY_ID, "Login")
HOME = (AppiumBy.ACCESSIBILITY_ID, "View All")   # only on the post-login home screen

USER = "emma@demoapp.com"
PASS = "10203040"


def _login(driver, user, password):
    """Log in and wait until the home screen is shown."""
    username = WebDriverWait(driver, 20).until(EC.element_to_be_clickable(USERNAME))  # past splash
    username.click()
    username.send_keys(user)

    pwd = driver.find_element(*PASSWORD)
    pwd.click()
    pwd.send_keys(password)

    driver.find_element(*LOGIN).click()
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located(HOME))   # confirm logged in


def test_passing_login(driver):
    _login(driver, USER, PASS)
    assert driver.find_element(*HOME).is_displayed() is True


def test_failing_login_assertion(driver):
    _login(driver, USER, PASS)
    # Login succeeded — we ARE on the home screen. This assertion is WRONG on purpose so the
    # report shows a red result with a screenshot (fail-test_failing_login_assertion.png).
    assert driver.find_element(*HOME).is_displayed() is False
