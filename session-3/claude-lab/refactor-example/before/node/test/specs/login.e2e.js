// BEFORE — a flat login spec (the Session 2 style).
// Everything lives in one file: locators, the splash wait, the flow, the assertions.
// It works, but the locators are copy-pasted and the screen knowledge is trapped in the test.
// This is the file you hand to Claude and ask it to refactor into Page Objects
// (see ../../../after for what Claude produces, and ../../../prompts.md for the ask).

const USERNAME = 'android=new UiSelector().className("android.widget.EditText").instance(0)'
const PASSWORD = 'android=new UiSelector().className("android.widget.EditText").instance(1)'
const LOGIN = '~Login'
const HOME = '~View All'   // only present on the post-login home screen

describe('Login (flat)', () => {
  it('valid credentials reach the home screen', async () => {
    const username = $(USERNAME)
    await username.waitForDisplayed({ timeout: 20000 })   // waits past the splash
    await username.click()
    await username.setValue('emma@demoapp.com')

    const pwd = $(PASSWORD)
    await pwd.click()
    await pwd.setValue('10203040')

    await $(LOGIN).click()

    await expect($(HOME)).toBeDisplayed()
  })

  it('wrong password stays on the login screen', async () => {
    const username = $(USERNAME)
    await username.waitForDisplayed({ timeout: 20000 })
    await username.click()
    await username.setValue('emma@demoapp.com')

    const pwd = $(PASSWORD)
    await pwd.click()
    await pwd.setValue('wrongpass')

    await $(LOGIN).click()

    // Home never appears for a bad login.
    let reachedHome = false
    try {
      reachedHome = await $(HOME).waitForDisplayed({ timeout: 6000 })
    } catch {
      reachedHome = false
    }
    expect(reachedHome).toBe(false)
  })
})
