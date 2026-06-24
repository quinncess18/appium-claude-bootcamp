// ProductPage — a single product's detail screen.
// Knows Add to Cart, the confirmation it produces, and how to get back to the grid
// (the detail screen has no cart icon, so checkout returns via the grid).
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class ProductPage {
  // --- locators ---
  get addToCartButton() {
    return $('~Add to Cart')
  }
  get cartConfirmation() {
    // Snackbar reads "<Product> added to cart" after a successful add.
    return $('android=new UiSelector().descriptionContains("added to cart")')
  }

  /** Add the current product to the cart. */
  async addToCart() {
    await this.addToCartButton.waitForDisplayed({ timeout: 30000 })
    await this.addToCartButton.click()
  }

  /** True if the "added to cart" confirmation appeared within `timeout` ms. */
  async addedToCart(timeout = 10000) {
    try {
      return await this.cartConfirmation.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }

  /** Detail has no cart icon → go back to the grid to reach the cart. */
  async backToGrid() {
    await driver.back()
  }
}

export default new ProductPage()
