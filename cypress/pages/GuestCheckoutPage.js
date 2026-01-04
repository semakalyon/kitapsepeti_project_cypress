import { GuestCheckoutLocators as L } from "../locators/GuestCheckoutLocators";

class GuestCheckoutPage {

  addProductToCartFromSearch() {
    cy.get("#catalog362 .product-item")
      .first()
      .trigger("mouseover")
      .within(() => {
        cy.get(L.addToCartButton).click({ force: true });
      });
  }

  goToCart() {
    cy.get('a[href="/sepet"]')
      .should("be.visible")
      .click();
  }

  verifyContinueAsGuestButtonVisible() {
    cy.contains("Üye Olmadan Devam Et")
      .should("be.visible");
  }

  continueAsGuest() {
    cy.contains("Üye Olmadan Devam Et")
      .should("be.visible")
      .click();
  }

  verifyAddressPageOpened() {
    cy.url({ timeout: 15000 })
      .should("include", "/order/address");
    cy.contains("Adres Bilgileri")
      .should("be.visible");
  }

  verifyAddressFormFieldsVisible() {
    cy.get(L.addressForm).within(() => {
      cy.get(L.fullNameInput).should("be.visible");
      cy.get(L.emailInput).should("be.visible");
      cy.get(L.phoneInput).should("be.visible");
      cy.get(L.citySelect).should("be.visible");
      cy.get(L.townInput).should("be.visible");
      cy.get(L.districtInput).should("be.visible");
      cy.get(L.addressTextarea).should("be.visible");
    });
  }
}
export default GuestCheckoutPage;