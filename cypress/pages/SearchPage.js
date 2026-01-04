import { SearchLocators } from "../locators/SearchLocators";

class SearchPage {

  acceptCookiesIfVisible() {
    cy.get("body").then(($body) => {
      if ($body.find(SearchLocators.acceptCookiesButton).length > 0) {
        cy.get(SearchLocators.acceptCookiesButton).click();
      }
    });
  }

  searchFor(productName) {
    cy.get(SearchLocators.searchBar)
      .should("be.visible")
      .clear()
      .type(productName + "{enter}");
  }

  verifySearchResultsPageOpened() {
    cy.get(SearchLocators.productContainer).should("be.visible");
  }

  verifyProductListIsNotEmpty() {
   cy.get('#catalog362 .product-item').should('have.length.greaterThan', 0);}

  verifyPanelVisibleAndNoProducts() {
  cy.get("#product-list-panel").should("be.visible");

  cy.get("body").then($body => {
    expect($body.find(".product-item").length).to.eq(0);
  });
}

  getProductCards() {
  return cy.get(SearchLocators.productItem);
}

  verifyNoProductsListed() {
    cy.get("body").then($body => {
      if ($body.find(SearchLocators.productCard).length > 0) {
        cy.get(SearchLocators.productCard).should("have.length", 0);
      } else {
        cy.contains("sonuç").should("be.visible");
      }
    });
  }

  openFirstProduct() {
  cy.get(SearchLocators.productItem)
    .first()
    .within(() => {
      cy.get(SearchLocators.productTitle)
        .should("be.visible")
        .click();
    });
}

 verifyProductCardDetails() {
  cy.get(SearchLocators.productCard)
    .first()
    .within(() => {

      cy.get("img")
        .should("be.visible")
        .and(($img) => {
          expect($img).to.have.attr("src");
          expect($img.attr("src")).to.not.be.empty;
        });
      //Product Title
      cy.get(".product-title").should("be.visible").and("not.be.empty");
      //Brand Title
      cy.get(".brand-title").should("be.visible").and("not.be.empty");
      //Price
      cy.get(".current-price").should("be.visible").and("not.be.empty");
    });
}

verifyProductDetails() {
  cy.get(ProductLocators.productImage)
    .should('be.visible')
    .and(($img) => {
      expect($img).to.have.attr('src').and.not.be.empty;
    });

  cy.get(ProductLocators.productTitle)
    .should('be.visible')
    .and('not.be.empty');

  cy.get(ProductLocators.productAuthor)
    .should('be.visible')
    .and('not.be.empty');

  cy.get(ProductLocators.productPublisher)
    .should('be.visible')
    .and('not.be.empty');

  cy.get(ProductLocators.productPrice)
    .should('be.visible')
    .and('not.be.empty');
}

  addFirstProductToCart() {
    cy.get(SearchLocators.productCard)
      .first()
      .within(() => {
        cy.get(SearchLocators.addToCartButton)
          .should("be.visible")
          .click();
      });
  }

  verifyCartCount(expectedCount) {
    cy.get(SearchLocators.cartCount)
      .should("contain", expectedCount);
  }

  verifyFilterPanelVisible() {
    cy.get(SearchLocators.sortDropdown).should("be.visible");
    cy.get(SearchLocators.authorCheckbox).should("exist");
    cy.get(SearchLocators.brandCheckbox).should("exist");
  }

  selectCategoryByText(categoryName) {
  // Sol taraftaki filtre menüsünden seçim yapar
  cy.get('#filter-categories-509') // Direkt ID kullanmak en garanti yoldur
    .should('be.visible')
    .click();
}

  verifyCategoryFiltered() {
    cy.get(SearchLocators.categoryInfo).should("be.visible");
  }

  scrollToBottom() {
    cy.scrollTo("bottom");
  }

  waitForMoreProducts(initialCount) {
    cy.get(SearchLocators.productCard)
      .should("have.length.greaterThan", initialCount);
  }

  sortByPriceAscending() {
    // Select "Fiyat Artan" by value '5' or text
    cy.get(SearchLocators.sortDropdown)
      .should('be.visible')
      .select('5'); // value="5" corresponds to "Fiyat Artan"

    // Since onchange triggers a page reload, wait for the network to be stable
    cy.url().should('include', 'sort=5');
  }

  verifyFirstProductIsCheapest() {
    // Optional: Verify that the first product has a price value
    cy.get(SearchLocators.productList)
      .first()
      .find('.product-price')
      .should('be.visible')
      .and('not.be.empty');
  }

  clickTopMenuCategoryByTitle(categoryTitle) {
  cy.contains("a", categoryTitle)
    .should("be.visible")
    .click();
}

  verifyCategoryPageOpened(expectedKeyword) {
    cy.get("h1.category-name", { timeout: 15000 })
     .should("be.visible")
     .invoke("text")
     .then((text) => {
       const normalizedUI = text.toLowerCase().replace(/\s+/g, " ").trim();

       expect(normalizedUI).to.include(expectedKeyword);
    });
}

  verifyProductsAreListed() {
    cy.get(".product-item", { timeout: 15000 })
      .should("have.length.greaterThan", 0);
}

}

export default SearchPage;
