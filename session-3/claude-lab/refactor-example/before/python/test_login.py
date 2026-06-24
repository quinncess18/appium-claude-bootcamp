"""BEFORE — a flat login test (the Session 2 style).

Locators, the splash wait, the flow and the assertions all live in this one file.
It works, but the same locators get copy-pasted into every new test and the screen
knowledge is trapped here. This is the file you hand to Claude and ask it to refactor
into a Page Object (see ../after for the result, ../../prompts.md for the ask).

Prereqs: emulator booted, `appium` running, demo APK installed.
"""

import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

APPIUM_URL = "http://127.0.0.1:4723"

CAPABILITIES = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.taqelah.demo_app",
    "appium:appActivity": ".MainActivity",
    "appium:newCommandTimeout": 180,
}

USERNAME = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(0)')
PASSWORD = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().className("android.widget.EditText").instance(1)')
LOGIN = (AppiumBy.ACCESSIBILITY_ID, "Login")
HOME = (AppiumBy.ACCESSIBILITY_ID, "View All")   # only on the post-login home screen


@pytest.fixture
def driver():
    options = UiAutomator2Options().load_capabilities(CAPABILITIES)
    drv = webdriver.Remote(APPIUM_URL, options=options)
    # The demo app persists the logged-in session, so a new session relaunches
    # straight to Home. Clear the app's data to force a fresh login screen.
    drv.execute_script("mobile: clearApp", {"appId": "com.taqelah.demo_app"})
    drv.execute_script("mobile: activateApp", {"appId": "com.taqelah.demo_app"})
    yield drv
    drv.quit()


def test_valid_login_reaches_home(driver):
    wait = WebDriverWait(driver, 20)
    username = wait.until(EC.element_to_be_clickable(USERNAME))   # waits past the splash
    username.click()
    username.send_keys("emma@demoapp.com")

    password = driver.find_element(*PASSWORD)
    password.click()
    password.send_keys("10203040")

    driver.find_element(*LOGIN).click()

    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located(HOME))


def test_wrong_password_stays_on_login(driver):
    wait = WebDriverWait(driver, 20)
    username = wait.until(EC.element_to_be_clickable(USERNAME))
    username.click()
    username.send_keys("emma@demoapp.com")

    password = driver.find_element(*PASSWORD)
    password.click()
    password.send_keys("wrongpass")

    driver.find_element(*LOGIN).click()

    reached_home = False
    try:
        WebDriverWait(driver, 6).until(EC.visibility_of_element_located(HOME))
        reached_home = True
    except Exception:
        reached_home = False
    assert reached_home is False
