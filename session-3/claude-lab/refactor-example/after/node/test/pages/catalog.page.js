// CatalogPage — the "All Dresses" product catalog reached from the home screen.
// Owns the search box, the result grid and the empty-state marker. Tests talk to
// it in domain language (open / search / openFirstResult), never in raw selectors.
//
// Locators confirmed live via the Appium MCP server against com.taqelah.demo_app.

class CatalogPage {
  // --- locators: the single source of truth for this screen ---
  get shopAll() {
    // Entry point on the home screen that opens the full catalog.
    return $('~Shop All')
  }
  get searchField() {
    // The only EditText on the catalog screen.
    return $('android=new UiSelector().className("android.widget.EditText").instance(0)')
  }
  get firstResult() {
    // Product cards are clickable images; the first one is the first search hit.
    return $('android=new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)')
  }
  get noResults() {
    // Empty-state shown when a query matches nothing.
    return $('~No dresses found')
  }

  /** From the home screen, open the catalog and wait until search is interactive. */
  async open() {
    await this.shopAll.waitForDisplayed({ timeout: 20000 })
    await this.shopAll.click()
    await this.searchField.waitForDisplayed({ timeout: 20000 })
  }

  /** Type a query. Focus first — the list filters reactively on text change. */
  async search(query) {
    await this.searchField.waitForDisplayed({ timeout: 10000 })
    await this.searchField.click()
    await this.searchField.setValue(query)
  }

  /** The product name of the first result (content-desc is "Name\n$price"). */
  async firstResultName() {
    await this.firstResult.waitForDisplayed({ timeout: 10000 })
    const desc = await this.firstResult.getAttribute('content-desc')
    return desc.split('\n')[0].trim()
  }

  /** Open the first search result's detail screen. */
  async openFirstResult() {
    await this.firstResult.waitForDisplayed({ timeout: 10000 })
    await this.firstResult.click()
  }

  /** True if the empty-state appeared within `timeout` ms. */
  async noResultsShown(timeout = 6000) {
    try {
      return await this.noResults.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }

  /** True if at least one product card is visible within `timeout` ms. */
  async hasResults(timeout = 4000) {
    try {
      return await this.firstResult.waitForDisplayed({ timeout })
    } catch {
      return false
    }
  }
}

export default new CatalogPage()
