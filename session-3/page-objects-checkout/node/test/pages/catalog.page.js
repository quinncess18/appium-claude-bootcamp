// CatalogPage — the product catalog/grid reached from the home screen.
// Owns the "Shop All" entry, the search box, the result grid, and the grid's
// cart icon. Tests call open / search / openFirstResult / openCart in plain language.
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class CatalogPage {
  // --- locators: the single source of truth for this screen ---
  get shopAll() {
    // Entry point on the home screen that opens the full catalog.
    return $('~Shop All')
  }
  get searchField() {
    // The catalog's only EditText.
    return $('android=new UiSelector().className("android.widget.EditText")')
  }
  get firstResult() {
    // Product cards are clickable images; the first one is the first search hit.
    return $('android=new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)')
  }
  get cartIcon() {
    // Grid app-bar buttons in order: [back/menu](0) · [sort](1) · [cart](2).
    return $('android=new UiSelector().className("android.widget.Button").instance(2)')
  }

  /** From the home screen, open the catalog and wait until search is interactive. */
  async open() {
    await this.shopAll.waitForDisplayed({ timeout: 20000 })
    await this.shopAll.click()
    await this.searchField.waitForDisplayed({ timeout: 20000 })
  }

  /** Type a query. Focus first — the grid filters reactively as you type. */
  async search(query) {
    await this.searchField.click()
    await this.searchField.clearValue()
    await this.searchField.addValue(query)
    try { await driver.hideKeyboard() } catch { /* keyboard already down */ }
  }

  /** Open the first search result's detail screen. */
  async openFirstResult() {
    await this.firstResult.waitForDisplayed({ timeout: 20000 })
    await this.firstResult.click()
  }

  /** Tap the grid's cart icon to open the cart. */
  async openCart() {
    await this.cartIcon.waitForDisplayed({ timeout: 20000 })
    await this.cartIcon.click()
  }
}

export default new CatalogPage()
