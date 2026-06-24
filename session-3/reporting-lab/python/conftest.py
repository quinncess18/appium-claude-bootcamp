"""Session 3 · Reporting lab (SCAFFOLD) — driver fixture + screenshot-on-failure.

Run with:  pytest --html=report.html --self-contained-html
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


# On failure, save a screenshot AND embed it in the pytest-html report.
@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    pytest_html = item.config.pluginmanager.getplugin("html")
    extras = getattr(report, "extras", [])
    if report.when == "call" and report.failed:
        drv = item.funcargs.get("driver")
        if drv is not None:
            drv.save_screenshot(f"fail-{item.name}.png")          # keep the file too
            if pytest_html is not None:
                # base64 embeds inline in the --self-contained-html report
                extras.append(pytest_html.extras.image(drv.get_screenshot_as_base64()))
        report.extras = extras
