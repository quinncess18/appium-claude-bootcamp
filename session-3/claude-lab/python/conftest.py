"""Function-scoped driver fixture — each test starts on a fresh login screen.

The demo app persists login across sessions, so a new session relaunches straight
to Home; clear the app's data + relaunch to force the login screen.
Prereqs: emulator booted, `appium` on 4723, demo APK installed.
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
    "appium:newCommandTimeout": 240,
}


@pytest.fixture
def driver():
    options = UiAutomator2Options().load_capabilities(CAPABILITIES)
    drv = webdriver.Remote(APPIUM_URL, options=options)
    drv.implicitly_wait(0)  # explicit waits only
    drv.execute_script("mobile: clearApp", {"appId": "com.taqelah.demo_app"})
    drv.execute_script("mobile: activateApp", {"appId": "com.taqelah.demo_app"})
    yield drv
    drv.quit()
