import GuestCheckoutPage from "../pages/GuestCheckoutPage";
import SearchPage from "../pages/SearchPage";

describe("Guest Checkout Flow", () => {
  const guestCheckoutPage = new GuestCheckoutPage();
  const searchPage = new SearchPage();

  before(() => {
    cy.visit("/");
    searchPage.acceptCookiesIfVisible();
  });

  it("Roman → Cart → Payment → Guest → Address", () => {
    //Search for "roman"
    searchPage.searchFor("roman");
    searchPage.verifyProductListIsNotEmpty();

    //Add the basket from search results
    guestCheckoutPage.addProductToCartFromSearch();
  cy.screenshot('product-added-to-cart');
  

    //Go to Cart
    guestCheckoutPage.goToCart();
  

    //Pay Now
    // Sepet sayfasında butona tıklanıyor,
    // redirect otomatik olarak /siparis-uye-giris oluyor
    cy.contains("Satın Al", { timeout: 15000 })
      .should("be.visible")
      .click();

    //Guest Checkout Page
    guestCheckoutPage.verifyContinueAsGuestButtonVisible();
    guestCheckoutPage.continueAsGuest();
   cy.screenshot('continue-as-guest');

    //Address Page
    guestCheckoutPage.verifyAddressPageOpened();
    guestCheckoutPage.verifyAddressFormFieldsVisible();
  cy.screenshot('guest-address-page');

  });
});
