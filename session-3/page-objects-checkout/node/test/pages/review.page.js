// ReviewPage — the "Review Order" screen and the final Place Order action.
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class ReviewPage {
  // --- locators ---
  get title() {
    return $('~Review Order')
  }
  // Place Order can fall below the fold on a long order — scroll it into view first.
  get placeOrderButton() {
    return $(
      'android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().className("android.widget.Button").description("Place Order"))'
    )
  }

  /** Confirm the review screen, then place the order. */
  async placeOrder() {
    await this.title.waitForDisplayed({ timeout: 20000 })
    await this.placeOrderButton.click()
  }
}

export default new ReviewPage()
