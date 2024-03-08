const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-17c3f273-16e1-4316-9f40-8c3ff40fecf3.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
