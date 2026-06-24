// LoginPage — all knowledge of the login screen (locators + actions).
// Locators confirmed live against com.taqelah.demo_app (look-before-you-script).

class LoginPage {
  // --- locators ---
  get username() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)')
  }
  get password() {
    return $('android=new UiSelector().className("android.widget.EditText").instance(1)')
  }
  get loginButton() {
    return $('~Login')
  }
  // Present only on the post-login home screen — proves a successful login.
  get homeMarker() {
    return $('~View All')
  }
  // Inline error shown on a rejected login: content-desc starts
  // "Invalid username or password." (confirmed on the running app).
  get errorMessage() {
    return $('android=new UiSelector().descriptionContains("Invalid username or password")')
  }

  /** Wait past the splash until the login screen is interactive. */
  async waitUntilReady() {
    await this.username.waitForDisplayed({ timeout: 25000 })
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
  async reachedHome(timeout = 6000) {
    try {
      return await this.homeMarker.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }

  /** True if the invalid-credentials error appeared within `timeout` ms. */
  async errorShown(timeout = 10000) {
    try {
      return await this.errorMessage.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }
}

export default new LoginPage()
