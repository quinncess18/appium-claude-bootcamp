// Flow: log in → search "black dress" → open the first result → add it to the cart.
// Reads like a story; all screen knowledge lives in the page objects.

import LoginPage from '../pages/login.page.js'
import CatalogPage from '../pages/catalog.page.js'
import ProductPage from '../pages/product.page.js'

const USER = 'emma@demoapp.com'
const PASS = '10203040'

describe('Search and add to cart', () => {
  it('adds the first search result to the cart', async () => {
    await LoginPage.login(USER, PASS)
    expect(await LoginPage.reachedHome()).toBe(true)

    await CatalogPage.open()
    await CatalogPage.search('black dress')

    const name = await CatalogPage.firstResultName()
    await CatalogPage.openFirstResult()

    await ProductPage.addToCart()

    // Meaningful post-condition: the confirmation names the product we added.
    expect(await ProductPage.addedToCart()).toBe(true)
    expect(await ProductPage.confirmationText()).toContain(name)
  })

  // Negative case: a query that matches nothing has no first result to open.
  it('shows the empty state for a query that matches nothing', async () => {
    await LoginPage.login(USER, PASS)

    await CatalogPage.open()
    await CatalogPage.search('zzzzzznomatch')

    expect(await CatalogPage.noResultsShown()).toBe(true)
    expect(await CatalogPage.hasResults()).toBe(false)
  })
})
