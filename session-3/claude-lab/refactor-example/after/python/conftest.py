"""AFTER — shared driver fixture only. No locators here anymore; they moved to pages/.

The `driver` fixture is function-scoped, so each test starts on a fresh login screen.
Prereqs: emulator booted, `appium` running, demo APK installed.
"""

import os

import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options

APPIUM_HOST = os.environ.get("APPIUM_HOST", "127.0.0.1")
APPIUM_PORT = os.environ.get("APPIUM_PORT", "4723")
APPIUM_URL = f"http://{APPIUM_HOST}:{APPIUM_PORT}"

CAPABILITIES = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.taqelah.demo_app",
    "appium:appActivity": ".MainActivity",
    "appium:newCommandTimeout": 180,
}


APP_ID = "com.taqelah.demo_app"


@pytest.fixture
def driver():
    options = UiAutomator2Options().load_capabilities(CAPABILITIES)
    drv = webdriver.Remote(APPIUM_URL, options=options)
    # The demo app persists the logged-in session, and these caps launch an
    # already-installed package (no APK to fullReset), so a new session relaunches
    # straight to Home. Clear the app's data to force a fresh login screen.
    drv.execute_script("mobile: clearApp", {"appId": APP_ID})
    drv.execute_script("mobile: activateApp", {"appId": APP_ID})
    yield drv
    drv.quit()
