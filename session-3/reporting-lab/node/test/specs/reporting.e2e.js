// Reporting lab — the point is the REPORT: one green result and one red one,
// with a screenshot attached to the failure (see the afterTest hook in wdio.conf.js).
// Both cases log in successfully; the second FAILS on a deliberate assertion.

const USERNAME = 'android=new UiSelector().className("android.widget.EditText").instance(0)'
const PASSWORD = 'android=new UiSelector().className("android.widget.EditText").instance(1)'
const LOGIN = '~Login'
const HOME = '~View All'   // only present on the post-login home screen

const USER = 'emma@demoapp.com'
const PASS = '10203040'

async function login(user, pass) {
  const username = $(USERNAME)
  await username.waitForDisplayed({ timeout: 20000 })   // waits past the splash
  await username.click()
  await username.setValue(user)

  const pwd = $(PASSWORD)
  await pwd.click()
  await pwd.setValue(pass)

  await $(LOGIN).click()
  await $(HOME).waitForDisplayed({ timeout: 10000 })    // confirm we're logged in
}

describe('Reporting demo', () => {
  it('passing — valid login reaches home', async () => {
    await login(USER, PASS)
    await expect($(HOME)).toBeDisplayed()
  })

  it('failing — login works but a deliberate assertion fails', async () => {
    await login(USER, PASS)
    // Login succeeded — we ARE on the home screen. The next line is WRONG on purpose so the
    // report shows a red result with a screenshot of the home screen attached.
    expect(await $(HOME).isDisplayed()).toBe(false)
  })
})
