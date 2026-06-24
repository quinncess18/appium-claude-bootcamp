"""Flow: log in -> search "black dress" -> open the first result -> add to cart.

Reads like a story; all screen knowledge lives in the page objects.
"""

from pages.login_page import LoginPage
from pages.catalog_page import CatalogPage
from pages.product_page import ProductPage

USER = "emma@demoapp.com"
PASS = "10203040"


def test_search_first_result_added_to_cart(driver):
    LoginPage(driver).login(USER, PASS)

    catalog = CatalogPage(driver)
    catalog.open()
    catalog.search("black dress")

    name = catalog.first_result_name()
    catalog.open_first_result()

    product = ProductPage(driver)
    product.add_to_cart()

    # Meaningful post-condition: the confirmation names the product we added.
    assert product.added_to_cart() is True
    assert name in product.confirmation_text()


# Negative case: a query that matches nothing has no first result to open.
def test_search_with_no_matches_shows_empty_state(driver):
    LoginPage(driver).login(USER, PASS)

    catalog = CatalogPage(driver)
    catalog.open()
    catalog.search("zzzzzznomatch")

    assert catalog.no_results_shown() is True
    assert catalog.has_results() is False
