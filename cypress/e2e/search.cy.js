import SearchPage from "../pages/SearchPage";
import products from "../fixtures/products.json";
import ProductPage from "../pages/ProductPage";
import { SearchLocators } from "../locators/SearchLocators";

const searchPage = new SearchPage();

describe("Product Search Tests", () => {

  beforeEach(() => {
    cy.visit("/");
    searchPage.acceptCookiesIfVisible();
  });

  it("Search with a valid product", () => {
    searchPage.searchFor(products.searchProduct.keyword);
    searchPage.verifySearchResultsPageOpened();
    searchPage.verifyProductListIsNotEmpty();
  });

  it("Search with an invalid product", () => {
    searchPage.searchFor(products.invalidProduct.keyword);
    searchPage.verifyPanelVisibleAndNoProducts();

  cy.screenshot('search-invalid-product'); 
  });

  it("Product card details are displayed correctly", () => {
  searchPage.searchFor(products.searchProduct.keyword);
  searchPage.verifySearchResultsPageOpened();
  searchPage.verifyProductListIsNotEmpty();
  searchPage.openFirstProduct(); 

  const productPage = new ProductPage();
  productPage.verifyProductDetails(); 
  
});

it("Search for 'Roman' and sort by increasing price", () => {
    //Search for 'Roman'
    searchPage.searchFor("Roman");

    //Verify search results page opened and products are listed
    searchPage.verifySearchResultsPageOpened();
    searchPage.verifyProductListIsNotEmpty();

    //Apply sorting by increasing price
    cy.get(SearchLocators.sortDropdown)
      .should("be.visible")
      .select("5"); // HTML’de value="5" = Fiyat Artan

    //Verify that products are sorted by increasing price
    cy.get(SearchLocators.productPrice).then(($prices) => {
      const priceValues = [...$prices].map(p => parseFloat(p.innerText.replace('.', '').replace(',', '.')));
      const sorted = [...priceValues].sort((a, b) => a - b);
      expect(priceValues).to.deep.equal(sorted);

    cy.screenshot('search-roman-sorted-price');  
    });

  });

});
