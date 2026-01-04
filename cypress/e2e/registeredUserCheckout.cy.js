import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";
import GuestCheckoutPage from "../pages/GuestCheckoutPage";
import usersData from "../fixtures/users.json";

describe("Registered User Checkout Flow", () => {
  const loginPage = new LoginPage();
  const searchPage = new SearchPage();
  const checkoutPage = new GuestCheckoutPage();

  beforeEach(() => {
    //Visit login page
    loginPage.visit();
    loginPage.acceptCookiesIfVisible();

    //Login
    loginPage.openLoginForm();
    loginPage.login(
      usersData.validUser.email,
      usersData.validUser.password
    );

    //Login success verification
    loginPage.verifyLoginSuccess();
  });

  it("Login → Search → Cart → Checkout → Address → Payment", () => {
    //Search for a product
    searchPage.searchFor("roman");
    searchPage.verifyProductListIsNotEmpty();

    //Add the basket from search results
    checkoutPage.addProductToCartFromSearch();

    //Go to Basket
    checkoutPage.goToCart();

    //Buy Now
    cy.contains("Satın Al", { timeout: 15000 }).click();

    //Order page (NOT /order/address)
    cy.url({ timeout: 15000 }).should("include", "/order");
  cy.screenshot('registered-user-order-page');  

    //Was the registered address displayed?
    cy.get(".address-item", { timeout: 15000 })
      .should("have.length.greaterThan", 0);

    cy.get(".address-box.active")
      .should("be.visible");

    //Proceed to payment step
    cy.get(".order-next-btn")
      .scrollIntoView()
      .should("be.visible")
      .click();

    //Payment page
    cy.url({ timeout: 15000 }).should("include", "/order/payment");
    cy.contains("Ödeme Bilgileri").should("be.visible");

    //Are the shipping options visible?
    cy.contains("PTT", { timeout: 15000 }).should("be.visible");
    cy.contains("DHL").should("be.visible");
  cy.screenshot('registered-user-payment-page');  

    //Is PTT selected as the default?
    cy.contains("label", "PTT Kargo").find("i.ti-check").should("be.visible");

    cy.contains("label", "DHL").should("be.visible");

    //Order Summary box
    cy.contains("Sipariş Özet").should("be.visible");

    //General Total Price
    cy.contains("Genel Toplam")
      .parent()
      .within(() => {
        cy.contains("TL").should("be.visible");
  });

    //Payment Options
    cy.get('#iyz-tab-payWithIyzico')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

    cy.get('#iyz-tab-credit-card').should('be.visible');
    cy.get('#iyz-tab-others').should('be.visible');

    //What is iyzico ile Öde?
    cy.contains("iyzico ile Öde nedir?")
   .scrollIntoView()
   .should("be.visible")
   .click();
  
   cy.screenshot('iyzico-info-box');
   //Close the info box
    cy.contains("iyzico ile Öde nedir?").click();

    cy.get('#iyz-tab-credit-card').scrollIntoView().click();

   //Scroll to top
    cy.scrollTo("top");

   //Go to Basket
    cy.contains("span", "Sepetim", { timeout: 10000 })
    .should("be.visible")
    .click();

   //Click on the trash icon in the basket
    cy.get("i.custom-close", { timeout: 10000 })
    .should("be.visible")
    .click();

   //Verify the basket is empty
    cy.contains("Sepetinizde ürün bulunmamaktadır", { timeout: 10000 }).should("be.visible");
  cy.screenshot('registered-user-cart-empty');  

});
});
