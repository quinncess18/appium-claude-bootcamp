// Cloud Devices lab. The SAME test runs locally and on the grid — only the
// config (wdio.conf.js vs wdio.bstack.conf.js) changes, never this spec.
// Run locally:  npm run test:local      Run on the cloud:  npm run test:cloud

const USER = 'emma@demoapp.com'
const PASS = '10203040'

// Flutter app exposes no resource-ids → fields by class+instance, buttons by a11y id.
const username = () => $('android=new UiSelector().className("android.widget.EditText").instance(0)')
const password = () => $('android=new UiSelector().className("android.widget.EditText").instance(1)')
const loginBtn = () => $('~Login')
const homeMarker = () => $('~View All') // only present on the post-login home screen

describe('Cloud login', () => {
  it('valid login reaches the home screen', async () => {
    // Wait past the splash until the login form is interactive.
    await username().waitForDisplayed({ timeout: 25000 })

    await username().click()
    await username().setValue(USER)
    await password().click()
    await password().setValue(PASS)
    await loginBtn().click()

    // Success is the home marker becoming visible — a real, meaningful post-condition.
    await homeMarker().waitForDisplayed({ timeout: 20000 })
    await expect(homeMarker()).toBeDisplayed()
  })
})
