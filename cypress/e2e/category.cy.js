import SearchPage from "../pages/SearchPage";
import categories from "../fixtures/categories.json";
import { SearchLocators } from "../locators/SearchLocators";

const searchPage = new SearchPage();

describe("Top Menu Category Tests", () => {

  beforeEach(() => {
    cy.visit("/");
    searchPage.acceptCookiesIfVisible();
  });
categories.forEach((category) => {
  it(`User can open ${category.title} category from top menu`, () => {
    searchPage.clickTopMenuCategoryByTitle(category.title);
    searchPage.verifyCategoryPageOpened(category.expectedKeyword);
    searchPage.verifyProductsAreListed();
  });
});

});
