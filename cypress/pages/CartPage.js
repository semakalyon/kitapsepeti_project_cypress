import { CartLocators } from "../locators/CartLocators";

class CartPage {

  openFromHeader() {
    cy.get(CartLocators.cartIcon).click();
  }

  openFromPopup() {
    cy.get(CartLocators.popupGoToCart)
      .should("be.visible")
      .click();

    cy.url().should("include", CartLocators.cartPageUrl);
  }

  verifyCartPageOpened() {
    cy.url().should("include", CartLocators.cartPageUrl);
    cy.get(CartLocators.cartItemRow).should("exist");
  }

  increaseQuantityAndVerify() {
    cy.get(CartLocators.quantityInput)
      .first()
      .invoke("val")
      .then((initial) => {
        cy.get(CartLocators.increaseQtyButton).first().click();
        cy.get(CartLocators.quantityInput)
          .first()
          .should("have.value", Number(initial) + 1);
      });
  }

  removeAllItems() {
    cy.get("body").then(($body) => {
      if ($body.find(CartLocators.deleteItemButton).length > 0) {
        cy.get(CartLocators.deleteItemButton).each(() => {
          cy.get(CartLocators.deleteItemButton).first().click();
          cy.get(CartLocators.confirmDeleteButton).click();
        });
      }
    });
  }

  verifyEmptyCart() {
    cy.get(CartLocators.emptyCartMessage)
      .should("be.visible")
      .and("contain.text", "Sepetinizde ürün bulunmamaktadır");

    cy.get(CartLocators.continueShoppingButton)
      .should("be.visible");
  }
}

export default CartPage;
