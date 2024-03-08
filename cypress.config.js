const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-3c538893-9bbe-46e5-acaa-0ff4a7fb28a0.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
