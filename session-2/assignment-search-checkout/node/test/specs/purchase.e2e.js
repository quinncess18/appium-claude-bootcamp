// Session 2 · Assignment — search → checkout (WebdriverIO + Mocha)
// -----------------------------------------------------------------
// One real end-to-end purchase on the taqelah/demo-app (Flutter):
//   log in → Shop All → search "black dress" → open the first result →
//   Add to Cart → View Cart → Checkout → fill Shipping → To Payment →
//   Review Order → Place Order → assert the "Thank You!" confirmation.
//
// Rules applied (from the assignment):
//   • no sleep() — every step syncs on an EXPLICIT condition (waitForDisplayed)
//   • locators live in a SHARED helper (./helpers/locators.js)
//   • we wait past the SPLASH before the first interaction
//
// `$`, `browser`, `driver` and `expect` are globals injected by the WDIO runner.

import L from '../helpers/locators.js'
import shipping from '../../data/shipping.js'

const USER = 'emma@demoapp.com'
const PASS = '10203040'
const SEARCH = 'black dress'

describe('Assignment — search → checkout', () => {
  it('completes a full purchase and lands on the Thank You screen', async () => {
    // ── 1 · Past the splash → log in ──
    const username = await $(L.username)
    await username.waitForDisplayed({ timeout: 25000 }) // absorbs the splash delay
    await username.click()
    await username.setValue(USER)

    const password = await $(L.password)
    await password.click()
    await password.setValue(PASS)

    await (await $(L.loginBtn)).click()

    // ── 2 · Landing → Shop All ──
    const shopAll = await $(L.shopAllBtn)
    await shopAll.waitForDisplayed({ timeout: 20000 })
    await shopAll.click()

    // ── 3 · Search "black dress" (the grid filters in place as you type) ──
    const search = await $(L.searchInput)
    await search.waitForDisplayed({ timeout: 20000 })
    await search.click()
    await search.clearValue()
    await search.addValue(SEARCH)
    try { await driver.hideKeyboard() } catch { /* keyboard already down */ }

    // ── 4 · Open the first result (Little Black Dress) ──
    const first = await $(L.firstProduct)
    await first.waitForDisplayed({ timeout: 20000 })
    await first.click()

    // ── 5 · Add to Cart → confirm via the snackbar ──
    const addToCart = await $(L.addToCartBtn)
    await addToCart.waitForDisplayed({ timeout: 30000 })
    await addToCart.click()
    await (await $(L.addedSnackbar)).waitForDisplayed({ timeout: 10000 })

    // ── 6 · View Cart (Detail has no cart icon → back to the grid, tap cart) ──
    await driver.back()
    const cartIcon = await $(L.gridCartBtn)
    await cartIcon.waitForDisplayed({ timeout: 20000 })
    await cartIcon.click()

    // ── 7 · Cart → Checkout ──
    await (await $(L.cartTitle)).waitForDisplayed({ timeout: 20000 })
    await (await $(L.proceedToCheckoutBtn)).click()

    // ── 8 · Shipping info — fill all 7 fields ──
    await (await $(L.shippingTitle)).waitForDisplayed({ timeout: 20000 })
    const values = [
      shipping.fullName, shipping.address1, shipping.address2,
      shipping.city, shipping.state, shipping.zip, shipping.country,
    ]
    for (let i = 0; i < values.length; i++) {
      const field = await $(L.shipField(i))
      await field.waitForDisplayed({ timeout: 15000 })
      await field.click()
      await field.clearValue()
      if (values[i]) await field.addValue(values[i])
      // Hide the keyboard between fields — while it's up Flutter collapses the
      // unfocused EditTexts in the a11y tree, so the next instance(n) lookup
      // could miss. (An action, not a sleep.)
      try { await driver.hideKeyboard() } catch { /* nothing to hide */ }
    }
    await (await $(L.toPaymentBtn)).click()

    // ── 9 · Review Order → Place Order ──
    await (await $(L.reviewTitle)).waitForDisplayed({ timeout: 20000 })
    await (await $(L.placeOrderBtn)).click()

    // ── 10 · Done — assert the confirmation ──
    const thankYou = await $(L.thankYouTitle)
    await thankYou.waitForDisplayed({ timeout: 20000 })
    await expect($(L.thankYouTitle)).toBeDisplayed()
    await expect($(L.thankYouBody)).toBeDisplayed()
  })
})
