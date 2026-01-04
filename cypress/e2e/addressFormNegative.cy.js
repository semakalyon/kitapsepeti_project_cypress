import GuestCheckoutPage from "../pages/GuestCheckoutPage";
import SearchPage from "../pages/SearchPage";

describe("Address Form Validation - Negative & PositiveScenarios", () => {
  const guestCheckoutPage = new GuestCheckoutPage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    cy.visit("/");
    searchPage.acceptCookiesIfVisible();

    searchPage.searchFor("roman");
    searchPage.verifyProductListIsNotEmpty();

    guestCheckoutPage.addProductToCartFromSearch();
    guestCheckoutPage.goToCart();

    cy.contains("Satın Al", { timeout: 15000 }).click();

    cy.contains("Üye Olmadan Devam Et", { timeout: 15000 }).click();

    cy.url({ timeout: 15000 }).should("include", "/order/address");
    cy.contains("Adres Bilgileri").should("be.visible");
  });

  it("[-] The user should see a validation warning if the Full Name field is left blank.", () => {
    //Full name is blank
    cy.get('input[name="fullname"]').clear();

    //Other required fields filled
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('textarea[name="address"]').type("Test adres");

    //Save
    cy.contains("Adresi Kaydet").click();

    //Verify validation warning
      cy.get('textarea[name="address"]')
        .should('have.class', 'btn-outline-danger');

    cy.screenshot('address-form-fullname-blank');    
  });

  it("[-] A warning should be displayed if the address is left blank.", () => {
    //Full name fully filled
    cy.get('input[name="fullname"]').type("Test Kullanıcı");

    //Address is blank
    cy.get('textarea[name="address"]').clear();

    //Save
    cy.contains("Adresi Kaydet").click();

    //Verify validation warning
    cy.get('textarea[name="address"]')
      .invoke("attr", "data-validate")
      .should("eq", "required");

  });

  it("[+] The user should be redirected to the payment step after filling in all required fields.", () => {
    cy.get('input[name="fullname"]').type("Test Kullanıcı");
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="mobile_phone"]').type("5555555555");

    cy.get('select[name="country_code"]').select("Türkiye");
    cy.get('select[name="city_code"]').select(1);
    cy.get('select[name="town_code"]').select(1);
    cy.get('select[name="district_code"]').select(1);

    cy.get('textarea[name="address"]').type("Test Mahallesi Test Sokak No:1");

    cy.contains("Adresi Kaydet").click();

  cy.screenshot('address-form-completed');

  //Payment step verification
    cy.url({ timeout: 15000 }).should("include", "/order/payment");
    cy.contains("Ödeme Bilgileri", { timeout: 15000 }).should("be.visible");
});

});
