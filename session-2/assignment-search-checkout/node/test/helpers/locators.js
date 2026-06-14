// Shared Android locators for the search → checkout assignment.
// ONE source of truth — selectors live here, never scattered through the spec
// (an assignment rule). All are read from the demo app's accessibility tree
// (Flutter → UiAutomator2): buttons by accessibility id (`~`/description),
// text fields by UiAutomator class + instance, since the Flutter app has no
// resource-ids.

export default {
  // ── Login ──
  username: 'android=new UiSelector().className("android.widget.EditText").instance(0)',
  password: 'android=new UiSelector().className("android.widget.EditText").instance(1)',
  loginBtn: '~Login',

  // ── Catalog landing (home) ──
  shopAllBtn: '~Shop All',

  // ── Product grid / search results ──
  searchInput: 'android=new UiSelector().className("android.widget.EditText")',
  firstProduct: 'android=new UiSelector().className("android.widget.ImageView").clickable(true).instance(0)',
  // Grid app-bar buttons in order: [back/menu](0) · [sort](1) · [cart](2).
  gridCartBtn: 'android=new UiSelector().className("android.widget.Button").instance(2)',

  // ── Product detail ──
  addToCartBtn: '~Add to Cart',
  addedSnackbar: 'android=new UiSelector().descriptionContains("added to cart")',

  // ── Cart ──
  cartTitle: '~My Cart',
  proceedToCheckoutBtn:
    'android=new UiSelector().className("android.widget.Button").description("Proceed to Checkout")',

  // ── Shipping info ──
  // 7 EditTexts in DOM order: 0 Full Name · 1 Address 1 · 2 Address 2 (opt) ·
  // 3 City · 4 State · 5 Zip · 6 Country. UiScrollable.scrollIntoView keeps
  // instance(n) addressable even when the field is below the fold.
  shippingTitle: '~Shipping Info',
  shipField: (n) =>
    'android=new UiScrollable(new UiSelector().scrollable(true).instance(0))' +
    `.scrollIntoView(new UiSelector().className("android.widget.EditText").instance(${n}))`,
  toPaymentBtn:
    'android=new UiSelector().className("android.widget.Button").description("To Payment")',

  // ── Review order ──
  reviewTitle: '~Review Order',
  // Place Order can fall below the fold on a long order — scroll it into view first.
  placeOrderBtn:
    'android=new UiScrollable(new UiSelector().scrollable(true))' +
    '.scrollIntoView(new UiSelector().className("android.widget.Button").description("Place Order"))',

  // ── Thank You (the finish line) ──
  thankYouTitle: '~Thank You!',
  thankYouBody:
    'android=new UiSelector().descriptionContains("order has been placed successfully")',
}
