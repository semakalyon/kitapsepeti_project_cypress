import { ProductLocators } from "../locators/ProductLocators";
import { ProductDetailLocators } from "../locators/ProductDetailLocators";

class ProductPage {

  // ================= PAGE OPEN =================
  verifyProductPageOpened() {
    cy.url().should("include", "/");
    cy.get(ProductLocators.productTitle).should("be.visible");
  }

  // ================= BASIC PRODUCT INFO =================
  verifyProductDetails() {
    cy.get(ProductLocators.productImage)
      .should("be.visible")
      .and(($img) => {
        expect($img).to.have.attr("src").and.not.be.empty;
      });

    cy.get(ProductLocators.productTitle)
      .should("be.visible")
      .and("not.be.empty");

    cy.get(ProductLocators.productAuthor)
      .should("be.visible")
      .invoke("text")
      .should("not.be.empty");

    cy.get(ProductLocators.productPublisher)
      .should("be.visible")
      .and("not.be.empty");

    cy.get(ProductLocators.productPrice)
      .should("be.visible")
      .and("not.be.empty");
  }

  // ================= PRODUCT SPEC LABELS =================
  verifyProductSpecificationLabels() {
    const expectedLabels = [
      "Türü",
      "Kapak",
      "Sayfa Sayısı",
      "ISBN",
      "Basım Yılı",
      "Kağıt Tipi"
    ];

    cy.get(ProductLocators.productInfoSection)
      .should("be.visible");

    expectedLabels.forEach((label) => {
      cy.get(ProductLocators.productInfoSection)
        .should("contain.text", label);
    });
  }

  // ================= PRODUCT SPEC VALUES =================
  verifyProductSpecificationsWithValues() {
    const specifications = {
      "Türü": "Yoga",
      "Kapak": "Ciltsiz",
      "Sayfa Sayısı": "390",
      "ISBN": "978",
      "Basım Yılı": "2017",
      "Kağıt Tipi": "Hamur"
    };

    Object.entries(specifications).forEach(([label, value]) => {
      cy.contains("span.book-info-title", label)
        .should("be.visible")
        .parent()
        .should("contain.text", value);
    });
  }

  // ================= ADD TO CART =================
  verifyAddToCartButtonVisible() {
    cy.get(ProductLocators.addToCartButton)
      .should("be.visible")
      .and("contain.text", "Sepete Ekle");
  }

  addToCart() {
    cy.get(ProductLocators.addToCartButton)
      .should("be.visible")
      .click();
  }

  // ================= ADD TO CART CONFIRMATION =================
  verifyAddToCartSuccessMessage() {
    cy.get(ProductLocators.successModal)
      .should("be.visible")
      .and("contain.text", "sepete eklendi");

    cy.contains("Sepete Git").should("be.visible");
    cy.contains("Satın Al").should("be.visible");
  }

  addProductToCart() {
    cy.get(ProductDetailLocators.addToCartButton)
      .should("be.visible")
      .click();
  }

  decreaseProductQuantity(){
    cy.get(ProductDetailLocators.decreaseQtyButton).should("be.visible").click();
  }
 

  deleteProductFromCart() {
  // Sepette en az 1 ürün olduğunu garanti altına al
  cy.get(ProductDetailLocators.cartItemRow)
    .should("have.length.greaterThan", 0);

  // İlk ürünün sil ikonuna tıkla
  cy.get(ProductDetailLocators.deleteProductIcon)
    .first()
    .should("be.visible")
    .click();

  // Açılan onay menüsünde "Sil" butonuna bas
  cy.get(ProductDetailLocators.confirmDeleteButton)
    .should("be.visible")
    .and("contain.text", "Sil")
    .click();

  // Ürün satırı DOM’dan kalkmalı
  cy.get(ProductDetailLocators.cartItemRow)
    .should("have.length", 0);
}

  goToCartFromPopup() {
    cy.get(ProductDetailLocators.goToCartButton)
     .should("be.visible")
     .click();
}
}

export default ProductPage;
