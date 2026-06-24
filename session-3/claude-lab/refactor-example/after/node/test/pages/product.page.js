// ProductPage — a single product's detail screen.
// Knows the Add to Cart action and the confirmation it produces.
//
// Locators confirmed live via the Appium MCP server against com.taqelah.demo_app.

class ProductPage {
  // --- locators ---
  get addToCartButton() {
    return $('~Add to Cart')
  }
  get cartConfirmation() {
    // Snackbar reads "<Product> added to cart" after a successful add.
    return $('android=new UiSelector().descriptionContains("added to cart")')
  }
  get viewCartButton() {
    return $('~VIEW CART')
  }

  /** Add the current product to the cart. */
  async addToCart() {
    await this.addToCartButton.waitForDisplayed({ timeout: 10000 })
    await this.addToCartButton.click()
  }

  /** True if the "added to cart" confirmation appeared within `timeout` ms. */
  async addedToCart(timeout = 6000) {
    try {
      return await this.cartConfirmation.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }

  /** Text of the confirmation snackbar (e.g. "Little Black Dress added to cart"). */
  async confirmationText() {
    return this.cartConfirmation.getAttribute('content-desc')
  }
}

export default new ProductPage()
