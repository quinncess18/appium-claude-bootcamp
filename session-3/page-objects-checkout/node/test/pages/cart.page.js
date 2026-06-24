// CartPage — the "My Cart" screen. Confirms the cart loaded and starts checkout.
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class CartPage {
  // --- locators ---
  get title() {
    return $('~My Cart')
  }
  get proceedToCheckoutButton() {
    return $('android=new UiSelector().className("android.widget.Button").description("Proceed to Checkout")')
  }

  /** Wait until the cart screen is shown. */
  async waitLoaded() {
    await this.title.waitForDisplayed({ timeout: 20000 })
  }

  /** Confirm the cart loaded, then proceed to checkout. */
  async checkout() {
    await this.waitLoaded()
    await this.proceedToCheckoutButton.click()
  }
}

export default new CartPage()
