// Authored in the claude-lab — a LOGIN suite whose star is the NEGATIVE case:
// invalid credentials must be rejected and keep the user on the login screen.
// A positive case sits alongside it so the suite has contrast and can fail.
// Screen knowledge lives in LoginPage; this spec reads in domain language.

import LoginPage from '../pages/login.page.js'

const USER = 'emma@demoapp.com'
const GOOD_PASS = '10203040'
const BAD_PASS = 'wrongpassword123'

describe('Login', () => {
  it('rejects invalid credentials and stays on the login screen', async () => {
    await LoginPage.login(USER, BAD_PASS)

    // The app shows an inline "Invalid username or password." error …
    expect(await LoginPage.errorShown()).toBe(true)
    // … and must NOT reach the home screen …
    expect(await LoginPage.reachedHome()).toBe(false)
    // … we're still on the login screen (username field present).
    await expect(LoginPage.username).toBeDisplayed()
  })

  it('accepts valid credentials and reaches the home screen', async () => {
    await LoginPage.login(USER, GOOD_PASS)
    expect(await LoginPage.reachedHome()).toBe(true)
  })
})
