import { LoginLocators } from "../locators/LoginLocators";

class LoginPage {

  visit() {
    cy.visit("/");
  }

  acceptCookiesIfVisible() {
    cy.get("body").then(($body) => {
      if ($body.find(LoginLocators.acceptCookiesButton).length > 0) {
        cy.get(LoginLocators.acceptCookiesButton).click();
      }
    });
  }

  openLoginForm() {
    cy.get('i.custom-user').first().click()

  }

  enterEmail(email) {
    cy.get(LoginLocators.emailInput)
      .should("be.visible")
      .clear()
      .type(email);
  }

  enterPassword(password) {
    cy.get(LoginLocators.passwordInput)
      .should("be.visible")
      .clear()
      .type(password);
  }

  clickLogin() {
    cy.get(LoginLocators.loginButton)
      .should("be.enabled")
      .click();
  }

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLogin();
  }

  verifyLoginSuccess() {
    cy.get(LoginLocators.successUserIcon)
      .should("be.visible");
  }

  verifyUserIsStillOnLoginForm(email) {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('div.drawer-body').should('be.visible');
}

  openLoginDrawer() {
    cy.get('a[href="#header-member-panel"]').click();
    cy.get('div.drawer-body').should('be.visible');
}

  goToForgotPassword() {
    cy.url().then((url) => {
    // Eğer zaten forgot password sayfasındaysak tekrar işlem yapma
    if (!url.includes('/uye-sifre-hatirlat')) {
      // Login drawer aç
      cy.get('a[href="#header-member-panel"]')
        .should('be.visible')
        .click();

      cy.get(LoginLocators.forgotPasswordLink)
        .should('be.visible')
        .click();
    }
  });

  cy.url().should('include', '/uye-sifre-hatirlat');
}

  enterForgotPasswordEmail(email) {
    cy.get(LoginLocators.forgotPasswordEmailInput)
      .should('be.visible')
      .click()
      .clear()
      .type(email);
}

  submitForgotPassword() {
    cy.get(LoginLocators.forgotPasswordSubmitButton)
      .should('be.enabled')
      .click();
}

  verifyLoginErrorMessage() {
    cy.get(LoginLocators.errorMessage)
      .should('be.visible')
      .invoke('text')
      .should('match', /giriş bilgileriniz hatalı/i);
}
}

export default LoginPage;
