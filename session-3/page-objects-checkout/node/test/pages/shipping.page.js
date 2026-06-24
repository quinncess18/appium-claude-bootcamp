// ShippingPage — the checkout shipping form (7 fields) and the "To Payment" action.
//
// Locators carried over verified from the Session 2 search->checkout capstone.

class ShippingPage {
  // --- locators ---
  get title() {
    return $('~Shipping Info')
  }
  // 7 EditTexts in DOM order: 0 Full Name · 1 Address 1 · 2 Address 2 (opt) ·
  // 3 City · 4 State · 5 Zip · 6 Country. UiScrollable.scrollIntoView keeps
  // instance(n) addressable even when the field is below the fold.
  field(n) {
    return $(
      'android=new UiScrollable(new UiSelector().scrollable(true).instance(0))' +
      `.scrollIntoView(new UiSelector().className("android.widget.EditText").instance(${n}))`
    )
  }
  get toPaymentButton() {
    return $('android=new UiSelector().className("android.widget.Button").description("To Payment")')
  }

  /** Fill all 7 shipping fields from a data object. */
  async fill(data) {
    await this.title.waitForDisplayed({ timeout: 20000 })
    const values = [
      data.fullName, data.address1, data.address2,
      data.city, data.state, data.zip, data.country,
    ]
    for (let i = 0; i < values.length; i++) {
      const f = await this.field(i)
      await f.waitForDisplayed({ timeout: 15000 })
      await f.click()
      await f.clearValue()
      if (values[i]) await f.addValue(values[i])
      // Hide the keyboard between fields — while it's up Flutter collapses the
      // unfocused EditTexts in the a11y tree, so the next instance(n) lookup
      // could miss. (An action, not a sleep.)
      try { await driver.hideKeyboard() } catch { /* nothing to hide */ }
    }
  }

  /** Continue to the review step. */
  async toPayment() {
    await this.toPaymentButton.click()
  }
}

export default new ShippingPage()
