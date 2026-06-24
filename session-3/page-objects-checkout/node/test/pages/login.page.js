// LoginPage — all knowledge of the login screen (locators + how to drive it).
// Tests talk to this object in domain language ("log in as…"), not raw selectors.
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class LoginPage {
  // --- locators: the single source of truth for this screen ---
  get username() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)')
  }
  get password() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(1)')
  }
  get loginButton() {
    return $('~Login')
  }
  // Present only on the post-login home screen — used to confirm success.
  get homeMarker() {
    return $('~View All')
  }

  /** Wait past the splash until the login screen is interactive. */
  async waitUntilReady() {
    await this.username.waitForDisplayed({ timeout: 25000 }) // absorbs the splash delay
  }

  /** Fill the form and submit. */
  async login(user, pass) {
    await this.waitUntilReady()
    await this.username.click()
    await this.username.setValue(user)
    await this.password.click()
    await this.password.setValue(pass)
    await this.loginButton.click()
  }

  /** True if the home screen appeared within `timeout` ms (false for a rejected login). */
  async reachedHome(timeout = 20000) {
    try {
      return await this.homeMarker.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }
}

export default new LoginPage()
