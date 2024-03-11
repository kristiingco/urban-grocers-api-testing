const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
    e2e: {
        setupNodeEvents(on, config) {
            require("cypress-mochawesome-reporter/plugin")(on);
        },
        baseUrl:
            "https://cnt-fe7e55c1-e4ff-4983-96ab-9a8e50897a76.containerhub.tripleten-services.com",
        screenshotOnRunFailure: false,
        video: false,
    },
});
