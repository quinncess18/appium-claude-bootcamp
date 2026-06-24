"""AFTER — the same two cases, now reading like a story.

No locators, no splash-wait plumbing — all of that lives in LoginPage.
Compare with ../before/python/test_login.py.
"""

from pages.login_page import LoginPage


def test_valid_login_reaches_home(driver):
    login = LoginPage(driver)
    login.login("emma@demoapp.com", "10203040")
    assert login.reached_home() is True


def test_wrong_password_stays_on_login(driver):
    login = LoginPage(driver)
    login.login("emma@demoapp.com", "wrongpass")
    assert login.reached_home() is False
