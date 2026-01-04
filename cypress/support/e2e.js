// cypress/support/e2e.js

// Global beforeEach / custom command importleri burada olur
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  // 3rd party / cross-origin script hatalarını ignore et
  if (
    err.message.includes("Script error") ||
    err.message.includes("google_trackConversion") ||
    err.message.includes("gtag") ||
    err.message.includes("analytics")
  ) {
    return false;
  }

  // Diğer hatalar testleri fail etsin
  return true;
});
