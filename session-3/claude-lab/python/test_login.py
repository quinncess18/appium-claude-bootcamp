"""Authored in the claude-lab — a LOGIN suite whose star is the NEGATIVE case:
invalid credentials must be rejected and keep the user on the login screen.
A positive case sits alongside it so the suite has contrast and can fail.
Screen knowledge lives in LoginPage; the tests read in domain language.
"""

from pages.login_page import LoginPage

USER = "emma@demoapp.com"
GOOD_PASS = "10203040"
BAD_PASS = "wrongpassword123"


def test_rejects_invalid_credentials(driver):
    login = LoginPage(driver)
    login.login(USER, BAD_PASS)

    # The app shows an inline "Invalid username or password." error …
    assert login.error_shown() is True
    # … and must NOT reach the home screen …
    assert login.reached_home() is False
    # … we're still on the login screen.
    assert login.on_login_screen() is True


def test_accepts_valid_credentials(driver):
    login = LoginPage(driver)
    login.login(USER, GOOD_PASS)
    assert login.reached_home() is True
