// Session 3 homework #2 — the Session 2 search->checkout capstone, refactored
// into Page Objects. Every selector now lives in a page class (test/pages/);
// the spec reads like the user's intent, not raw locators.
//
// Flow: log in → Shop All → search "black dress" → open the first result →
//       Add to Cart → View Cart → Checkout → fill Shipping → To Payment →
//       Review Order → Place Order → assert the "Thank You!" confirmation.

import LoginPage from '../pages/login.page.js'
import CatalogPage from '../pages/catalog.page.js'
import ProductPage from '../pages/product.page.js'
import CartPage from '../pages/cart.page.js'
import ShippingPage from '../pages/shipping.page.js'
import ReviewPage from '../pages/review.page.js'
import ThankYouPage from '../pages/thankyou.page.js'
import shipping from '../data/shipping.js'

const USER = 'emma@demoapp.com'
const PASS = '10203040'
const SEARCH = 'black dress'

describe('Page Objects — search → checkout', () => {
  it('completes a full purchase and lands on the Thank You screen', async () => {
    await LoginPage.login(USER, PASS)
    expect(await LoginPage.reachedHome()).toBe(true)

    await CatalogPage.open()
    await CatalogPage.search(SEARCH)
    await CatalogPage.openFirstResult()

    await ProductPage.addToCart()
    expect(await ProductPage.addedToCart()).toBe(true)
    await ProductPage.backToGrid()

    await CatalogPage.openCart()
    await CartPage.checkout()

    await ShippingPage.fill(shipping)
    await ShippingPage.toPayment()

    await ReviewPage.placeOrder()

    expect(await ThankYouPage.isConfirmed()).toBe(true)
  })
})
