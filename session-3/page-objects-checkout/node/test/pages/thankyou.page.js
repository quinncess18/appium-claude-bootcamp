// ThankYouPage — the order-confirmation screen (the finish line).
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class ThankYouPage {
  // --- locators ---
  get title() {
    return $('~Thank You!')
  }
  get body() {
    return $('android=new UiSelector().descriptionContains("order has been placed successfully")')
  }

  /** Wait for the confirmation; true when both the title and the message are shown. */
  async isConfirmed(timeout = 20000) {
    try {
      await this.title.waitForDisplayed({ timeout })
      await this.body.waitForDisplayed({ timeout })
      return true
    } catch {
      return false
    }
  }
}

export default new ThankYouPage()
