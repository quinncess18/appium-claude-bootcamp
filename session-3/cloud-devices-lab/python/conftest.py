"""Session 3 · Cloud Devices lab (SCAFFOLD) — local OR cloud driver.

Set TARGET=cloud to run on BrowserStack (needs BROWSERSTACK_USERNAME / _ACCESS_KEY / _APP).
Default is local (emulator + appium on 4723). Same tests either way.
"""

import os

import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options

TARGET = os.environ.get("TARGET", "local")

LOCAL_URL = "http://127.0.0.1:4723"
CLOUD_URL = "https://hub.browserstack.com/wd/hub"

LOCAL_CAPS = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.taqelah.demo_app",
    "appium:appActivity": ".MainActivity",
    "appium:newCommandTimeout": 180,
}

CLOUD_CAPS = {
    "platformName": "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Samsung Galaxy S23",
    "appium:platformVersion": "13.0",
    # BrowserStack runs the build you uploaded (bs://...), not a local package.
    "appium:app": os.environ.get("BROWSERSTACK_APP"),
    "bstack:options": {
        "userName": os.environ.get("BROWSERSTACK_USERNAME"),
        "accessKey": os.environ.get("BROWSERSTACK_ACCESS_KEY"),
        "projectName": "Appium Bootcamp",
        "buildName": "session-3-cloud",
        "sessionName": "login",
    },
}


@pytest.fixture
def driver():
    url = CLOUD_URL if TARGET == "cloud" else LOCAL_URL
    caps = CLOUD_CAPS if TARGET == "cloud" else LOCAL_CAPS
    options = UiAutomator2Options().load_capabilities(caps)
    drv = webdriver.Remote(url, options=options)
    yield drv
    drv.quit()
