"""Session 3 homework #2 — the Session 2 search->checkout capstone, refactored
into Page Objects. Every selector now lives in a page class (pages/); the test
reads like the user's intent, not raw locators.

Flow: log in → Shop All → search "black dress" → open the first result →
      Add to Cart → View Cart → Checkout → fill Shipping → To Payment →
      Review Order → Place Order → assert the "Thank You!" confirmation.
"""

from pages.login_page import LoginPage
from pages.catalog_page import CatalogPage
from pages.product_page import ProductPage
from pages.cart_page import CartPage
from pages.shipping_page import ShippingPage
from pages.review_page import ReviewPage
from pages.thankyou_page import ThankYouPage
from data import SHIPPING

USER = "emma@demoapp.com"
PASS = "10203040"
SEARCH = "black dress"


def test_completes_full_purchase(driver):
    login = LoginPage(driver)
    catalog = CatalogPage(driver)
    product = ProductPage(driver)
    cart = CartPage(driver)
    shipping = ShippingPage(driver)
    review = ReviewPage(driver)
    thank_you = ThankYouPage(driver)

    login.login(USER, PASS)
    assert login.reached_home() is True

    catalog.open()
    catalog.search(SEARCH)
    catalog.open_first_result()

    product.add_to_cart()
    assert product.added_to_cart() is True
    product.back_to_grid()

    catalog.open_cart()
    cart.checkout()

    shipping.fill(SHIPPING)
    shipping.to_payment()

    review.place_order()

    assert thank_you.is_confirmed() is True
