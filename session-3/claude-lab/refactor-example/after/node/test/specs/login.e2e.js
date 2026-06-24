// AFTER — the same two cases, now reading like a story.
// No selectors, no splash-wait plumbing — all of that lives in LoginPage.
// Compare with ../../../before/node/test/specs/login.e2e.js.

import LoginPage from '../pages/login.page.js'

describe('Login (Page Object)', () => {
  it('valid credentials reach the home screen', async () => {
    await LoginPage.login('emma@demoapp.com', '10203040')
    expect(await LoginPage.reachedHome()).toBe(true)
  })

  it('wrong password stays on the login screen', async () => {
    await LoginPage.login('emma@demoapp.com', 'wrongpass')
    expect(await LoginPage.reachedHome()).toBe(false)
  })
})
