const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.kitapsepeti.com",

    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,

    // ✅ Artık .cy.js testleri çalışacak
    specPattern: "cypress/e2e/**/*.cy.js",

    // Flaky third-party servisleri engelle
    blockHosts: [
      "*segmentify.com",
      "*google-analytics.com",
      "*facebook.net",
      "*googletagmanager.com"
    ],

    setupNodeEvents(on, config) {
      // Şimdilik boş – Cypress native çalışıyor
      return config;
    },
  },
});
