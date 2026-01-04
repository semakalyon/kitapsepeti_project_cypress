import SearchPage from "../pages/SearchPage";
import ProductPage from "../pages/ProductPage";
import productDetail from "../fixtures/productDetail.json";
import { ProductDetailLocators } from "../locators/ProductDetailLocators";
import { CartLocators } from "../locators/CartLocators";

describe("Product Detail Page – View and Add to Cart", () => {

  const searchPage = new SearchPage();
  const productPage = new ProductPage();

  beforeEach(() => {
    cy.visit("/");
    searchPage.acceptCookiesIfVisible();
    searchPage.searchFor(productDetail.product.name);
    searchPage.openFirstProduct();
  });

  it("User should be redirected to the product detail page when clicking on a product", () => {
    productPage.verifyProductPageOpened(productDetail.product.slug);
  });

  it("Product basic information should be displayed on the product detail page", () => {
    productPage.verifyProductDetails(productDetail.product);
  });

  it("Product specifications should be displayed under Product Information section", () => {
    productPage.verifyProductSpecificationsWithValues(
      productDetail.product.specifications);
  });

  it("Add to Cart button should be visible on the product detail page", () => {
    productPage.verifyAddToCartButtonVisible();
  });

  it("User should see cart popup with action buttons after adding product to cart", () => {
    productPage.addProductToCart();

    cy.get(ProductDetailLocators.goToCartButton)
      .should("be.visible")
      .and("contain.text", "Sepete Git");

    cy.get(ProductDetailLocators.buyNowButton)
      .should("be.visible")
      .and("contain.text", "Satın Al");
  });

  it("Cart subtotal and grand total should be visible after adding product to cart", () => {
  //Add to product to cart
  productPage.addProductToCart();

  //Go to Cart (from popup)
  cy.get(ProductDetailLocators.goToCartButton)
    .should("be.visible")
    .click();

  //Cart Price Box
  cy.get(ProductDetailLocators.cartPriceBox)
    .should("be.visible");

  //Cart Subtotal
  cy.contains("Sepet Toplamı")
    .should("be.visible")
    .parent()
    .find(ProductDetailLocators.priceValue)
    .invoke("text")
    .should("not.be.empty");

  //Shipping Fee
  cy.contains("Kargo Ücreti")
    .should("be.visible")
    .parent()
    .find(ProductDetailLocators.priceValue)
    .invoke("text")
    .should("not.be.empty");

  //General Total
  cy.contains("Genel Toplam")
    .should("be.visible")
    .parent()
    .find(ProductDetailLocators.priceValue)
    .invoke("text")
    .should("not.be.empty");

  cy.screenshot('cart-totals-visible');  
});

  it("User should be redirected to cart page when clicking 'Go to Cart' button", () => {
    productPage.addProductToCart();

    cy.get(ProductDetailLocators.goToCartButton)
      .should("be.visible")
      .click();

    cy.url().should("include", "/sepet");
  });

  it("Cart item count should increase after adding product to cart", () => {
  cy.get("body").then(($body) => {
    let initialCount = 0;

    if ($body.find(ProductDetailLocators.cartCount).length > 0) {
      initialCount = Number(
        $body.find(ProductDetailLocators.cartCount).text().trim()
      );
    }

    productPage.addProductToCart();

    cy.get(ProductDetailLocators.cartCount, { timeout: 15000 })
      .invoke("text")
      .should((text) => {
        expect(Number(text.trim())).to.eq(initialCount + 1);
      });
  });
});


  it("Product quantity should not decrease below 1", () => {
  //Add to product to cart
   productPage.addProductToCart();

  //Go to Cart (from popup)
    cy.get(ProductDetailLocators.goToCartButton).should("be.visible").click();

  //Quantity input
    cy.get(ProductDetailLocators.quantityInput)
    .should("be.visible")
    .invoke("val")
    .then((value) => {
      const qty = Number(value);

      // Guard: Bu test sadece adet 1 iken anlamlı
      expect(qty).to.eq(1);

      //Click the decrease quantity button
    cy.get(ProductDetailLocators.decreaseQtyButton).should("be.visible").click();

      // Verify that quantity is still 1
    cy.get(ProductDetailLocators.quantityInput).should("have.value", "1");
    });
});


  it("User should see empty cart message after clearing the cart", () => {
  //Precondition: There is a product in the cart
     productPage.addProductToCart();

  //Go to Cart (from popup)
    cy.get(ProductDetailLocators.goToCartButton)
    .should("be.visible")
    .click();

    cy.url().should("include", "/sepet");

  //Clear the cart
    cy.get(ProductDetailLocators.clearCartButton)
    .should("be.visible")
    .click();

    cy.get(ProductDetailLocators.emptyCartMessage)
      .should("be.visible")
      .and("have.text", "Sepetinizde Ürün Bulunmamaktadır");
    
    cy.screenshot('cart-empty-message');  
    });

  it("User should be able to delete product from cart", () => {
  //Precondition: There is a product in the cart
  productPage.addProductToCart();
  productPage.goToCartFromPopup();

  //Delete the product from cart
  productPage.deleteProductFromCart();

  //Verify empty cart message
  cy.get(ProductDetailLocators.emptyCartMessage)
    .should("be.visible")
    .and("contain.text", "Sepetinizde Ürün Bulunmamaktadır");
});

});

