import LoginPage from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import usersData from "../fixtures/users.json";

const loginPage = new LoginPage();

describe("Login Tests", () => {

  beforeEach(() => {
    loginPage.visit();
    loginPage.acceptCookiesIfVisible();
    loginPage.openLoginForm();
  });

  it("Successful login with valid credentials", () => {
    loginPage.login(
      usersData.validUser.email,
      usersData.validUser.password
    );

    loginPage.verifyLoginSuccess();
  
  cy.screenshot('login-success');
  });

  it("Login should fail with wrong password", () => {
    loginPage.login(
      usersData.validUser.email,
      "wrong123"
    )
    loginPage.verifyUserIsStillOnLoginForm();
});

  it("Login should fail with invalid email format", () => {
    loginPage.login(
      "testtt@@gmailcom",
      usersData.validUser.password
    );
 loginPage.verifyUserIsStillOnLoginForm();
  
cy.screenshot('login-invalid-email');
});

  it("Login should fail when email is empty", () => {
    loginPage.enterPassword(usersData.validUser.password);
    loginPage.clickLogin();
 loginPage.verifyUserIsStillOnLoginForm();
});

  it("Login page UI elements should be visible", () => {
    cy.get(LoginLocators.rememberMeLabel).should("be.visible");
    cy.get(LoginLocators.forgotPasswordLink).should("be.visible");
    cy.get(LoginLocators.registerLink).should("be.visible");
    cy.get(LoginLocators.loginButton).should("be.visible");
  });

  
it('User should submit forgot password form', () => {
  loginPage.visit();
  
  //Click forgot password link
  cy.get(LoginLocators.forgotPasswordLink).should("be.visible").click();

  //Verify forgot password page opened
  cy.url().should('include', '/uye-sifre-hatirlat');
  cy.get(LoginLocators.forgotPasswordHeader).should('contain', 'Şifremi Unuttum');

  //Fill in email field
  cy.get(LoginLocators.forgotPasswordEmailInput)
    .should('be.visible')
    .clear()
    .type('test@mail.com');

  //Submit the form
  cy.get('#forgot-password-btn-292')
    .should('be.enabled')
    .click();

  // Verify success message
  cy.get('.popover-item.success', { timeout: 15000 })
    .should('exist') // Önce DOM'da var olduğunu teyit et
    .should('be.visible')
    .and('contain', 'Şifre değiştirilme işleminizin onaylanması');
  
    cy.screenshot('forgot-password-success');
});
})